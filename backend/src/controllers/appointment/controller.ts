import { NextFunction, Request, Response } from "express";
import { AppointmentModel } from "../../models/appointment";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        
        const { userId } = req;

        const allAppointments = await AppointmentModel.find({
            userId
        })

        res.json(allAppointments.map(doc => doc.toObject()))
    } catch (error) {
        next(error)
    }
}

export async function create(req: Request<{}, {}, {
    clientName: string;
    infos: string;
    startDate: Date,
    endDate: Date,
    paid: boolean;
    price: number;
}>, res: Response, next: NextFunction) {
    try {
        const newAppointment = new AppointmentModel({...req.body, userId: req.userId})
        await newAppointment.save()

        res.json(newAppointment.toObject())
    } catch (error) {
        next(error)
    }
}

export async function update(req: Request<{appointmentId: string}, {}, {
    finished?: boolean
    pay?: boolean,
}>, res: Response, next: NextFunction) {
    try {

        const { finished, pay } = req.body

        const appointment = await AppointmentModel.findById(req.params.appointmentId)

        if (typeof finished !== 'undefined') {
            appointment.finished = finished;
        }
        if (typeof pay !== 'undefined') {
            appointment.pay = pay;
        }
        
        await appointment.save();

        res.json(appointment.toObject())
    } catch (error) {
        next(error)
    }
}