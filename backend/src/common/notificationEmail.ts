import cron from 'node-cron';
import { AppointmentModel } from '../models/appointment';
import { sendEmailReminder } from './sendEmail';
import { t } from '../lang/locales';

async function checkUpcomingMeetingsAndSendEmails() {
    const now = new Date();
    const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
    const oneHourLater = new Date(now.getTime() + 65 * 60 * 1000);

    const appointments = await AppointmentModel.find({
        startDate: { $gt: fiveMinutesLater, $lte: oneHourLater },
        reminderSent: false,
        finished: false
    });

    for (const appointment of appointments) {
        try {
            await sendEmailReminder(appointment);

            appointment.reminderSent = true;
            await appointment.save();

            console.log(t('reminderSent', { name: appointment.userId }));
        } catch (err) {
            console.error(t('emailSendError', { name: appointment.userId }), err);
        }
    }
}

console.log("Cron scheduler loaded");

cron.schedule('*/5 * * * *', () => {
    checkUpcomingMeetingsAndSendEmails();
});