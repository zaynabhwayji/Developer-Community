import mongoose from "mongoose";

const Connection = process.env.MONGODB_URI || "";
if (!Connection) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export default async function connectMongo() {
  if (cached!.conn) return cached!.conn;
  
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(Connection as string, {
      bufferCommands: false,
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}