import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="px-6 py-4 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <GraduationCap className="h-8 w-8" />
          <span>UniAttend</span>
        </div>
        <Link
          href="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
        >
          Sign In
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          University Attendance <br className="hidden md:block" />
          <span className="text-indigo-600">Management System</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-600 mb-10">
          Streamline your academic attendance tracking.
          Secure access for Admins and Lecturers.
          Real-time reporting and easy management.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} University Attendance System. All rights reserved.
      </footer>
    </div>
  );
}
