import React from "react";
import logo1 from "/assets/medicine.png";
import logo2 from "/assets/stethoscope.png";
import logo3 from "/assets/healthcare.png";

const Features = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <p className="m-2 px-2 py-1 bg-[#091717] text-center text-sm rounded-full w-fit">
        features
      </p>
      <div className="w-fit my-auto p-4 flex flex-col lg:flex-row justify-between gap-8 sm:gap-4">
        <div className="w-60 h-60 p-2 m-2 border-1 border-[#93B1A6] rounded-lg">
          <div className="flex gap-4 justify-center items-center m-2">
            <img src={logo1} alt="logo-1" className="h-8 w-8" />
            <p className="p-2 text-lg">Vast Medicines Stock</p>
          </div>
          <hr />
          <p className="p-2 text-center text-sm">
            Select from a wide range of medicines and accessories.You can check
            the compositions, type, manufacturer name, etc, in our medicine
            store.
          </p>
        </div>
        <div className="w-60 h-60 p-2 m-2 border border-[#93B1A6] rounded-lg">
          <div className="flex gap-4 justify-center items-center m-2">
            <img src={logo2} alt="logo-1" className="h-8 w-8" />
            <p className="p-2 text-lg">AI selected medicines</p>
          </div>
          <hr />
          <p className="p-2 text-center text-sm">
            Chat with MedMan he is your health adviser, tell your health issues
            and he will find the perfect tips for your cure.
          </p>
        </div>
        <div className="w-60 h-60 p-2 m-2 border-1 border-[#93B1A6] rounded-lg">
          <div className="flex gap-4 justify-center items-center m-2">
            <img src={logo3} alt="logo-1" className="h-8 w-8" />
            <p className="p-2 text-lg">Ensuring Safe Medicine</p>
          </div>
          <hr />
          <p className="p-2 text-center text-sm">
            Our testing ensures safety and effectiveness through preclinical
            research and clinical trials. Our regulatory agencies approve only
            well-tested drugs for public use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
