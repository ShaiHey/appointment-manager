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
    .filter(app => new Date(app.startDate) > now && !app.finished)
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
            state.nextAppointment = getNextAppointment(state.appointments)
        },
        update: (state, action: PayloadAction<Appointment>) => {
            const index = state.appointments.findIndex(p => p.id === action.payload.id);
            if(index > -1) {
                state.appointments[index] = action.payload
            }
            state.nextAppointment = getNextAppointment(state.appointments)
        },
        deleteApp: (state, action: PayloadAction<{id: string}>) => {
            state.appointments = state.appointments.filter(a => a.id !== action.payload.id)
            state.nextAppointment = getNextAppointment(state.appointments)
        },
    }
})

export const { init, add, update, deleteApp } = appointmentSlice.actions;

export default appointmentSlice.reducer;