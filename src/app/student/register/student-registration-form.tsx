'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerStudent } from '@/actions/register-student';
// Actually, let's use standard HTML elements first to be safe, or check for UI components.
// I'll stick to standard Tailwind styled elements for now to avoid dependency issues if UI lib isn't fully set up.

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
            {pending ? 'Registering...' : 'Register'}
        </button>
    );
}

export default function StudentRegistrationForm({ faculties }: { faculties: any[] }) {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useActionState(registerStudent, initialState);

    if (state?.success) {
        return (
            <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Registration Successful!</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>You have been successfully registered into the system.</p>
                        </div>
                        <div className="mt-4">
                            <div className="-mx-2 -my-1.5 flex">
                                <button
                                    type="button"
                                    onClick={() => window.location.reload()}
                                    className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                                >
                                    Register Another
                                </button>
                                <a
                                    href="/"
                                    className="ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                                >
                                    Go Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <form action={dispatch} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <div className="mt-1">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                    />
                </div>
                {state?.errors?.name && (
                    <p className="mt-2 text-sm text-red-600" id="name-error">
                        {state.errors.name}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="indexNumber" className="block text-sm font-medium text-gray-700">
                    Index Number
                </label>
                <div className="mt-1">
                    <input
                        id="indexNumber"
                        name="indexNumber"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                    />
                </div>
                {state?.errors?.indexNumber && (
                    <p className="mt-2 text-sm text-red-600" id="indexNumber-error">
                        {state.errors.indexNumber}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
                    Faculty
                </label>
                <div className="mt-1">
                    <select
                        id="faculty"
                        name="faculty"
                        required
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900"
                        defaultValue=""
                    >
                        <option value="" disabled>Select a faculty</option>
                        {faculties.map((faculty) => (
                            <option key={faculty._id} value={faculty._id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>
                {state?.errors?.faculty && (
                    <p className="mt-2 text-sm text-red-600" id="faculty-error">
                        {state.errors.faculty}
                    </p>
                )}
            </div>

            {state?.message && !state?.success && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{state.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <SubmitButton />
            </div>
        </form>
    );
}
