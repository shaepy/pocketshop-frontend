import { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar/NavBar";
import LandingPage from "../components/LandingPage/LandingPage";
import Shops from "../components/Shops/Shops";
import ShopPage from "../components/ShopPage/ShopPage";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shops/:shopId" element={<ShopPage />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
