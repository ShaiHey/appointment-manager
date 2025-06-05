import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const signUpValidator = loginValidator.append({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
})