import React, { useState, useEffect } from "react";
import Bill from "./Bill";
import axios from "axios";
import { mirage } from "ldrs";

const API_URL = "http://localhost:4000";
mirage.register();

const MyOrders = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = 1;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`${API_URL}/order/${userId}`);
        setMedicines(response.data);
        setTotalPrice(
          response.data.reduce((sum, medicine) => sum + medicine.price, 0)
        );
      } catch (err) {
        console.error("Error fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="min-h-screen flex justify-center mt-20">
      {loading ? (
        <l-mirage size="100" speed="2.5" color="#93B1A6"></l-mirage>
      ) : (
        <div className="h-fit w-fit rounded-lg border backdrop-blur-2xl ">
          <Bill medicines={medicines} totalPrice={totalPrice} />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
