import mongoose, { Schema, Document, Model } from 'mongoose';

// Student
export interface IStudent extends Document {
    name: string;
    indexNumber: string;
    faculty: mongoose.Types.ObjectId;
}

const StudentSchema: Schema = new Schema({
    name: { type: String, required: true },
    indexNumber: { type: String, required: true, unique: true },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
});

export const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

// Enrollment
export interface IEnrollment extends Document {
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    academicYear: mongoose.Types.ObjectId; // Redundant if course is tied to semester->year, but good for quick queries
}

const EnrollmentSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    academicYear: { type: Schema.Types.ObjectId, ref: 'AcademicYear' }, // Optional, can populate from course
});

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment: Model<IEnrollment> = mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
