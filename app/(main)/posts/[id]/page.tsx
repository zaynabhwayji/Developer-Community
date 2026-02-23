import Connection from "@/lib/mongodb";
import Post from "@/models/Post";
interface User {
    username: string;
}
interface Post {
    _id: string;
    title: string;
    content: string;
    author: User;
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await Connection();
    const post = await Post.findById(id).populate("author").lean();

    if (!post) return <p>Post not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-600 mt-2">
                By <a href={`/users/${post.author.username}`} className="text-blue-600 hover:underline">{post.author.name}</a>
            </p>
            <div className="mt-6 text-gray-700">{post.content}</div>
        </div>
    );
}