import nodemailer from 'nodemailer';
import { Appointment } from '../models/appointment';
import { UserModel } from '../models/user';
import { t } from '../lang/locales';
import c from 'config';

export async function sendEmailReminder(appointment: Appointment) {
    const user = await UserModel.findById(appointment.userId)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        ...c.get<object>('mail')
    });

    const appointmentDate = new Date(appointment.startDate);
    const lang = c.get<string>("app.lang");

    const date = appointmentDate.toLocaleDateString(lang);
    const time = appointmentDate.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });

    const priceText = appointment.price ? `${appointment.price}${c.get('app.symbol')}` : t('noPrice');

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5; color: #333; ${lang === 'he' ? "direction: rtl;" : ""}">
            <h2>${t('emailSubject')}</h2>
            <p>${t('hello')} ${user.firstName} ${user.lastName},</p>
            <p>${t('youHaveAppointment')}:</p>
            <ul style="padding-left: 20px;">
            <li><strong>${t('withClient')}:</strong> ${appointment.clientName}</li>
            <li><strong>${t('date')}:</strong> ${date}</li>
            <li><strong>${t('time')}:</strong> ${time}</li>
            <li><strong>${t('price')}:</strong> ${priceText}</li>
            </ul>
            <p>${t('thankYou')}</p>
            <p style="margin-top: 20px;"><em>${t('signature')}</em></p>
        </div>
    `;


    const mailOptions = {
        from: `"Appointment Manager" <${c.get<string>('mail.auth.user')}>`,
        to: user.email,
        subject: t('emailSubject'),
        html: htmlContent
    };

    return transporter.sendMail(mailOptions);
}