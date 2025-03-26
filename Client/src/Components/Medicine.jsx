import React, { useState, useEffect } from "react";

const Medicine = (props) => {
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleClick = () => {
    const newOrder = {
      name: props.name,
      price: props.price,
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);

    alert("Medicine added to the bag!");
    window.location.reload();
  };

  return (
    <div className="card shadow-md rounded-3xl anim-block bg-[#183D3D] border flex flex-col h-full">
      <div className="flex card-heading text-lg font-bold px-2 rounded-t-2xl bg-[#93B1A6] break-words overflow-hidden">
        <h2 className="p-2">{props.name}</h2>
      </div>
      <div className="p-2 flex-grow overflow-hidden break-words">
        <p className="py-2 px-3">Price: {props.price}</p>
        <p className="py-2 px-3">Manufacturer: {props.m_name}</p>
        <p className="py-2 px-3">Type: {props.type}</p>
        <p className="py-2 px-3">Packet Size: {props.size}</p>
        <p className="py-2 px-3">
          Composition: {props.comp1}, {props.comp2}
        </p>
      </div>
      <div className="mt-auto p-2 flex justify-end mx-4 my-2">
        <button
          className="px-4 py-1 rounded-full bg-[#93B1A6]"
          onClick={handleClick}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Medicine;
