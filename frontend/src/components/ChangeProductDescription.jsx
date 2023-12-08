import { useState } from "react";

function ChangeProductDescription() {
  const [productId, setProductId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeDescription = async () => {
    if (!productId || !newDescription) {
      setMessage("Please fill in both fields.");
      return;
    }

    setIsLoading(true);
    try {
      const requestBody = JSON.stringify({ productId, newDescription });
      const response = await fetch(
        "http://localhost:3000/api/change-product-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        },
      );

      const responseData = await response.json();
      if (response.ok) {
        setMessage(
          responseData.message || "Product description updated successfully",
        );
        setProductId("");
        setNewDescription("");
      } else {
        setMessage(responseData.error || "Error updating product description");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Internal server error");
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Change Product Description
        </h2>

        <form className="space-y-3">
          <div>
            <input
              type="text"
              id="productId"
              placeholder="Product ID"
              value={productId}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div>
            <textarea
              type="text"
              id="newDescription"
              placeholder="New Description"
              value={newDescription}
              rows={5}
              className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handleChangeDescription}
            disabled={isLoading}
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Updating..." : "Update Description"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export default ChangeProductDescription;
