import clientPromise from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type Product = {
  productName: string;
  productTitle: string;
  category: string;
  description: string;
  price: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { productName, productTitle, category, description, price }: Product = req.body;

    try {
      const product = await db.collection('products').insertOne({
        productName,
        productTitle,
        category,
        description,
        price,
        createdAt: new Date(),
      });
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
