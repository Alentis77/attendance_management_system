import { getAcademicYears, getSemesters, getFaculties } from '@/lib/data';
import AttendanceForm from './attendance-form';

export default async function TakeAttendancePage() {
    console.log('Rendering TakeAttendancePage');
    const years = await getAcademicYears();
    const semesters = await getSemesters();
    const faculties = await getFaculties();

    // Serialize
    const plainYears = JSON.parse(JSON.stringify(years));
    const plainSemesters = JSON.parse(JSON.stringify(semesters));
    const plainFaculties = JSON.parse(JSON.stringify(faculties));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Take Attendance</h1>
            <AttendanceForm years={plainYears} semesters={plainSemesters} faculties={plainFaculties} />
        </div>
    );
}
