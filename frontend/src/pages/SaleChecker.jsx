import { useState } from "react";

const SaleChecker = () => {
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [saleStatus, setSaleStatus] = useState("");

  const checkSaleStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/checkSale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, date }),
      });
      const data = await response.json();

      setSaleStatus(data);
    } catch (error) {
      console.error("Error fetching sale status:", error);
      setSaleStatus("Error fetching sale status");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkSaleStatus();
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto mb-8 max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Check Product Sale Status
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="mb-3">
            <input
              type="number"
              id="productId"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              id="date"
              placeholder="YYYY-MM-DD"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Check Sale Status
          </button>
        </form>

        {saleStatus && (
          <div className="mb-4 rounded-lg bg-blue-100 p-4 text-center text-sm text-blue-700">
            {saleStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleChecker;
