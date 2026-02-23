
import Connection from "@/lib/mongodb";
import Post from "@/models/Post";
import Link from "next/link";

export const metadata = {
  title: 'Home - Developer Community',
  description: 'See the latest posts shared by users in our community',
};

export default async function HomePage() {
  await Connection();

  // Fetch posts with populated author
  const posts = await Post.find()
    .populate("author")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      {posts.map((post: any) => (
        <div key={post._id} className="bg-white p-6 rounded-2xl shadow-md border">

          {/* Author info */}
          <div className="flex items-center gap-3 mb-2">
            {post.author?.image && (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <Link
              href={`/users/${post.author?.username}`}
              className="text-blue-700 font-semibold hover:underline"
            >
              {post.author?.name || "Unknown"}
            </Link>
          </div>

          {/* Post title */}
          <h2 className="text-xl font-bold">{post.title}</h2>

          {/* Post content */}
          <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
          <Link
            href={`/posts/${post._id}`}
            className="text-blue-600 hover:underline mt-1 inline-block"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}