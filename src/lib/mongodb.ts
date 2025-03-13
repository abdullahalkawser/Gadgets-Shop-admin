// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);
console.log(client)

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to hold the client.
  // This prevents creating multiple clients during hot reloading.
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's safe to always create a new client.
  clientPromise = client.connect();
}

export default clientPromise; 
