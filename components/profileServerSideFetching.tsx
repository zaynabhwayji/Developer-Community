import Link from "next/link";
import { deletePost } from "@/lib/actions";


interface User {
  _id: string;
  username: string;
  name: string;
  bio: string;
  location: string;
  website: string;
  avatar: string;
  skills: string[];
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
}

const Profile = async ({ id }: { id: string }) => {
  const res = await fetch(`http://localhost:3000/api/profile/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h2>User not found</h2>;
  }

  const { user, posts }: { user: User; posts: Post[] } =
    await res.json();
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Profile Header */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 text-center space-y-4">
        <img
          src={user.avatar || "/avatar.png"}
          className="w-24 h-24 rounded-full mx-auto"
          alt="avatar"
        />
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        {user.bio && <p className="text-gray-700">{user.bio}</p>}
        {user.location && <p className="text-gray-500">{user.location}</p>}

        {user.website && (
          <p className="text-blue-600 hover:underline">
            <a href={user.website} target="_blank">{user.website}</a>
          </p>
        )}
        <ul className="flex gap-2 flex-wrap justify-center">
          {user.skills.length === 0 && <p className="text-gray-500">No skills yet.</p>}
          {user.skills?.map((skill: string, idx: number) => (
            <li
              key={idx}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>

        {/* Edit Profile Button */}
        <Link
          href={`/profile/${user._id}/edit`}
          className="inline-block mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300"
        >
          Edit Profile
        </Link>
      </div>

      {/* User Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Your Posts</h2>

        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>

            <div className="flex gap-4 mt-4">
              {/* Edit Button */}
              <Link
                href={`/posts/${post._id}/edit`}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Edit
              </Link>

              {/* Delete Button */}
              <form action={deletePost}>
                <input type="hidden" name="postId" value={post._id} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;