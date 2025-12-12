import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    await connectDB();

    const adminEmail = 'admin@university.edu';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
        return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
    });

    return NextResponse.json({ message: 'Admin created successfully' });
}
