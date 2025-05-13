import AppointmentDraft from "./AppointmentDraft";

export default interface Appointment extends AppointmentDraft {
    id: string;
    userId: string;
    finished: boolean;
    pay: boolean;
}