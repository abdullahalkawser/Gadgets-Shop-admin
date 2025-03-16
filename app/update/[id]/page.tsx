"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// You can use a CSS framework like TailwindCSS for better styling, or add your own CSS.

const EditProduct = ({ params }) => {
  const { id } = React.use(params); // Access id from the router query params
    const router = useRouter(); // Initialize useRouter

  const [product, setProduct] = useState({
    productName: "",
    title: "",
    category: "",
    description: "",
    price: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch the product data if id exists
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/updates/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setMessage("Error fetching product data");
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const res = await fetch(`/api/updates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await res.json();
      setMessage(`Product updated successfully: ${updatedProduct.productName}`);
      setLoading(false);
      router.push('/')
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="spinner"></div> {/* Add a spinner animation */}
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div
                className={`p-4 ${
                  message.includes("successfully")
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white rounded-md`}
              >
                {message}
              </div>
            )}

            <div>
              <label htmlFor="productName" className="block font-semibold">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={product.productName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block font-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.productTitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block font-semibold">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter category"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="price" className="block font-semibold">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label htmlFor="images" className="block font-semibold">
                Images (URL)
              </label>
              <input
                type="text"
                id="images"
                name="images"
                value={product.images.join(", ")}
                onChange={(e) => setProduct({ ...product, images: e.target.value.split(", ") })}
                className="w-full p-2 border rounded-md"
                placeholder="Enter image URLs (comma separated)"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditProduct;
