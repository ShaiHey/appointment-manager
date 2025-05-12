import c from "config"
import { createHmac } from "crypto"
import { Request, Response, NextFunction } from "express"
import { UserModel } from "../../models/user"
import status from "http-status"
import AppError from "../../errors/app-error"
import { sign } from "jsonwebtoken"

export function hashPassword(password: string): string {
    return createHmac('sha256', c.get<string>('app.secret'))
        .update(password)
        .digest('hex')
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({
            email,
            password: hashPassword(password)
        })

        if(!user) return next(new AppError(
            status.INTERNAL_SERVER_ERROR,
           'Wrong credentials'
        ))

        const jwt = sign(user.toObject(), c.get<string>('app.jwtSecret'))

        res.json({ jwt })
    } catch (error) {
        next(error)
    }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body
    try {
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword(password),
        })

        await user.save()

        const jwt = sign(user.toObject(), c.get<string>('app.jwtSecret'))
        res.json({ jwt })
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.email) {
            return next(new AppError(
                status.CONFLICT,
                `Email: ${email} already exists. Please choose another email.`
            ));
        }
        next(error)
    }
}