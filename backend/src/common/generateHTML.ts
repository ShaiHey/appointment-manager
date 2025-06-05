import fs from 'fs/promises';
import path from 'path';
import { t } from '../lang/locales';
import c from 'config';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';

export async function generateEmailHTML(appointment: Appointment, user: User, lang: string) {
    try {
        const templatePath = path.join(__dirname, '../templates/email-appointment.html');
        const template = await fs.readFile(templatePath, 'utf8');

        const appointmentDate = new Date(appointment.startDate);
        const date = appointmentDate.toLocaleDateString(lang);
        const time = appointmentDate.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
        const priceText = appointment.price ? `${appointment.price}${c.get('app.symbol')}` : t('noPrice');

        const templateData = {
            lang: lang,
            isRTL: lang === 'he',
            emailSubject: t('emailSubject'),
            hello: t('hello'),
            firstName: user.firstName,
            lastName: user.lastName,
            youHaveAppointment: t('youHaveAppointment'),
            withClient: t('withClient'),
            clientName: appointment.clientName,
            date_label: t('date'),
            date: date,
            time_label: t('time'),
            time: time,
            price_label: t('price'),
            price: priceText,
            infos_label: t('infos'),
            infos: appointment.infos || '',
            thankYou: t('thankYou'),
            signature: t('signature')
        };
        
        let htmlContent = template;
        Object.keys(templateData).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            htmlContent = htmlContent.replace(regex, templateData[key] || '');
        });
        
        htmlContent = htmlContent.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, condition, content) => {
            return templateData[condition] ? content : '';
        });
        
        htmlContent = htmlContent.replace(/{{#unless\s+(\w+)}}(.*?){{\/unless}}/gs, (match, condition, content) => {
            return !templateData[condition] ? content : '';
        });
        
        return htmlContent;
    } catch (error) {
        console.error(t('emailSendError', { name: appointment.userId }), error);
        throw error;
    }
}