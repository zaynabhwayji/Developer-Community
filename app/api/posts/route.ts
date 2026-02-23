import Connection from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth"

export async function GET() {
  try {
    await Connection();
    const posts = await Post.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch posts", error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await Connection();

    const session = await auth();

    let user = null;

    if (session?.user?.id) {
      await Connection();
      const user = await User.findById(session.user.id);
    }
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const post = await Post.create({
      title: body.title,
      content: body.content,
      author: session.user?.id,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create post", error: String(error) }, { status: 500 });
  }

}