import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");

  const context = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      await axios.post(`${BACKEND_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      });
      // on success clear any errors, close the window and refresh positions
      setError("");
      if (context && context.closeBuyWindow) context.closeBuyWindow();
      // refresh to get updated positions (simple approach)
      window.location.reload();
    } catch (err) {
      console.error("Buy request failed", err);
      // show inline error instead of closing or alerting
      const msg = err?.response?.data?.message || "Buy failed. Please try again.";
      setError(msg);
    }
  };

  const handleCancelClick = () => {
    if (context && context.closeBuyWindow) context.closeBuyWindow();
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
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;