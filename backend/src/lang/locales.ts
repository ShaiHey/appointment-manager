import c from "config";

export const translations = {
    en: {
        reminderSent: "Reminder sent to {{name}}",
        emailSendError: "Error sending email to {{name}}",
        emailSubject: "Appointment Reminder",
        hello: "Hello",
        youHaveAppointment: "You have an upcoming appointment",
        withClient: "Client",
        date: "Date",
        time: "Time",
        price: "Price",
        noPrice: "Not specified",
        thankYou: "Thank you for using our service.",
        signature: "Appointment Manager Team"
    },
    fr: {
        reminderSent: "Rappel envoyé à {{name}}",
        emailSendError: "Erreur envoi mail à {{name}}",
        emailSubject: "Rappel de rendez-vous",
        hello: "Bonjour",
        youHaveAppointment: "Vous avez un rendez-vous à venir",
        withClient: "Client",
        date: "Date",
        time: "Heure",
        price: "Prix",
        noPrice: "Non spécifié",
        thankYou: "Merci d'utiliser notre service.",
        signature: "L'équipe Appointment Manager"
    },
    he: {
        reminderSent: "Reminder sent to {{name}}",
        emailSendError: "Error sending email to {{name}}",
        emailSubject: "תזכורת לפגישה",
        hello: "שלום",
        youHaveAppointment: "יש לך פגישה קרובה",
        withClient: "לקוח",
        date: "תאריך",
        time: "שעה",
        price: "מחיר",
        noPrice: "לא צויין",
        thankYou: "תודה על השימוש בשירות שלנו.",
        signature: "צוות Appointment Manager"
    }
};

export function t(key: string, variables?: Record<string, string>) {
    const lang: string = c.get('app.lang');
    const text = translations[lang]?.[key] || translations['en'][key] || key;

    if (!variables) return text;

    return Object.entries(variables).reduce((acc, [k, v]) => {
        return acc.replace(`{{${k}}}`, v);
    }, text);
}