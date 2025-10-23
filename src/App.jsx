import { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router";
import { UserContext } from "../contexts/UserContext";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import NavBar from "../components/NavBar/NavBar";
import LandingPage from "../components/LandingPage/LandingPage";
import Shops from "../components/Shops/Shops";
import ShopPage from "../components/ShopPage/ShopPage";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
import ShopCreate from "../components/ShopCreate/ShopCreate";
import Products  from "../components/Products/Products";
import ProductPage  from "../components/ProductPage/ProductPage";
import "./App.css";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shops" element={<Shops />} />
        <Route
          path="/shops/new"
          element={
            <ProtectedRoute>
              <ShopCreate />
            </ProtectedRoute>
          }
        />
        <Route path="/shops/:shopId" element={<ShopPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route
          path="*"
          element={
            <main>
              <h1>404 - Page Not Found</h1>
              <p>
                The page you're looking for has been eaten by the void and no
                longer exists.
              </p>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default App;
