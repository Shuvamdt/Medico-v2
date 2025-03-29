import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Orders from "./Components/Orders";
import Store from "./Components/Store";
import About from "./Components/About";
import Register from "./Components/Register";
import MyOrders from "./Components/MyOrders";
import Background from "./Components/Background";
import AuthSuccess from "./Components/AuthSuccess";
import { motion } from "framer-motion";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [logStatus, setLogStatus] = useState(localStorage.getItem("logStatus"));

  useEffect(() => {
    console.log(userId, logStatus);
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [userId, logStatus]);

  const handleOrdersUpdate = (newOrder) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Background />
        <Navbar
          logStatus={logStatus}
          setLogStatus={setLogStatus}
          setUserId={setUserId}
        />
        <motion.div
          className="w-full flex flex-col c-space gap-3 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/store"
              element={<Store handleOrdersUpdate={handleOrdersUpdate} />}
            />
            <Route
              path="/orders"
              element={
                <Orders orders={orders} logStatus={logStatus} userId={userId} />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  logStatus={logStatus}
                  userId={userId}
                  setLogStatus={setLogStatus}
                  setUserId={setUserId}
                />
              }
            />
            <Route
              path="/my-orders"
              element={<MyOrders logStatus={logStatus} userId={userId} />}
            />
            <Route
              path="/auth/success"
              element={
                <AuthSuccess
                  setUserId={setUserId}
                  setLogStatus={setLogStatus}
                />
              }
            />
          </Routes>
        </motion.div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
