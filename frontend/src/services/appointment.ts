import Appointment from "../models/appointment/Appointment";
import AppointmentDraft from "../models/appointment/AppointmentDraft";
import AuthAware from "./auth-aware/AuthAware";

class AppointmentService extends AuthAware {
    async getAll(): Promise<Appointment[]> {
        const response = await this.axiosInstance.get<Appointment[]>(`${import.meta.env.VITE_REST_SERVER_URL}/appointment`);
        return response.data;
    }

    async create(draft: AppointmentDraft): Promise<Appointment> {
        if(!draft.price) delete draft.price;
        const response = await this.axiosInstance.post<Appointment>(`${import.meta.env.VITE_REST_SERVER_URL}/appointment`, draft);
        return response.data;
    }

    async update(id: string, draft: { finished?: boolean, pay?: boolean }): Promise<Appointment> {
        const { finished , pay } = draft
        const response = await this.axiosInstance.patch<Appointment>(`${import.meta.env.VITE_REST_SERVER_URL}/appointment/${id}`, { finished, pay });
        return response.data;
    }

    async delete(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/appointment/${id}`);
        return response.data;
    }
}


export default AppointmentService;