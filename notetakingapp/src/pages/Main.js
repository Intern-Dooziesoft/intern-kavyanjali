// pages/Main.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

    <div className="main-container">
      <div className="box">
        <span className="text">IdeaAI</span>
        <div className="box-2" />
      </div>
      <div className="group">
        <div className="section" onClick={() => navigate("/ask-ai")}>
          <div className="pic">
            <span className="text-2">AI</span>
          </div>
          <span className="text-3">Ask AI</span>
        </div>
        <div className="section-2"onClick={() => navigate("/remainders")} >
          <div className="pic-2" />
        </div>
        <span className="text-4">Remainders</span>
      </div>
      <div className="group-2">
        <div className="wrapper" onClick={() => navigate("/organise")}>
          <div className="pic-3" />
          <span className="text-5">Organise</span>
        </div>
        <div className="wrapper-2" onClick={() => navigate("/new-notes")}>
          <div className="group-3" />
          <span className="text-6">Input</span>
        </div>
      </div>
      <div className="section-3" onClick={() => navigate("/new-notes")}>
        <span className="text-7">New Notes</span>
        <div className="section-4">
          <div className="box-3" />
        </div>
      </div>
    </div>
    </div>
  );
}
