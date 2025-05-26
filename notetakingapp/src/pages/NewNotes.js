import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewNotes.css";

export default function NewNotes() {
  const navigate = useNavigate();
  return (
    <div style={{ justifyContent: "center"  }}>
    <div className="main-container2">
      <div className="pic2" onClick={() => navigate("/")}/>
      <div className="section2">
        <span className="text2">Title</span>
        <div className="wrapper2">
          <span className="text-22">
            Maths Exam prep
            <br />
            Module 1 topics
          </span>
        </div>
        <div className="box2">
          <div className="group2">
            <div className="group-22"onClick={() => navigate("/organise")}>
              <span className="text-32">Save</span>
            </div>
          </div>
          <div className="box-22">
            <div className="wrapper-22"onClick={() => navigate("/")}>
              <span className="text-42">Cancel</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-32" />
      <div className="pic-22" onClick={() => navigate("/")}/>
      <div className="pic-32" onClick={() => navigate("/organise")}/>
    </div>
    </div>
  );
}
