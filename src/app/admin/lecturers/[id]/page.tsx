import { getLecturer } from '@/lib/data';
import { updateLecturer } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function EditLecturerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lecturer = await getLecturer(id);

    if (!lecturer) {
        redirect('/admin/lecturers');
    }

    const updateLecturerWithId = updateLecturer.bind(null, id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Lecturer</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl">
                <form action={updateLecturerWithId} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={lecturer.name}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={lecturer.email}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <a href="/admin/lecturers" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</a>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
