import { Router } from "express";
import { create, deleteAppointment, getAll, update } from "../controllers/appointment/controller";
import { createAppointmentValidator, deleteAppointmentParamsValidator, updateAppointmentParamsValidator, updateAppointmentValidator } from "../controllers/appointment/validator";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/params-validation";

const appointmentRouter = Router()

appointmentRouter.get('/', getAll)
appointmentRouter.post('/', validation(createAppointmentValidator), create)
appointmentRouter.patch('/:appointmentId', paramsValidation(updateAppointmentParamsValidator), validation(updateAppointmentValidator), update)
appointmentRouter.delete('/:appointmentId', paramsValidation(deleteAppointmentParamsValidator), deleteAppointment)

export default appointmentRouter;