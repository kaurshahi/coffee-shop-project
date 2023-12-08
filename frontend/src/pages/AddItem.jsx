import { useState } from "react";

const AddItem = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    basketId: "",
    productId: "",
    price: "",
    quantity: "",
    sizeCode: "",
    formCode: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.basketId ||
      !formData.productId ||
      !formData.price ||
      !formData.quantity ||
      !formData.sizeCode ||
      !formData.formCode
    ) {
      setMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/add-basket-item",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setMessage(response.json().message || "Product Added successfully");
        setFormData({
          basketId: "",
          productId: "",
          price: "",
          quantity: "",
          sizeCode: "",
          formCode: "",
        });
      } else {
        setMessage(response.json().message || "Error Adding Product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Add Item to Basket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Basket ID"
            name="basketId"
            value={formData.basketId}
            onChange={handleInputChange}
          />
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Product ID"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
          />
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Size Code"
            name="sizeCode"
            value={formData.sizeCode}
            onChange={handleInputChange}
          />
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Form Code"
            name="formCode"
            value={formData.formCode}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
          >
            Add to Basket
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default AddItem;
