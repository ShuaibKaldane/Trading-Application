import "./App.css";
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Apps = () => {
  return (
    <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
  );
};

export default Apps;
