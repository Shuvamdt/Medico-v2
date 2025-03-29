import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import close from "/assets/close.png";
import ai from "/assets/ai.png";
import message from "/assets/message.png";
import send from "/assets/send.png";
import { mirage } from "ldrs";
mirage.register();

//const API_URL = "http://localhost:4000";
const API_URL = "https://medico-v2-idl5.vercel.app";

const MedMan = () => {
  const [userMessage, setUserMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("Hi there! How can I help you?");
  const [messageOpen, setMessageOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setMessageOpen(!messageOpen);
    setAiMessage("Hi there! How can I help you?");
    setUserMessage("");
  };

  const handleRequest = async () => {
    if (!userMessage.trim()) return;
    setLoading(true);
    setUserMessage("");
    try {
      console.log("User Message: " + userMessage);
      const response = await axios.post(`${API_URL}/med-man`, {
        userMessage,
      });
      setAiMessage(response.data.message || "No information found.");
    } catch (err) {
      console.error(err);
      setAiMessage(
        "I'm sorry, but I couldn't process your request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="rounded-full fixed z-50 h-15 w-15 bottom-5 right-5 bg-[#183D3D] p-2 text-white"
        onClick={handleClick}
      >
        <img src={message} alt="Tell your problems..." />
      </button>

      {messageOpen && (
        <div className="fixed z-50 bottom-5 right-5 bg-[#040D12] rounded-xl border flex flex-col h-100 w-70 sm:w-100 justify-end">
          <div className="flex justify-between items-center w-full p-4 border-b">
            <h2 className="text-xl">Medicine Info</h2>
            <button onClick={handleClick} className="rounded-full">
              <img src={close} alt="Close" className="h-5 w-5" />
            </button>
          </div>

          <h1 className="text-3xl text-[#93B1A6] font-bold px-4 py-2">
            MedMan
          </h1>

          <div className="flex px-4 py-2 mb-18 h-full overflow-auto items-start">
            <img
              src={ai}
              alt="AI med man"
              className="h-12 w-12 m-2 p-2 rounded-full border"
            />
            {loading ? (
              <div className="my-4">
                <l-mirage size="50" speed="2.5" color="#93B1A6"></l-mirage>
              </div>
            ) : (
              <p className="my-4">
                <ReactMarkdown>{aiMessage}</ReactMarkdown>
              </p>
            )}
          </div>

          <div className="flex items-center px-4 py-3">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="border p-2 rounded-xl w-full"
              placeholder="Type something...."
              autoFocus
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRequest();
                }
              }}
            />
            <button
              onClick={handleRequest}
              className="bg-[#183D3D] m-2 p-2 rounded-full h-10 w-10"
              disabled={loading}
            >
              <img src={send} alt="Send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedMan;
