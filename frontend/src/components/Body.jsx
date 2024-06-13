import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HTMLparser from "./HTMLparser";
import Spinner from "./Spinner";
import user_img from "../assets/user.png";
import ai_logo from "../assets/ai_logo.png";

const Body = () => {
  const flag = useSelector((state) => state.fileStatus);
  const chats = useSelector((state) => state.messages);
  const endOfMessagesRef = useRef(null);
  const loading = useSelector((state) => state.loading);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom whenever chats change
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="md:m-4 md:px-24 px-2">
    
      {chats.length === 0 && !loading ? (
        flag ? (
          <h1>Enter your question</h1>
        ) : (
          <h1>Please upload the file</h1>
        )
      ) : loading ? (
        <Spinner input_data="Processing file..." />   
      ) : (
        chats.map((chat, index) => (
          <ul key={index} className="">
            {index % 2 == 0 ? (
              <div className="flex justify-end m-3 max-w-xl ml-auto">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h2>{chat}</h2>
                </div>
                <img src={user_img} alt="" className="w-8 h-8" />
              </div>
            ) : (
              <div className="flex justify-start max-w-3xl m-3">
                <img src={ai_logo} alt="" className="w-10 h-10" />

                <div className="bg-slate-100 p-4 rounded-lg">
                  <HTMLparser htmlString={chat} />
                </div>
              </div>
            )}
          </ul>
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Body;
