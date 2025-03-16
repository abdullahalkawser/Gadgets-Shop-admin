"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyComponent = () => {
  // State to store the fetched data
  const [data, setData] = useState<any[]>([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle error state
  const [error, setError] = useState<string | null>(null);
  // State to handle delete operation message
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // State for loading during delete

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data); // Update state with fetched data
    } catch (error) {
      setError(error.message); // Update state with error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (productId: string) => {
    setIsDeleting(true); // Set loading state for delete
    try {
      const response = await fetch(`http://localhost:3000/api/updates/${productId}`, {
        method: "DELETE", // HTTP method for delete
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setDeleteMessage("Product deleted successfully!"); // Set success message
      setData(data.filter((product: { _id: string }) => product._id !== productId)); // Remove deleted product from state
    } catch (error) {
      setDeleteMessage(`Error: ${error.message}`); // Set error message
    } finally {
      setIsDeleting(false); // Stop loading after delete
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Explore Our Products
        </h1>

        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {deleteMessage && <p className="text-center mt-4">{deleteMessage}</p>} {/* Display delete message */}

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((product: any) => (
              <div
                key={product._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                {/* Product Images Carousel */}
                {product.images && product.images.length > 0 && (
                  <div className="flex overflow-x-auto space-x-2 mb-4">
                    {product.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.productName} - ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {product.productName}
                </h2>
                <p className="text-lg text-gray-600 mb-2">{product.productTitle}</p>
                <p className="text-sm text-gray-500 italic mb-4">{product.category}</p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-500">${product.price}</span>
                  <span className="text-sm text-gray-400">
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link href={`/update/${product._id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={isDeleting} // Disable button while deleting
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
