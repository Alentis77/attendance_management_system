'use server';

import connectDB from './db';
import { AcademicYear, Semester } from '@/models/Academic';
import { Faculty, Course } from '@/models/Course'; // Correct import path
import { Student, Enrollment } from '@/models/Student';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

// Academic Year
export async function createAcademicYear(formData: FormData) {
    const year = formData.get('year') as string;
    const isCurrent = formData.get('isCurrent') === 'on';

    await connectDB();

    if (isCurrent) {
        await AcademicYear.updateMany({}, { isCurrent: false });
    }

    await AcademicYear.create({ year, isCurrent });
    revalidatePath('/admin/academic-years');
}

export async function deleteAcademicYear(id: string) {
    await connectDB();
    await AcademicYear.findByIdAndDelete(id);
    revalidatePath('/admin/academic-years');
}

// Semester
export async function createSemester(formData: FormData) {
    const name = formData.get('name') as string;
    const academicYear = formData.get('academicYear') as string;

    await connectDB();
    await Semester.create({ name, academicYear });
    revalidatePath('/admin/semesters');
}

export async function deleteSemester(id: string) {
    await connectDB();
    await Semester.findByIdAndDelete(id);
    revalidatePath('/admin/semesters');
}

// Faculty
export async function createFaculty(formData: FormData) {
    const name = formData.get('name') as string;

    await connectDB();
    await Faculty.create({ name });
    revalidatePath('/admin/faculties');
}

export async function deleteFaculty(id: string) {
    await connectDB();
    await Faculty.findByIdAndDelete(id);
    revalidatePath('/admin/faculties');
}

// Course
export async function createCourse(formData: FormData) {
    const code = formData.get('code') as string;
    const name = formData.get('name') as string;
    const faculty = formData.get('faculty') as string;
    const semester = formData.get('semester') as string;

    await connectDB();
    await Course.create({ code, name, faculty, semester });
    revalidatePath('/admin/courses');
}

export async function deleteCourse(id: string) {
    await connectDB();
    await Course.findByIdAndDelete(id);
    revalidatePath('/admin/courses');
}

// Student
export async function createStudent(formData: FormData) {
    const name = formData.get('name') as string;
    const indexNumber = formData.get('indexNumber') as string;
    const faculty = formData.get('faculty') as string;

    await connectDB();
    await Student.create({ name, indexNumber, faculty });
    revalidatePath('/admin/students');
}

export async function deleteStudent(id: string) {
    await connectDB();
    await Student.findByIdAndDelete(id);
    revalidatePath('/admin/students');
}

// Lecturer
export async function createLecturer(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, role: 'lecturer' });
    revalidatePath('/admin/lecturers');
}

export async function deleteLecturer(id: string) {
    await connectDB();
    await User.findByIdAndDelete(id);
    revalidatePath('/admin/lecturers');
}

// Attendance Helpers
export async function getCoursesByFacultyAndSemester(facultyId: string, semesterId: string) {
    await connectDB();
    const courses = await Course.find({ faculty: facultyId, semester: semesterId });
    return JSON.parse(JSON.stringify(courses));
}

export async function getStudentsByFaculty(facultyId: string) {
    await connectDB();
    const students = await Student.find({ faculty: facultyId });
    return JSON.parse(JSON.stringify(students));
}

import { AttendanceSession, AttendanceRecord } from '@/models/Attendance';
import { auth } from '@/auth';

export async function submitAttendance(data: {
    courseId: string;
    date: Date;
    records: { studentId: string; status: 'present' | 'absent' }[];
}) {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'lecturer') {
        throw new Error('Unauthorized');
    }

    await connectDB();

    // Create Session
    const newSession = await AttendanceSession.create({
        course: data.courseId,
        lecturer: session.user.id,
        date: data.date,
        startTime: new Date().toLocaleTimeString(), // Placeholder
    });

    // Create Records
    const recordsToInsert = data.records.map(r => ({
        session: newSession._id,
        student: r.studentId,
        status: r.status,
    }));

    await AttendanceRecord.insertMany(recordsToInsert);

    revalidatePath('/lecturer/reports');
    return { success: true, sessionId: newSession._id.toString() };
}
