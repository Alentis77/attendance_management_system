import { getAcademicYears } from '@/lib/data';
import { createAcademicYear, deleteAcademicYear } from '@/lib/actions';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

export default async function AcademicYearsPage() {
    const years = await getAcademicYears();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Academic Years</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Add New Academic Year</h2>
                <form action={createAcademicYear} className="flex gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year (e.g. 2023-2024)</label>
                        <input type="text" name="year" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900" />
                    </div>
                    <div className="flex items-center mb-2">
                        <input type="checkbox" name="isCurrent" id="isCurrent" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="isCurrent" className="ml-2 block text-sm text-gray-900">Set as Current</label>
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add</button>
                </form>
            </div>

            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {years.map((year) => (
                            <tr key={year._id.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {year.isCurrent ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Current</span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Past</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                                    <Link href={`/admin/academic-years/${year._id.toString()}`} className="text-indigo-600 hover:text-indigo-900">
                                        <Pencil className="h-5 w-5" />
                                    </Link>
                                    <DeleteButton id={year._id.toString()} deleteAction={deleteAcademicYear} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
