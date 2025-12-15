import { getFaculties } from '@/lib/data';
import StudentRegistrationForm from './student-registration-form';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RegisterStudentPage() {
    const faculties = await getFaculties();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
                        <GraduationCap className="h-10 w-10" />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Student Registration
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your details to register for the semester.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <StudentRegistrationForm faculties={JSON.parse(JSON.stringify(faculties))} />
                </div>
            </div>
        </div>
    );
}
