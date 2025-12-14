import { getFaculty } from '@/lib/data';
import { updateFaculty } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function EditFacultyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log('Edit Faculty Page ID:', id);
    const faculty = await getFaculty(id);
    console.log('Edit Faculty Page Found:', faculty);

    if (!faculty) {
        console.log('Faculty not found, redirecting...');
        redirect('/admin/faculties');
    }

    const updateFacultyWithId = updateFaculty.bind(null, id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Faculty</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-md">
                <form action={updateFacultyWithId} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name (e.g. Faculty of Science)</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={faculty.name}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <a href="/admin/faculties" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</a>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
