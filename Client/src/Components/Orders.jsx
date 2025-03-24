import React, { useState, useEffect } from "react";
import { mirage } from "ldrs";
import deleteIcon from "/assets/delete.png";
import orderNow from "/assets/booking.png";
import empty from "/assets/empty-box.png";
import axios from "axios";

mirage.register();

//const API_URL = "http://localhost:4000";
const API_URL = "https://medico-v2-idl5.vercel.app";

const Orders = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = 1;

  useEffect(() => {
    const fetchMedicines = () => {
      try {
        const data = localStorage.getItem("orders");
        const orders = data ? JSON.parse(data) : [];
        setMedicines(orders);

        const total = orders.reduce((sum, item) => sum + Number(item.price), 0);
        setTotalPrice(total.toFixed(2));
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setMedicines([]);
        setTotalPrice("0.00");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleRemove = (index) => {
    const updatedOrders = medicines.filter((_, i) => i !== index);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setMedicines(updatedOrders);

    const total = updatedOrders.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const handleOrder = async () => {
    try {
      if (medicines.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/order/${userId}`,
        { orders: medicines },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Failed to send order");
      }

      alert("Order sent successfully");
      localStorage.removeItem("orders");
      setMedicines([]);
      setTotalPrice("0.00");
    } catch (err) {
      console.error("Error sending order:", err);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex justify-center items-center flex-grow px-10 py-10">
        {loading ? (
          <l-mirage size="100" speed="2.5" color="#93B1A6"></l-mirage>
        ) : medicines.length > 0 ? (
          <div className="flex flex-col p-2 m-2 w-full">
            {medicines.map((medicine, index) => (
              <ul key={index} className="flex flex-col px-2 py-4 my-2 w-full">
                <li className="grid grid-cols-5 items-center">
                  <p className="text-xl">{index + 1}.</p>
                  <h1 className="col-span-2 text-2xl">{medicine.name}</h1>
                  <p className="text-xl">₹{medicine.price}</p>
                  <button
                    onClick={() => handleRemove(index)}
                    className="flex justify-center items-center"
                  >
                    <img
                      src={deleteIcon}
                      alt="delete-icon"
                      className="h-6 w-6"
                    />
                  </button>
                </li>
              </ul>
            ))}
            <li className="grid grid-cols-5 border-t py-4">
              <h1 className="col-span-2 col-start-2 text-2xl">Total Price:</h1>
              <p className="text-xl">₹{totalPrice}</p>
            </li>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img src={empty} alt="empty-box" className="h-48 w-48 m-5" />
            <p className="text-center text-lg">Your bag is empty</p>
          </div>
        )}
      </div>

      {medicines.length > 0 && (
        <div className="w-full flex justify-center p-4">
          <button
            className="flex items-center gap-3 px-6 py-3 bg-[#183D3D] rounded-full shadow-md hover:bg-[#93B1A6] transition"
            onClick={handleOrder}
          >
            <p className="text-xl">Order Now</p>
            <img src={orderNow} alt="Order Now" className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
