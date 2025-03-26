import React, { useState, useEffect } from "react";
import axios from "axios";
import Medicine from "./Medicine";
import { mirage } from "ldrs";
mirage.register();

//const API_URL = "http://localhost:4000";
const API_URL = "https://medico-v2-idl5.vercel.app";
const Store = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });
      setMedicines(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchType = (e) => {
    if (search == null) {
      const firstWord = e.target.value;
      setSearch(firstWord.toUpperCase());
    }
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/search?query=${search}`, {
        withCredentials: true,
      });
      setMedicines(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="relative w-full max-w-md my-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 pl-4 pr-10 text-md bg-[#93B1A6] rounded-full"
          onChange={handleSearchType}
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m2.35-6.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex justify-center items-center flex-grow px-10 py-10">
        {loading ? (
          <l-mirage size="100" speed="2.5" color="#93B1A6"></l-mirage>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.length > 0 ? (
              medicines.map((medicine, index) => (
                <Medicine
                  key={index}
                  name={medicine.name}
                  price={medicine.price}
                  m_name={medicine.manufacturer_name}
                  type={medicine.type}
                  size={medicine.pack_size_label}
                  comp1={medicine.short_composition1}
                  comp2={medicine.short_composition2}
                />
              ))
            ) : (
              <p className="col-span-full text-center">
                No medicines available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
