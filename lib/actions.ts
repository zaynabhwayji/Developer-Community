"use server";
import Connection from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateUser(id: string, formData: FormData) {
  await Connection();

  const session = await auth();
  if (!session) redirect("/signin");

  if (session.user?.id !== id) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name")?.toString();
  const username = formData.get("username")?.toString().toLowerCase();
  const avatar = formData.get("avatar")?.toString();
  const bio = formData.get("bio")?.toString();
  const website = formData.get("website")?.toString();
  const location = formData.get("location")?.toString();

  const skillsRaw = formData.get("skills")?.toString() || "";
  const skills = skillsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const existingUser = await User.findOne({
    username,
    _id: { $ne: id },
  });

  if (existingUser) {
    return { error: "Username already taken" };
  }

  await User.findByIdAndUpdate(
    id,
    {
      name,
      username,
      avatar,
      bio,
      website,
      location,
      skills,
    },
    { new: true }
  );

  revalidatePath(`/profile/${id}`);

  return { success: true };
}

export async function updatePost(pId: string, formData: FormData) {
  await Connection();

  const session = await auth();
  if (!session) redirect("/signin");

  const post = await Post.findById(pId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.author.toString() !== session.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  console.log("Updating post:", title, content); 

  const updated = await Post.findByIdAndUpdate(
    pId,
    { title, content },
    { new: true } 
  );

  console.log("Updated result:", updated); 

  redirect(`/profile/${session.user?.id}`);
}
export async function deletePost(formData: FormData) {
  const pId = formData.get("pId");
  await Connection();
  await Post.deleteOne({ pId });
}


