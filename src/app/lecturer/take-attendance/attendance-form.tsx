'use client';

import { useState } from 'react';
import { getCoursesByFacultyAndSemester, getStudentsByFaculty, submitAttendance } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AttendanceForm({ years, semesters, faculties }: any) {
    const router = useRouter();
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const [courses, setCourses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const filteredSemesters = semesters.filter((s: any) => {
        const yearId = typeof s.academicYear === 'object' ? s.academicYear._id : s.academicYear;
        return yearId === selectedYear;
    });

    const handleFacultyChange = async (facultyId: string) => {
        setSelectedFaculty(facultyId);
        setSelectedCourse('');
        setStudents([]);
        if (facultyId && selectedSemester) {
            setLoading(true);
            const fetchedCourses = await getCoursesByFacultyAndSemester(facultyId, selectedSemester);
            setCourses(fetchedCourses);
            setLoading(false);
        }
    };

    const handleCourseChange = async (courseId: string) => {
        setSelectedCourse(courseId);
        if (courseId && selectedFaculty) {
            setLoading(true);
            const fetchedStudents = await getStudentsByFaculty(selectedFaculty);
            setStudents(fetchedStudents);
            const initialAttendance: Record<string, boolean> = {};
            fetchedStudents.forEach((s: any) => {
                initialAttendance[s._id] = true;
            });
            setAttendance(initialAttendance);
            setLoading(false);
        }
    };

    const toggleAttendance = (studentId: string) => {
        setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        const records = Object.entries(attendance).map(([studentId, isPresent]) => ({
            studentId,
            status: isPresent ? 'present' : 'absent' as 'present' | 'absent'
        }));

        try {
            await submitAttendance({
                courseId: selectedCourse,
                date: new Date(),
                records
            });
            alert('Attendance submitted successfully!');
            router.push('/lecturer/dashboard');
        } catch (e) {
            alert('Error submitting attendance');
        }
        setSubmitting(false);
    };

    return (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow">
            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 p-2" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        <option value="">Select Year</option>
                        {years.map((y: any) => <option key={y._id} value={y._id}>{y.year}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 p-2" value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)} disabled={!selectedYear}>
                        <option value="">Select Semester</option>
                        {filteredSemesters.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Faculty</label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 p-2" value={selectedFaculty} onChange={e => handleFacultyChange(e.target.value)} disabled={!selectedSemester}>
                        <option value="">Select Faculty</option>
                        {faculties.map((f: any) => <option key={f._id} value={f._id}>{f.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 p-2" value={selectedCourse} onChange={e => handleCourseChange(e.target.value)} disabled={!selectedFaculty}>
                        <option value="">Select Course</option>
                        {courses.map((c: any) => <option key={c._id} value={c._id}>{c.code} - {c.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Students List */}
            {selectedCourse && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Students List</h3>
                    {loading ? <Loader2 className="animate-spin h-8 w-8 text-indigo-600" /> : (
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Index Number</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {students.map((student) => (
                                        <tr key={student._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{student.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.indexNumber}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                                        checked={attendance[student._id] || false}
                                                        onChange={() => toggleAttendance(student._id)}
                                                    />
                                                    <span className="ml-2">{attendance[student._id] ? 'Present' : 'Absent'}</span>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || students.length === 0}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                        >
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Attendance
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
