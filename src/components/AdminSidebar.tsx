'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    GraduationCap,
    Users,
    UserCog,
    LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Academic Years', href: '/admin/academic-years', icon: Calendar },
    { name: 'Semesters', href: '/admin/semesters', icon: Calendar },
    { name: 'Faculties', href: '/admin/faculties', icon: BookOpen },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Students', href: '/admin/students', icon: GraduationCap },
    { name: 'Lecturers', href: '/admin/lecturers', icon: UserCog },
    { name: 'Attendance', href: '/admin/attendance', icon: Users },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex w-64 flex-col bg-indigo-700 text-white">
            <div className="flex h-16 items-center justify-center bg-indigo-800 text-xl font-bold">
                Admin Portal
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? 'bg-indigo-800 text-white'
                                    : 'text-indigo-100 hover:bg-indigo-600 hover:text-white',
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    'mr-3 h-6 w-6 flex-shrink-0',
                                    isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-indigo-800 p-4">
                <button
                    onClick={() => signOut()}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-600 hover:text-white"
                >
                    <LogOut
                        className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300 group-hover:text-white"
                        aria-hidden="true"
                    />
                    Sign out
                </button>
            </div>
        </div>
    );
}
