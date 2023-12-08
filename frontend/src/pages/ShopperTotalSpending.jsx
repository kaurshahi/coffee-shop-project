import { useState } from "react";

const ShopperTotalSpending = () => {
  const [shopperId, setShopperId] = useState("");
  const [totalSpending, setTotalSpending] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTotalSpending = async () => {
    if (!shopperId) {
      alert("Please enter a shopper ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/shopperTotalSpending/${shopperId}`,
      );
      const data = await response.json();

      if (data.TOTALSPENDING !== undefined) {
        setTotalSpending(`Total Spending: ${data.TOTALSPENDING}`);
      } else {
        setTotalSpending("No data found for this shopper ID.");
      }
    } catch (error) {
      console.error("Error:", error);
      setTotalSpending("Error fetching total spending.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Shopper Total Spending</h2>
      <input
        type="number"
        value={shopperId}
        onChange={(e) => setShopperId(e.target.value)}
        className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Enter Shopper ID"
      />
      <button
        onClick={fetchTotalSpending}
        className="mt-3  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate Spending"}
      </button>
      {totalSpending && (
        <div className="mt-4 rounded-md bg-blue-100 p-3 text-blue-700">
          {totalSpending}
        </div>
      )}
    </div>
  );
};

export default ShopperTotalSpending;
