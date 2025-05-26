// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AskAI from "./pages/AskAI";
import NewNotes from "./pages/NewNotes";
import Remainders from "./pages/Remainders";
import Organise from "./pages/Organise";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/new-notes" element={<NewNotes />} />
        <Route path="/remainders" element={<Remainders />} />
        <Route path="/organise" element={<Organise />} />
      </Routes>
    </Router>
  );
}
