import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const location = useLocation();
  const [userState, setUserState] = useState(location.state?.user ?? false);
  const handlePageChange = () => {
    setUserState(!userState);
  };
  const formVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: (direction) => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };
  return (
    <div className="h-fit my-4 mx-auto min-h-screen flex">
      <div className="">
        {userState ? (
          <motion.div
            key="signin"
            custom="right"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-grow flex flex-col w-70 sm:w-90 h-140 mx-1 my-2 px-4 py-2 border rounded-lg justify-center items-center backdrop-blur-3xl"
          >
            <h4 className="text-center text-2xl py-4 mb-2">Welcome Back!</h4>
            <form className="flex flex-col justify-center mb-5" method="POST">
              <label htmlFor="Email" className="text-sm px-1 py-1 my-2">
                Email
              </label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                className="border bg-neutral-700 px-3 py-1 rounded-lg mb-5"
                id="email"
              />
              <label htmlFor="password" className="text-sm px-1 py-1 my-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border bg-neutral-700 px-3 py-1 rounded-lg mb-5"
                id="password"
              />
            </form>
            <button
              className="px-5 py-1 mx-4 my-2 rounded-full bg-[#93B1A6]"
              type="submit"
            >
              Sign In
            </button>
            <button
              className="px-5 py-1 mx-4 my-2 rounded-full border"
              type="submit"
            >
              Sign in with Google
            </button>
            <button
              className="px-3 py-1 mx-4 my-2 rounded-full underline text-sm"
              onClick={handlePageChange}
            >
              New Here, Sign Up First→
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            custom="left"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-grow flex flex-col w-70 sm:w-90 h-140 mx-1 my-2 px-4 py-2 border rounded-lg justify-center items-center backdrop-blur-3xl"
          >
            <h4 className="text-center text-2xl py-4 mb-2">Join Us!</h4>
            <form className="flex flex-col justify-center mb-5" method="POST">
              <label htmlFor="Name" className="text-sm px-1 py-1 my-2">
                Name
              </label>
              <input
                type="name"
                placeholder="John Doe"
                className="border bg-neutral-700 px-3 py-1 rounded-lg mb-5"
                id="name"
              />
              <label htmlFor="Email" className="text-sm px-1 py-1 my-2">
                Email
              </label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                className="border bg-neutral-700 px-3 py-1 rounded-lg mb-5"
                id="email"
              />
              <label htmlFor="password" className="text-sm px-1 py-1 my-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border bg-neutral-700 px-3 py-1 rounded-lg mb-5"
                id="password"
              />
            </form>
            <button
              className="px-5 py-1 mx-4 my-2 rounded-full bg-[#93B1A6]"
              type="submit"
            >
              Sign Up
            </button>
            <button
              className="px-5 py-1 mx-4 my-2 rounded-full border"
              type="submit"
            >
              Sign Up with Google
            </button>
            <button
              className="px-3 py-1 mx-4 my-2 rounded-full underline text-sm"
              onClick={handlePageChange}
            >
              ←Login if account already exists.
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Register;
