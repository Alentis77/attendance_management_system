import { getStudent, getFaculties } from '@/lib/data';
import { updateStudent } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [student, faculties] = await Promise.all([
        getStudent(id),
        getFaculties()
    ]);

    if (!student) {
        redirect('/admin/students');
    }

    const updateStudentWithId = updateStudent.bind(null, id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Student</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl">
                <form action={updateStudentWithId} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={student.name}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Index Number</label>
                        <input
                            type="text"
                            name="indexNumber"
                            defaultValue={student.indexNumber}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Faculty</label>
                        <select
                            name="faculty"
                            defaultValue={student.faculty?.toString()}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map(f => <option key={f._id.toString()} value={f._id.toString()}>{f.name}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <a href="/admin/students" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</a>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
