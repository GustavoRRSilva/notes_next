import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";
import notesSlice, { notesReducer } from "./slice/notesSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    notes: notesSlice,
  },
});
