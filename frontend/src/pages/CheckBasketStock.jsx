import React, { useState, useEffect } from "react";

const CheckBasketStock = () => {
  const [basketId, setBasketId] = useState("");
  const [basketNumbers, setBasketNumbers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/getBasketNumbers")
      .then((response) => response.json())
      .then((data) => setBasketNumbers(data.baskets))
      .catch((error) => console.error("Error fetching basket numbers:", error));
  }, []);

  const checkStock = () => {
    if (!basketId) {
      alert("Please select a basket number.");
      return;
    }

    fetch("http://localhost:3000/api/checkBasketStock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ basketId }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error checking stock:", error));
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Check Basket Stock</h2>
      <div className="mb-4">
        <select
          id="basketSelect"
          value={basketId}
          placeholder="Select Basket Number"
          onChange={(e) => setBasketId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a basket</option>
          {basketNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={checkStock}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Check Stock
      </button>
      {message && (
        <div className="mt-4 rounded-md bg-blue-100 p-3 text-blue-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default CheckBasketStock;
