import { useState } from "react";

function ChangeProductDescription() {
  const [productId, setProductId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeDescription = async () => {
    try {
      const requestBody = JSON.stringify({ productId, newDescription });
      const response = await fetch("http://localhost:3000/api/change-product-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        
        setMessage("Product description updated successfully");
      } else {
        
        setMessage("Error updating product description");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Internal server error");
    }
  };

  return (
    <div>
      <h2>Change Product Description</h2>
      <div>
        <label htmlFor="productId" className="mx-5">Product ID:</label>
        <input
          type="text"
          id="productId"
          value={productId}
          className="border-black border rounded-lg py-2 my-3"
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div >
        <label htmlFor="newDescription" className="mx-5">New Description:</label>
        <input
          type="text"
          id="newDescription"
          value={newDescription}
          className="border-black border rounded-lg py-2 my-3"
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <button onClick={handleChangeDescription}>Update Description</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangeProductDescription;
