"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';

type ProductImage = File; // Type for the images (array of File objects)

const CreateProductPage = () => {
  // States for form data
  const [productName, setProductName] = useState<string>('');
  const [productTitle, setProductTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('gaming');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [images, setImages] = useState<ProductImage[]>([]);

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const productData = {
      productName,
      productTitle,
      category,
      description,
      price,
    };

    // Prepare form data for image upload
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productTitle', productTitle);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        body: formData, // Sending form data with images
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.ok) {
          alert('Product created successfully');
        } else {
          alert('Failed to create product: ' + result.error);
        }
      } else {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
        alert("Error: Received non-JSON response from API");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the product.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create New Product</h1>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="productName" className="text-gray-700 font-semibold mb-2">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Title */}
        <div className="flex flex-col">
          <label htmlFor="productTitle" className="text-gray-700 font-semibold mb-2">
            Product Title
          </label>
          <input
            id="productTitle"
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            placeholder="Enter product title"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Selection */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-gray-700 font-semibold mb-2">
            Select Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label htmlFor="description" className="text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={4}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Images Upload */}
        <div className="flex flex-col">
          <label htmlFor="productImages" className="text-gray-700 font-semibold mb-2">
            Upload Images
          </label>
          <input
            id="productImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2">
            {images.length > 0 && (
              <div className="flex flex-wrap space-x-4">
                {images.map((image, index) => (
                  <div key={index} className="w-20 h-20 bg-gray-200 rounded-md">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-gray-700 font-semibold mb-2">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
