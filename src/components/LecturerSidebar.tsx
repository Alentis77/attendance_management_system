'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ClipboardCheck,
    FileText,
    LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/lecturer/dashboard', icon: LayoutDashboard },
    { name: 'Take Attendance', href: '/lecturer/take-attendance', icon: ClipboardCheck },
    { name: 'Reports', href: '/lecturer/reports', icon: FileText },
];

export default function LecturerSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex w-64 flex-col bg-emerald-700 text-white">
            <div className="flex h-16 items-center justify-center bg-emerald-800 text-xl font-bold">
                Lecturer Portal
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
                                    ? 'bg-emerald-800 text-white'
                                    : 'text-emerald-100 hover:bg-emerald-600 hover:text-white',
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    'mr-3 h-6 w-6 flex-shrink-0',
                                    isActive ? 'text-white' : 'text-emerald-300 group-hover:text-white'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-emerald-800 p-4">
                <button
                    onClick={() => signOut()}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-600 hover:text-white"
                >
                    <LogOut
                        className="mr-3 h-6 w-6 flex-shrink-0 text-emerald-300 group-hover:text-white"
                        aria-hidden="true"
                    />
                    Sign out
                </button>
            </div>
        </div>
    );
}
