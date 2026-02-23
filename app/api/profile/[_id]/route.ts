import Connection from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await Connection();

  const { id } = await params;

  const user = await User.findOne({ id }).lean();
  const posts = await Post.find({ author: user._id }).lean();

  return NextResponse.json({ user, posts });
}

