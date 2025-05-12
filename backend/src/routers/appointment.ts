import { Router } from "express";
import { create, getAll, update } from "../controllers/appointment/controller";
import { createAppointmentValidator, updateAppointmentParamsValidator, updateAppointmentValidator } from "../controllers/appointment/validator";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/params-validation";

const appointmentRouter = Router()

appointmentRouter.get('/', getAll)
appointmentRouter.post('/', validation(createAppointmentValidator), create)
appointmentRouter.patch('/:appointmentId', paramsValidation(updateAppointmentParamsValidator), validation(updateAppointmentValidator), update)

export default appointmentRouter;