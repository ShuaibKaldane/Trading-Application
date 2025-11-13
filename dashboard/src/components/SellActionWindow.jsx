import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");
  const context = useContext(GeneralContext);

  const handleSellClick = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      });
      // success: clear errors, close and refresh
      setError("");
      if (context && context.closeSellWindow) context.closeSellWindow();
      window.location.reload();
    } catch (err) {
      console.error("Sell request failed", err);
      // show inline error instead of alert and keep window open for correction
      const msg = err?.response?.data?.message || "Sell failed. Please try again.";
      setError(msg);
    }
  };

  const handleCancelClick = () => {
    if (context && context.closeSellWindow) context.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        {error && (
          <div className="alert alert-danger" role="alert" style={{ margin: "0 26px 12px" }}>
            {error}
          </div>
        )}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
