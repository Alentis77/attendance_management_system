import mongoose, { Schema, Document, Model } from 'mongoose';

// Faculty
export interface IFaculty extends Document {
    name: string;
}

const FacultySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
});

export const Faculty: Model<IFaculty> = mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);

// Course
export interface ICourse extends Document {
    code: string;
    name: string;
    faculty: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId; // A course belongs to a specific semester/year instance usually? 
    // Requirement says: "Courses belong to a faculty + academic year + semester."
    // So yes, it's specific to an offering.
}

const CourseSchema: Schema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
    semester: { type: Schema.Types.ObjectId, ref: 'Semester', required: true },
});

// Compound index to ensure unique course code per semester if needed, but code might be unique globally.
// Let's assume code is unique per semester at least.
CourseSchema.index({ code: 1, semester: 1 }, { unique: true });

export const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
