import React from "react";
import { useNavigate } from "react-router-dom";
import "./AskAI.css";

export default function AskAI() {
  const navigate = useNavigate();
  return (
    <div style={{ justifyContent: "center" }}>
    <div className="main-container1">
      <div className="group1">
        <div className="pic1"onClick={() => navigate("/")} />
        <div className="box1">
          <div className="box-21">
            <span className="text1">Enter your Question..</span>
          </div>
        </div>
        <div className="section1" />
        <span className="text-21">Ask AI</span>
        <div className="box-31">
          <div className="group-21" />
        </div>
        <span className="text-31">Generate Ideas</span>
        <div className="box-41">
          <div className="section-21" />
        </div>
        <span className="text-41">Summarize Notes</span>
      </div>
      <div className="img1" />
    </div>
    </div>
  );
}
