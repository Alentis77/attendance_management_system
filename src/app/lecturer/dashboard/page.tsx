import Link from 'next/link';
import { ClipboardCheck, FileText } from 'lucide-react';

export default function LecturerDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Lecturer Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/lecturer/take-attendance" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                            <ClipboardCheck className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold text-gray-900">Take Attendance</h2>
                            <p className="text-gray-500">Start a new attendance session for a course.</p>
                        </div>
                    </div>
                </Link>
                <Link href="/lecturer/reports" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold text-gray-900">View Reports</h2>
                            <p className="text-gray-500">Check attendance records and statistics.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
