import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const UserProfilePage = async ({ username }: { username: String }) => {
  const res = await fetch(`http://localhost:3000/api/users/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return (
      <div>
        <h2>Not found</h2>
        <pre>{res.status} - {text}</pre>
      </div>
    );
  }
  const { user, posts } = await res.json();


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

        {/* Skills */}
        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-2">Skills:</p>
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
        </div>
      </div>

      {/* User Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>

        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}

        {posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
};
export default UserProfilePage;
