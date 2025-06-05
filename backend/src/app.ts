import cors from "cors";
import express, { json } from "express";
import { connectToMongo } from "./db/mongoose";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import logRequest from "./middlewares/log-request";
import notFound from "./middlewares/not-found";
import bearerToken from "express-bearer-token";
import authJwt from "./middlewares/auth/getUser";
import verifyUser from "./middlewares/auth/verifyUser";
import authRouter from "./routers/auth";
import appointmentRouter from "./routers/appointment";

export const server = express();

export async function start() {
    await connectToMongo();

    // Middlewares
    server.use(cors());
    server.use(json());

    server.use(logRequest);
    server.use('/auth', authRouter)

    server.use(bearerToken());
    server.use(authJwt, verifyUser);

    // Router after auth
    server.use('/appointment', appointmentRouter);

    // Special notFound middleware
    server.use(notFound);

    // Error middleware
    server.use(errorLogger);
    server.use(errorResponder);
}