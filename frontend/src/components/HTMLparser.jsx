import React from "react";
import parse from "html-react-parser";
import { marked } from "marked";

const HTMLparser = ({ htmlString }) => {
  return (
    <div className="text-left">
      {parse(marked.parse(htmlString) || "sunny")}
    </div>
  );
};

export default HTMLparser;
