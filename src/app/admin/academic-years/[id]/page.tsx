import { getAcademicYear } from '@/lib/data';
import { updateAcademicYear } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function EditAcademicYearPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log('Edit Page ID:', id);
    const year = await getAcademicYear(id);
    console.log('Edit Page Year Found:', year);

    if (!year) {
        console.log('Year not found, redirecting...');
        redirect('/admin/academic-years');
    }

    const updateYearWithId = updateAcademicYear.bind(null, id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Academic Year</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-md">
                <form action={updateYearWithId} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year (e.g. 2023-2024)</label>
                        <input
                            type="text"
                            name="year"
                            defaultValue={year.year}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 text-gray-900"
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="isCurrent"
                            id="isCurrent"
                            defaultChecked={year.isCurrent}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="isCurrent" className="ml-2 block text-sm text-gray-900">Set as Current</label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <a href="/admin/academic-years" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</a>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
