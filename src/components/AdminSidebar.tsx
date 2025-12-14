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
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import { useState } from 'react';

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

function SidebarContent({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-indigo-700 text-white">
            <div className="flex h-16 items-center justify-center bg-indigo-800 text-xl font-bold">
                Admin Portal
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
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

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-indigo-800 flex items-center justify-between px-4 z-40 shadow-md">
                <div className="text-white font-bold text-xl">Admin Portal</div>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 flex-col h-full">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative w-64 h-full shadow-xl transform transition-transform">
                        <SidebarContent onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}
