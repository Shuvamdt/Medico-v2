import React from "react";
import { mirage } from "ldrs";
import empty from "/assets/empty-box.png";

mirage.register();

const Bill = ({ medicines }) => {
  const totalPrice = medicines.reduce((sum, med) => sum + Number(med.price), 0);

  return (
    <div className="flex mx-2 p-2 w-full justify-center">
      {medicines.length > 0 ? (
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col">
            <ul className="flex flex-col px-2 py-1 my-1 w-full ">
              {medicines.map((medicine, index) => (
                <li
                  key={index}
                  className="grid grid-cols-10 text-[10px] w-full"
                >
                  <p className="text-md mx-2">{index + 1}.</p>
                  <h1 className="col-span-6 text-sm mx-2">
                    {medicine.med_name}
                  </h1>
                  <p className="text-sm mx-2">₹{medicine.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <li className="flex justify-end items-center sm:justify-center px-4 mx-4">
            <h1 className="text-sm">Total Price:</h1>
            <p className="text-sm mx-2">{totalPrice.toFixed(2)}</p>
          </li>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <img src={empty} alt="empty-box" className="h-48 w-48 m-5" />
          <p className="text-center text-lg">Your bag is empty</p>
        </div>
      )}
    </div>
  );
};

export default Bill;
