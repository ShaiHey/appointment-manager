import mongoose from "mongoose";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<User>({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
}, {
    toObject: {
        transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
})

export const UserModel = mongoose.model<User>('User', UserSchema, 'users');