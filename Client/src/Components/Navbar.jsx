import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import menu from "/assets/menu-button.png";
import close from "/assets/close.png";
import user from "/assets/user.png";
import bag from "/assets/shopping-bag.png";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4000";
//const API_URL = "https://medico-v2-idl5.vercel.app";

const Navbar = (props) => {
  const bagItems = localStorage.getItem("orders");
  const orders = bagItems ? JSON.parse(bagItems) : [];
  const [totalItems, setTotalItems] = useState(orders.length);

  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenuOpen);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem("userId");
      localStorage.removeItem("logStatus");
      props.setLogStatus(false);
      props.setUserId(0);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setTotalItems(orders.length);
  }, [orders.length, props]);

  return (
    <nav className="sticky z-50 top-0 py-3 backdrop-blur-sm">
      <div className="container px-4 mx-auto relative text-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center gap-2">
              <img className="h-10 r-10 mr-2" src={Logo} alt="Logo" />
              <span className="text-[25px] tracking-tight">Medico</span>
            </a>
          </div>
          <div className="flex flex-grow justify-center">
            <ul className="hidden lg:flex mx-auto space-x-12">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/store">Store</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="h-6 w-6">
              <a href="/orders" className="relative">
                {totalItems > 0 && (
                  <div className="bg-[#93B1A6] border-[#040D12] h-3 w-3 absolute rounded-full right-0 flex justify-center items-center">
                    <p className="text-[#040D12] text-[10px]">{totalItems}</p>
                  </div>
                )}
                <img src={bag} alt="shopping-bag" />
              </a>
            </div>
            <button className="h-6 w-6" onClick={toggleAvatarMenu}>
              <img src={user} alt="shopping-bag" />
            </button>
            {avatarMenuOpen && (
              <div className="absolute top-10 right-0 h-fit w-fit p-5 rounded-lg backdrop-blur-lg bg-[#93B1A6]">
                <div className="flex flex-col flex-grow justify-center items-center p-2">
                  {!props.logStatus ? (
                    <div className="flex flex-col mx-auto right-0 top-0 z-20 space-x-12 gap-4">
                      <button
                        className="rounded-full text-center bg-[#183D3D] mx-4 px-4 py-1 hover:bg-[#040D12]"
                        onClick={toggleAvatarMenu}
                      >
                        <Link to="/register" state={{ user: true }}>
                          Sign In
                        </Link>
                      </button>
                      <button
                        className="rounded-full text-center bg-[#183D3D] mx-4 px-4 py-1 hover:bg-[#040D12]"
                        onClick={toggleAvatarMenu}
                      >
                        <Link to="/register" state={{ user: false }}>
                          Sign Up
                        </Link>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col mx-auto right-0 top-0 z-20 space-x-12 gap-4">
                      <button
                        className="rounded-full text-center bg-[#183D3D] mx-4 px-4 py-1"
                        onClick={toggleAvatarMenu}
                      >
                        My Account
                      </button>
                      <button
                        className="rounded-full text-center bg-[#183D3D] mx-4 px-4 py-1"
                        onClick={toggleAvatarMenu}
                      >
                        <a href="/my-orders">My Orders</a>
                      </button>
                      <button
                        className="rounded-full text-center bg-[#183D3D] mx-4 px-4 py-1"
                        onClick={() => {
                          toggleAvatarMenu();
                          handleLogout();
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {!mobileMenuOpen ? (
              <button className="lg:hidden h-6 w-6" onClick={toggleMobileMenu}>
                <img src={menu} alt="menu" />
              </button>
            ) : (
              <button className="lg:hidden h-6 w-6" onClick={toggleMobileMenu}>
                <img src={close} alt="close" />
              </button>
            )}
          </div>
          {mobileMenuOpen && (
            <div className="absolute top-10 right-0 lg:hidden h-fit w-fit p-5 rounded-lg backdrop-blur-lg bg-[#183D3D]">
              <div className="flex flex-col flex-grow justify-center items-center p-2">
                <ul className="flex flex-col items-center mx-auto gap-3">
                  <li>
                    <a href="/" onClick={toggleMobileMenu}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/store" onClick={toggleMobileMenu}>
                      Store
                    </a>
                  </li>
                  <li>
                    <a href="/about" onClick={toggleMobileMenu}>
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
