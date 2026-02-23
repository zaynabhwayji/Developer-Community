import Connection from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Connection();
    const users = await User.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users", details: error?.message ?? String(error) },
      { status: 500 }
    );
  }
}


