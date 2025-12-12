import mongoose, { Schema, Document, Model } from 'mongoose';

// Attendance Session
export interface IAttendanceSession extends Document {
    course: mongoose.Types.ObjectId;
    lecturer: mongoose.Types.ObjectId;
    date: Date;
    startTime?: string;
    endTime?: string;
    createdAt: Date;
}

const AttendanceSessionSchema: Schema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lecturer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now },
    startTime: String,
    endTime: String,
}, { timestamps: true });

export const AttendanceSession: Model<IAttendanceSession> = mongoose.models.AttendanceSession || mongoose.model<IAttendanceSession>('AttendanceSession', AttendanceSessionSchema);

// Attendance Record
export interface IAttendanceRecord extends Document {
    session: mongoose.Types.ObjectId;
    student: mongoose.Types.ObjectId;
    status: 'present' | 'absent';
}

const AttendanceRecordSchema: Schema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: 'AttendanceSession', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
});

AttendanceRecordSchema.index({ session: 1, student: 1 }, { unique: true });

export const AttendanceRecord: Model<IAttendanceRecord> = mongoose.models.AttendanceRecord || mongoose.model<IAttendanceRecord>('AttendanceRecord', AttendanceRecordSchema);
