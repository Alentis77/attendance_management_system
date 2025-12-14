import connectDB from './db';
import User from '@/models/User';
import { Student } from '@/models/Student';
import { Course, Faculty } from '@/models/Course';
import { AttendanceSession } from '@/models/Attendance';
import { AcademicYear, Semester } from '@/models/Academic';
// Faculty is already imported from Course
// I put Faculty in src/models/Course.ts? No, I put it in src/models/Course.ts in the file creation step?
// Let's check the file creation step for Faculty.
// Step 54: Created file src/models/Course.ts with Faculty and Course.
// Yes, Faculty is exported from there.

export async function getAdminStats() {
    await connectDB();
    const [lecturers, students, courses, sessions] = await Promise.all([
        User.countDocuments({ role: 'lecturer' }),
        Student.countDocuments(),
        Course.countDocuments(),
        AttendanceSession.countDocuments(),
    ]);
    return { lecturers, students, courses, sessions };
}

export async function getAcademicYears() {
    await connectDB();
    return AcademicYear.find().sort({ year: -1 });
}

export async function getSemesters() {
    await connectDB();
    return Semester.find().populate('academicYear');
}

export async function getFaculties() {
    await connectDB();
    return Faculty.find();
}

export async function getCourses() {
    await connectDB();
    return Course.find().populate('faculty').populate('semester');
}

export async function getStudents() {
    await connectDB();
    return Student.find().populate('faculty');
}

export async function getLecturers() {
    await connectDB();
    return User.find({ role: 'lecturer' });
}

export async function getLecturerReports(lecturerId: string) {
    await connectDB();
    const sessions = await AttendanceSession.find({ lecturer: lecturerId })
        .populate('course')
        .sort({ date: -1 });
    return sessions;
}

export async function getAcademicYear(id: string) {
    await connectDB();
    return AcademicYear.findById(id);
}

export async function getSemester(id: string) {
    await connectDB();
    return Semester.findById(id);
}

export async function getFaculty(id: string) {
    await connectDB();
    return Faculty.findById(id);
}

export async function getCourse(id: string) {
    await connectDB();
    return Course.findById(id);
}

export async function getStudent(id: string) {
    await connectDB();
    return Student.findById(id);
}

export async function getLecturer(id: string) {
    await connectDB();
    return User.findById(id);
}

import { AttendanceRecord } from '@/models/Attendance';

export async function getAttendanceSessionDetails(sessionId: string) {
    await connectDB();
    const session = await AttendanceSession.findById(sessionId).populate('course');
    const records = await AttendanceRecord.find({ session: sessionId }).populate('student');
    return { session, records };
}

export async function getAllAttendanceSessions() {
    await connectDB();
    const sessions = await AttendanceSession.find()
        .populate('course')
        .populate('lecturer')
        .sort({ date: -1 });
    return sessions;
}
