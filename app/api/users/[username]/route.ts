import Connection from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  await Connection();
  const { username } = await params;
  const user = await User.findOne({ username });
  const posts = await Post.find({ author: user._id })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ user, posts });
}