import Link from 'next/link';
import User from "@/models/User";
import { redirect } from "next/navigation";
import { updateUser } from '@/lib/actions';

export const metadata = {
    title: 'Edit Profile - Developer Community',
    description: 'Update your profile information',
};

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) redirect("/");

    async function handleSubmit(formData: FormData) {
        'use server';
        const result = await updateUser(id, formData);
        redirect(`/profile/${id}`);
    }

    const user = await User.findById(id);

    return (
        <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    Edit Profile
                </h1>
                <p className="text-gray-600 text-lg">
                    Update your profile information
                </p>
            </div>

            {/* Edit Form Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">

                <form action={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={user.name}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                            Username *
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={user.username}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base"
                        />


                        <p className="text-sm text-gray-500 mt-1">Lowercase letters, numbers, and underscores only</p>
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user.email}
                            readOnly
                            disabled
                            className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl text-base text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            defaultValue={user.bio}
                            rows={4}
                            maxLength={500}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base resize-none"
                        />
                        <p className="text-sm text-gray-500 mt-1">Max 500 characters</p>
                    </div>

                    {/* Skills */}
                    <div>
                        <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
                            Skills
                        </label>
                        <input
                            type="text"
                            name="skills"
                            defaultValue={user.skills}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base"
                        />
                        <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
                    </div>

                    {/* Website */}
                    <div>
                        <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                            Website
                        </label>
                        <input
                            type="url"
                            name="website"
                            defaultValue={user.website}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={user.location}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                        >
                            Save Changes
                        </button>
                        <Link
                            href={`/profile/${id}`}
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
