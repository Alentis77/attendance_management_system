import { getAdminStats } from '@/lib/data';

export const dynamic = 'force-dynamic';
import { Users, GraduationCap, BookOpen, Calendar } from 'lucide-react';

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    const cards = [
        { name: 'Total Lecturers', value: stats.lecturers, icon: Users, color: 'bg-blue-500' },
        { name: 'Total Students', value: stats.students, icon: GraduationCap, color: 'bg-green-500' },
        { name: 'Total Courses', value: stats.courses, icon: BookOpen, color: 'bg-yellow-500' },
        { name: 'Total Sessions', value: stats.sessions, icon: Calendar, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.name}
                        className="overflow-hidden rounded-lg bg-white shadow"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <card.icon className={`h-6 w-6 text-white p-1 rounded-md ${card.color}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            {card.name}
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {card.value}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
