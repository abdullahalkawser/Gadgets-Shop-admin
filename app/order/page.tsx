"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateProductPage = () => {
  const router = useRouter(); // Initialize useRouter
  const [productName, setProductName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("gaming");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state added

  const handleUploadSuccess = (result: { event: string; info: { secure_url: string } }) => {
    if (result.event === "success") {
      setImages((prev) => [...prev, result.info.secure_url]);
      toast.success("Image uploaded successfully!"); // ✅ Show success toast
    } else {
      toast.error("Error uploading image!"); // ✅ Show error toast
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productTitle", productTitle);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);

    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Product created successfully!"); // ✅ Show success toast
        setProductName("");
        setProductTitle("");
        setCategory("gaming");
        setDescription("");
        setPrice("");
        setImages([]);

        router.push("/"); // Navigate to the home page
      } else {
        toast.error("Error creating product!"); // ✅ Show error toast
      }
    } catch (error) {
      toast.error("Network error. Try again!"); // ✅ Show error toast
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create New Product
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Title */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Product Title</label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            placeholder="Enter product title"
            className="p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="gaming">Gaming</option>
            <option value="phone">Phone</option>
            <option value="camera">Camera</option>
            <option value="pc">PC</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={4}
            className="p-3 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Cloudinary Image Upload */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Upload Images</label>
          <CldUploadWidget
            uploadPreset="gadgets-shops"
            onUpload={handleUploadSuccess}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* Display Uploaded Images */}
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index}`}
              className="w-32 h-32 rounded-md object-cover"
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white px-6 py-3 rounded-md font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
