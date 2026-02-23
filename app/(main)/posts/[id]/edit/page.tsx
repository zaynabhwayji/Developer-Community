import Link from "next/link";
import Connection from "@/lib/mongodb";
import Post from "@/models/Post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { updatePost } from "@/lib/actions";
export const metadata = {
    title: 'Edit Post - Developer Community',
    description: 'Update your prost details',
};

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await Connection();

  const session = await auth();
  if (!session) redirect("/signin");

  const post = await Post.findById(id);

  if (!post) {
    return <h2 className="text-center mt-10">Post not found</h2>;
  }
  const authId = session.user?.id;

  async function handleSubmit(formData: FormData) {
    "use server";
    await updatePost(id, formData);
    redirect(`/profile/${authId}`);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Edit Post
        </h1>
        <p className="text-gray-600 text-lg">
          Update your post content
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
        <form action={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              name="title"
              defaultValue={post.title}
              required
              minLength={5}
              maxLength={200}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              defaultValue={post.content}
              required
              minLength={20}
              maxLength={10000}
              rows={14}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              Save Changes
            </button>

            <Link
              href={`/posts/${id}`}
              className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}