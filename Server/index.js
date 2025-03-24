import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pkg from "pg";

// const { Pool } = pkg;
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
      "https://writography-frontend.vercel.app",
      "https://writography-v-2-nmc8.vercel.app",
    ],
    credentials: true,
  })
);

// const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      `SELECT * FROM medicines WHERE name LIKE '%${query}%' ORDER BY id ASC LIMIT 200`
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

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
