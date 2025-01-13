import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import AppLoader from "./components/AppLoader";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <AppLoader>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppLoader>
    </BrowserRouter>
  );
}
