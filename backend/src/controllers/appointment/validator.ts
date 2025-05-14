import Joi from "joi";

export const createAppointmentValidator = Joi.object({
    clientName: Joi.string().required(),
    infos: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    paid: Joi.boolean().optional(),
    price: Joi.number().optional()
})

export const updateAppointmentParamsValidator = Joi.object({
    appointmentId: Joi.string().hex().length(24).required()
})

export const updateAppointmentValidator = Joi.object({
    pay: Joi.boolean().optional(),
    finished: Joi.boolean().optional()
})

export const deleteAppointmentParamsValidator = updateAppointmentParamsValidator;