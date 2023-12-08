import React, { useState } from "react";

const UpdateOrderStatus = () => {
  const [basketNumber, setBasketNumber] = useState("");
  const [dateShipped, setDateShipped] = useState("");
  const [shipper, setShipper] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/update-order-status",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            basketNumber,
            dateShipped,
            shipper,
            trackingNumber,
          }),
        },
      );

      if (response.ok) {
        setBasketNumber("");
        setDateShipped("");
        setShipper("");
        setTrackingNumber("");
        setMessage("Order status updated successfully");
      } else {
        setMessage("Error updating order status");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Internal server error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto mb-8 max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Update Order Status
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="number"
              id="basketNumber"
              placeholder="Basket Number"
              value={basketNumber}
              onChange={(e) => setBasketNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <input
              type="date"
              id="dateShipped"
              placeholder="Date Shipped"
              value={dateShipped}
              onChange={(e) => setDateShipped(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <input
              type="text"
              id="shipper"
              placeholder="Shipper"
              value={shipper}
              onChange={(e) => setShipper(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <input
              type="text"
              id="trackingNumber"
              placeholder="Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Status
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
