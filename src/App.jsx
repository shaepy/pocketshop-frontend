import { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar/NavBar";
import LandingPage from "../components/LandingPage/LandingPage";
import Shops from "../components/Shops/Shops";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shops" element={<Shops />} />
      </Routes>
    </>
  );
}

export default App;
