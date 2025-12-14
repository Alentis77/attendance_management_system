import { getFaculties } from '@/lib/data';
import { createFaculty, deleteFaculty } from '@/lib/actions';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

export default async function FacultiesPage() {
    const faculties = await getFaculties();
    console.log('Faculties Data:', JSON.stringify(faculties, null, 2));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Faculties</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Add New Faculty</h2>
                <form action={createFaculty} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Name (e.g. Faculty of Science)</label>
                        <input type="text" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900" />
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add</button>
                </form>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {faculties.map((fac) => (
                            <tr key={fac._id.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fac.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                                    <a href={`/admin/faculties/${fac._id.toString()}`} className="text-indigo-600 hover:text-indigo-900">
                                        <Pencil className="h-5 w-5" />
                                    </a>
                                    <DeleteButton id={fac._id.toString()} deleteAction={deleteFaculty} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
