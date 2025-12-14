import { getAttendanceSessionDetails } from '@/lib/data';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function AdminAttendanceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, records } = await getAttendanceSessionDetails(id);

    if (!session) {
        redirect('/admin/attendance');
    }

    const presentCount = records.filter((r: any) => r.status === 'present').length;
    const absentCount = records.filter((r: any) => r.status === 'absent').length;
    const totalCount = records.length;
    const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/attendance" className="inline-flex items-center text-indigo-600 hover:text-indigo-900">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to All Sessions
                </Link>
            </div>

            <div className="bg-white shadow overflow-x-auto sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Session Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Attendance information for this session.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Course</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{(session.course as any)?.code} - {(session.course as any)?.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Lecturer</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{(session as any).lecturer?.name || 'Unknown'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(session.date).toLocaleDateString()}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Time</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session.startTime || 'N/A'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Summary</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="text-green-600 font-semibold">{presentCount} Present</span> / <span className="text-red-600 font-semibold">{absentCount} Absent</span> ({attendancePercentage}%)
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Student Records</h3>
            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map((record: any) => (
                            <tr key={record._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{(record.student as any)?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(record.student as any)?.indexNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {record.status === 'present' ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Present</span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Absent</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
