import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/shop" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="container">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}