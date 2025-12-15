'use server';

import { z } from 'zod';
import { Student } from '@/models/Student';
import connectDB from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const RegisterStudentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    indexNumber: z.string().min(1, 'Index Number is required'),
    faculty: z.string().min(1, 'Faculty is required'),
});

export async function registerStudent(prevState: any, formData: FormData) {
    try {
        const validatedFields = RegisterStudentSchema.safeParse({
            name: formData.get('name'),
            indexNumber: formData.get('indexNumber'),
            faculty: formData.get('faculty'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Register Student.',
            };
        }

        const { name, indexNumber, faculty } = validatedFields.data;

        await connectDB();

        // Check if index number already exists
        const existingStudent = await Student.findOne({ indexNumber });
        if (existingStudent) {
            return {
                message: 'Student with this Index Number already exists.',
            };
        }

        await Student.create({
            name,
            indexNumber,
            faculty,
        });

        revalidatePath('/admin/students');
        revalidatePath('/admin/dashboard');

        return { success: true, message: 'Student registered successfully!' };
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Register Student.',
        };
    }
}
