import connect from "@/lib/db"; // DB connection helper
import Product from "@/lib/modals/product"; // Product model
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    const { id } = await params; // Extract product ID from the URL params
    const { productName, title, category, description, price, images } = await request.json(); // Extract product data from request body

    try {
        await connect(); // Connect to the database
        
        // Find and update the product by its ID
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                productName,
                title,
                category,
                description,
                price,
                images
            },
            { new: true } // This returns the updated product
        );

        // If product not found
        if (!updatedProduct) {
            return new NextResponse(JSON.stringify({ message: "Product not found!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Return the updated product
        return new NextResponse(JSON.stringify(updatedProduct), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        // Error handling
        return new NextResponse(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const GET = async (request, { params }) => {
    try {
      const { id } = await params; // Extract product ID from the URL params
  
      await connect(); // Connect to the database
  
      // Fetch product by ID
      const product = await Product.findById(id); 
  
      if (!product) {
        return new Response("Product not found", { status: 404 });
      }
  
      return new Response(JSON.stringify(product), { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Internal Server Error", { status: 500 });
    }
  };


  
  export const DELETE = async (request, { params }) => {
    try {
        const { id } = await params; // Extract product ID from the URL params
        const productId = id;

      if (!productId) {
        return new NextResponse(
          JSON.stringify({ message: "Product ID is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Find and delete the product
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return new NextResponse(
          JSON.stringify({ message: "Product not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
  
      return new NextResponse(
        JSON.stringify({ message: "Product deleted successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("DELETE Error:", error);
  
      return new NextResponse(
        JSON.stringify({ message: "Internal Server Error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
};