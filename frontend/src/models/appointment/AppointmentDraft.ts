export default interface AppointmentDraft {
    clientName: string;
    infos: string;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    price?: number;
}