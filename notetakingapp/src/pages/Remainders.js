import React from "react";
import { useNavigate } from "react-router-dom";
import "./Remainders.css";

export default function Remainders() {
  const navigate = useNavigate();
  return (
    <div style={{ justifyContent: "center" }}>
    <div className="main-container3">
      <div className="img3" onClick={() => navigate("/")}/>
      <div className="wrapper3">
        <div className="section3">
          <span className="text3">Meeting</span>
          <div className="wrapper-23" />
          <div className="section-23" />
          <div className="group3" />
          <div className="img-23" />
          <span className="text-23">Apr 3, 11:00 am</span>
        </div>
        <div className="section-33">
          <span className="text-33">Deadline</span>
          <div className="box3" />
          <div className="img-33" />
          <span className="text-43">Apr 21, 3:00 pm</span>
        </div>
        <div className="box-23">
          <span className="text-53">Deadline-2</span>
          <div className="img-43" />
          <span className="text-63">Apr 22, 3:00 pm</span>
          <div className="wrapper-33" />
        </div>
      </div>
      <div className="box-33" />
      <span className="text-73">Upcoming</span>
      <div className="wrapper-43">
        <div className="box-43" />
      </div>
      <span className="text-83">
        + New Remainder
        <br />
      </span>
    </div>
    </div>
  );
}
