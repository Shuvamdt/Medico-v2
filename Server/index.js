import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pkg from "pg";
import bcryptjs from "bcryptjs";

//const backendURL = "http://localhost:4000";
//const frontEndURL = "http://localhost:5173";
const frontEndURL = "https://medico-v2.vercel.app";
const backendURL = "https://medico-v2-idl5.vercel.app";

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 4000;
const saltRounds = 10;
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4000",
      "https://medico-v2.vercel.app",
      "https://medico-v2-idl5.vercel.app",
    ],
    credentials: true,
  })
);

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });
// db.connect();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/MedMan", async (req, res) => {
  console.log(req.body.symptoms);
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms are required" });
  }

  const prompt = `Find the best medicines for these symptoms\n\n${blogContent}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ message: text });
  } catch (error) {
    console.error("Error roasting blog:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

app.get("/all", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM medicines ORDER BY id ASC LIMIT 100"
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const result = await db.query(
      `SELECT * FROM medicines WHERE name ILIKE '%${query}%' ORDER BY id ASC LIMIT 200`
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/order/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const medicines = req.body.orders;

  if (!Array.isArray(medicines) || medicines.length === 0) {
    return res.status(400).json({ error: "Invalid orders data" });
  }

  try {
    for (const medicine of medicines) {
      const name = medicine.name;
      const price = medicine.price;

      await db.query(
        `INSERT INTO orders (med_name, price, user_id) VALUES ($1, $2, $3)`,
        [name, price, id]
      );
    }

    return res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/order/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await db.query("SELECT * FROM orders WHERE user_id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${frontEndURL}/auth/google`,
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("/login?error=Unauthorized");
    }
    res.redirect(
      `${frontEndURL}/auth/success?userId=${req.user.id}&name=${req.user.name}`
    );
  }
);

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query(
      "SELECT * FROM users WHERE email_id = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      res.sendStatus(404);
    } else {
      bcryptjs.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (name, email_id, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
              res.json({ name: user.name, userId: user.id });
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }
      console.log(user.id);
      return res.json({
        message: "Login successful",
        name: user.name,
        userId: user.id,
      });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  });
});

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email_id = $1", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcryptjs.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${backendURL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails[0].value;
        const result = await db.query(
          "SELECT * FROM users WHERE email_id = $1",
          [email]
        );

        if (result.rows.length === 0) {
          // Insert new user
          const newUser = await db.query(
            "INSERT INTO users (name, email_id, password) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
