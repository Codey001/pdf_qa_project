import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addAnswer,
  addQuestion,
  removeQuestion,
} from "../store/dataSlice";
import { askQuestion } from "../utils/handleAPI";
import icon from "../assets/icons.png";
import Spinner from "./Spinner";

const Footer = () => {
  const [query, setQuery] = useState("");

  const fileAvailable = useSelector((state) => state.fileStatus);
  const fileName = useSelector((state) => state.fileName);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    //send question to store
    dispatch(addQuestion({ question: query }));

    if (!fileAvailable) {
      toast.error("Upload file");
    } else {
      setLoading(true);
      if (query) {
        const res = await askQuestion(query, fileName);
        const answer = res.data.answer;

        //add answer to store
        dispatch(addAnswer({ answer: answer }));
      } else {
        //remove question from store
        dispatch(removeQuestion());
        toast.error("Enter the question");
      }
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner input_data="Finding answer ..." />
      ) : (
        <div className="px-2 sm:px-20 lg:px-4">
          <div className="flex items-center w-full max-w-screen-lg mx-auto my-4 bg-slate-300 rounded-xl">
            <textarea
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}

              className="flex-grow p-3 rounded-l-lg focus:outline-none resize-none overflow-hidden bg-slate-300 text-black"
              rows={1}
            />
            <button
              onClick={handleSearch}
              className="text-white p-2 h-full rounded-r-lg focus:outline-none"
            >
              <img src={icon} alt="" className="w-10" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
