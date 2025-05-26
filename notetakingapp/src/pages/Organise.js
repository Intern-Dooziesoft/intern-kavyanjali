import React from "react";
import { useNavigate } from "react-router-dom";
import "./Organise.css";

export default function Organise() {
  const navigate = useNavigate();
  return (
    <div style={{ justifyContent: "center" }}>
    <div className="main-container4">
      <div className="img4" onClick={() => navigate("/")}/>
      <div className="section4">
        <div className="group4" />
        <div className="pic4" onClick={() => navigate("/new-notes")}/>
        <span className="text4">My Notes</span>
      </div>
      <div className="box4">
        <div className="section-24" />
        <div className="img-24" />
        <div className="pic-24" />
        <div className="pic-34" />
        <span className="text-24">Task 1</span>
      </div>
      <div className="wrapper4">
        <div className="group-24" />
        <div className="img-34" />
        <div className="pic-44" />
        <div className="img-44" />
        <span className="text-34">Task 2</span>
      </div>
      <div className="box-24">
        <div className="section-34" />
        <div className="img-54" />
        <div className="img-64" />
        <div className="pic-54" />
        <span className="text-44">Grocery list</span>
      </div>
      <div className="flex-row-bc4">
        <div className="bottom-app-bar4" />
        <div className="pin-angle-fill4" />
        <div className="trash-fill4" />
        <div className="pencil4" />
        <span className="recipie4">Recipie</span>
      </div>
    </div>
    </div>
  );
}
