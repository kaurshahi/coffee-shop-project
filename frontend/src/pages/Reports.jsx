import React from "react";
import CheckBasketStock from "./CheckBasketStock";
import ShopperTotalSpending from "./ShopperTotalSpending";

const Reports = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto mb-8 max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          BrewBean's Reports
        </h2>
        <div>
          <CheckBasketStock />
          <ShopperTotalSpending />
        </div>
      </div>
    </div>
  );
};

export default Reports;
