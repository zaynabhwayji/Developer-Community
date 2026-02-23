'use client'
import React from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    if (res.ok) {
      setMessage("Post published successfully");
      setTitle("");
      setContent("");
    }
    else {
      setMessage("Failed to publish post");
    }
    redirect("/home");
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          Create New Post
        </h1>
        <p className="text-gray-600 text-lg">
          Share your programming knowledge with the community
        </p>
      </div>

      {/* Create Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              name="title"
              required
              minLength={5}
              maxLength={200}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base"
              placeholder="e.g., Getting Started with Next.js 15"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Make it clear and descriptive (5-200 characters)</p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              required
              minLength={20}
              maxLength={10000}
              rows={14}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base resize-none"
              placeholder="Share your knowledge, insights, or tutorial... Be detailed and helpful!"
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Min 20 characters, max 10,000 characters</p>
          </div>

          {/* Preview Note */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-blue-900 mb-1">Tips for a great post:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use clear headings and formatting</li>
                  <li>• Include code examples if relevant</li>
                  <li>• Be respectful and constructive</li>
                  <li>• Proofread before publishing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-blue-300 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg text-lg"
            >
              📤 Publish Post
            </button>
            <Link
              href="/home"
              className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 text-center text-lg"
            >
              Cancel
            </Link>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
