import { configureStore } from "@reduxjs/toolkit";
import { appointmentSlice } from "./appointmentSlice";

const store = configureStore({
    reducer: {
        appointment: appointmentSlice.reducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;