import mongoose from "mongoose";

export interface Appointment {
    id: string;
    userId: string,
    clientName: string;
    infos: string;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    price: number;
    finished: boolean;
    pay: boolean;
    reminderSent: boolean;
}

const AppointmentSchema = new mongoose.Schema<Appointment>({
    userId: String,
    clientName: String,
    infos: String,
    startDate: Date,
    endDate: Date,
    paid: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    finished: {
        type: Boolean,
        default: false
    },
    pay: {
        type: Boolean,
        default: false
    },
    reminderSent: {
        type: Boolean,
        default: false
    }
}, {
    toObject: {
        transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
})

export const AppointmentModel = mongoose.model<Appointment>('Appointment', AppointmentSchema, 'appointments');