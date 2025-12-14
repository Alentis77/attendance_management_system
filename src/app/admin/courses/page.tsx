import { getCourses, getFaculties, getSemesters } from '@/lib/data';
import { createCourse, deleteCourse } from '@/lib/actions';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

export default async function CoursesPage() {
    const courses = await getCourses();
    const faculties = await getFaculties();
    const semesters = await getSemesters();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Courses</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Add New Course</h2>
                <form action={createCourse} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Code (e.g. CS101)</label>
                        <input type="text" name="code" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Faculty</label>
                        <select name="faculty" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900">
                            <option value="">Select Faculty</option>
                            {faculties.map(f => <option key={f._id.toString()} value={f._id.toString()}>{f.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Semester</label>
                        <select name="semester" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900">
                            <option value="">Select Semester</option>
                            {semesters.map(s => <option key={s._id.toString()} value={s._id.toString()}>{s.name} ({(s.academicYear as any)?.year})</option>)}
                        </select>
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add</button>
                </form>
            </div>

            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                            <tr key={course._id.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(course.faculty as any)?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(course.semester as any)?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                                    <Link href={`/admin/courses/${course._id.toString()}`} className="text-indigo-600 hover:text-indigo-900">
                                        <Pencil className="h-5 w-5" />
                                    </Link>
                                    <DeleteButton id={course._id.toString()} deleteAction={deleteCourse} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
