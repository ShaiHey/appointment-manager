import nodemailer from 'nodemailer';
import { Appointment } from '../models/appointment';
import { UserModel } from '../models/user';
import { t } from '../lang/locales';
import c from 'config';
import { generateEmailHTML } from './generateHTML';

export async function sendEmailReminder(appointment: Appointment) {
    const user = await UserModel.findById(appointment.userId)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        ...c.get<object>('mail')
    });
    
    const lang = c.get<string>("app.lang");

    const htmlContent = await generateEmailHTML(appointment, user.toObject(), lang)

    const mailOptions = {
        from: `"Appointment Manager" <${c.get<string>('mail.auth.user')}>`,
        to: user.email,
        subject: t('emailSubject'),
        html: htmlContent
    };

    return transporter.sendMail(mailOptions);
}