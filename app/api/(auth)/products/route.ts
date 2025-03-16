
import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Product from "../../../../lib/modals/product";


export const POST = async (req: Request) => {
  try {
    await connect(); // Connect to MongoDB

    // Get form data from the request body
    const formData = await req.formData();
    console.log("Received form data:", formData);

    // Extract data from the form
    const productName = formData.get("productName")?.toString() || '';
    const productTitle = formData.get("productTitle")?.toString() || '';
    const category = formData.get("category")?.toString() || '';
    const description = formData.get("description")?.toString() || '';
    const price = Number(formData.get("price")?.toString()) || 0; // Convert to number
    
    // Extract all image URLs or Cloudinary IDs
    const images = formData.getAll("images") as string[]; // Assuming images are URLs or Cloudinary IDs

    // Check if a product with the same name or title already exists
    const existingProduct = await Product.findOne({
      $or: [{ productName }, { productTitle }],
    });

    if (existingProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product with this name or title already exists!" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a new product
    const newProduct = new Product({
      productName,
      productTitle,
      category,
      description,
      price,
      images, // Assuming you handle image storage or URLs here
    });

    console.log("New product object:", newProduct);

    // Save the product to the database
    await newProduct.save();

    return new NextResponse(
      JSON.stringify({ message: "Product created successfully!", product: newProduct }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("POST Error:", error);

    return new NextResponse(
      JSON.stringify({ message: "Internal Server Errorrrr" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
      
    );
  }
};




export const GET = async () => {
    try {
        await connect();
        const users = await Product.find();
        return new NextResponse(JSON.stringify(users), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
