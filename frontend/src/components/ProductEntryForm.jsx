import { useState, useEffect } from "react";

function ProductManagement() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    imageFileName: "",
    price: "",
    isActive: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // API call to add new product
      await fetch("http://localhost:3000/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        imageFileName: "",
        price: "",
        isActive: false,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSearch = async () => {
    try {
      // API call to search products
      const response = await fetch(
        `http://localhost:3000/api/search-products?query=${searchQuery}`,
      );
      const data = await response.json();
      setProductList(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  const handleClear = async () => {
    setSearchQuery("");
    fetchProducts();
  };
  const fetchProducts = async () => {
    try {
      // API call to get products
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();

      setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-xl rounded bg-white px-8 py-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            placeholder="Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />

          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />

          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            placeholder="Image File Name"
            name="imageFileName"
            value={newProduct.imageFileName}
            onChange={handleInputChange}
          />

          <input
            className="mt-1 block w-full rounded-md border border-black p-2 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 border-4 border-black text-blue-600"
              name="isActive"
              checked={newProduct.isActive}
              onChange={(e) =>
                setNewProduct({ ...newProduct, isActive: e.target.checked })
              }
            />
            <span className="ml-2 text-black">Active</span>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="mb-4">
        <h2 className="mb-3 text-xl font-bold text-white">Search Products</h2>
        <input
          className="mr-2 rounded border p-2"
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="mr-2  rounded bg-green-500 px-4 py-2 text-white"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      <div className="rounded-lg bg-gray-100 p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Product List</h2>
        {productList.length === 0 ? (
          <h2>No matches found for "{searchQuery}"</h2>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {productList.map((product, index) => (
              <li
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong className="font-semibold">Name:</strong>{" "}
                    {product[1]}
                  </p>
                  <p>
                    <strong className="font-semibold">Description:</strong>{" "}
                    {product[2]}
                  </p>
                  <p>
                    <strong className="font-semibold">Image:</strong>{" "}
                    {product[3]}
                  </p>
                  <p>
                    <strong className="font-semibold">Price:</strong>{" "}
                    {typeof product[4] === "number"
                      ? `$${product[4].toFixed(2)}`
                      : "N/A"}
                  </p>
                  <p>
                    <strong className="font-semibold">Status:</strong>{" "}
                    {product[8] === 1 ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Inactive</span>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
