import { useState } from "react";

const TaxCalculator = () => {
  const [state, setState] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [taxAmount, setTaxAmount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/calculate-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, subtotal }),
      });
      const data = await response.json();

      setTaxAmount(data.taxAmount);
    } catch (error) {
      console.error("Error calculating tax:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto mb-8 max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Tax Calculator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              id="state"
              placeholder="State Code (e.g. VA)"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <input
              type="number"
              id="subtotal"
              placeholder="Basket Subtotal"
              value={subtotal}
              onChange={(e) => setSubtotal(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate Tax
          </button>
        </form>
        {taxAmount !== null && (
          <p className="mt-4 text-sm text-gray-600">
            <strong>Tax Amount:</strong> ${taxAmount.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;
