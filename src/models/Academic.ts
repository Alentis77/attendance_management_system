import mongoose, { Schema, Document, Model } from 'mongoose';

// Academic Year
export interface IAcademicYear extends Document {
    year: string; // e.g., "2023-2024"
    isCurrent: boolean;
}

const AcademicYearSchema: Schema = new Schema({
    year: { type: String, required: true, unique: true },
    isCurrent: { type: Boolean, default: false },
});

export const AcademicYear: Model<IAcademicYear> = mongoose.models.AcademicYear || mongoose.model<IAcademicYear>('AcademicYear', AcademicYearSchema);

// Semester
export interface ISemester extends Document {
    name: string; // "Semester 1", "Semester 2"
    academicYear: mongoose.Types.ObjectId;
}

const SemesterSchema: Schema = new Schema({
    name: { type: String, required: true },
    academicYear: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
});

export const Semester: Model<ISemester> = mongoose.models.Semester || mongoose.model<ISemester>('Semester', SemesterSchema);
