import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Appointment from "../models/appointment/Appointment";

interface AppointmentState {
    appointments: Appointment[],
    nextAppointment?: Appointment
}

const initialState: AppointmentState = {
    appointments: [],
    nextAppointment: undefined
}

const getNextAppointment = (appointments: Appointment[]): Appointment => {
  const now = new Date()

  const futureAppointments = appointments
    .filter(app => new Date(app.startDate) > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return futureAppointments[0] || {}
}

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Appointment[]>) => {
            state.appointments = action.payload
            state.nextAppointment = getNextAppointment(action.payload)
        },
        add: (state, action: PayloadAction<Appointment>) => {
            state.appointments = [ action.payload, ...state.appointments ]
        },
        update: (state, action: PayloadAction<Appointment>) => {
            const index = state.appointments.findIndex(p => p.id === action.payload.id);
            if(index > -1) {
                state.appointments[index] = action.payload
            }
        }
    }
})

export const { init, add, update } = appointmentSlice.actions;

export default appointmentSlice.reducer;