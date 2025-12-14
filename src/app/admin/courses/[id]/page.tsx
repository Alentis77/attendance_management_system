import { getCourse, getFaculties, getSemesters } from '@/lib/data';
import { updateCourse } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [course, faculties, semesters] = await Promise.all([
        getCourse(id),
        getFaculties(),
        getSemesters()
    ]);

    if (!course) {
        redirect('/admin/courses');
    }

    const updateCourseWithId = updateCourse.bind(null, id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Course</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl">
                <form action={updateCourseWithId} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Code (e.g. CS101)</label>
                        <input
                            type="text"
                            name="code"
                            defaultValue={course.code}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={course.name}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Faculty</label>
                        <select
                            name="faculty"
                            defaultValue={course.faculty?.toString()}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map(f => <option key={f._id.toString()} value={f._id.toString()}>{f.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Semester</label>
                        <select
                            name="semester"
                            defaultValue={course.semester?.toString()}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        >
                            <option value="">Select Semester</option>
                            {semesters.map(s => <option key={s._id.toString()} value={s._id.toString()}>{s.name} ({(s.academicYear as any)?.year})</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <a href="/admin/courses" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</a>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
