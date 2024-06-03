import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "@/service/notesService";

const initialState = {
  notes: [],
  note: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getUserNotes = createAsyncThunk("notes/", async () => {
  //Pegando user Token
  const localStorageToken = localStorage.getItem("user");
  const jsonData = JSON.parse(localStorageToken);
  const token = jsonData.token;

  //Chamando o serviço enviando o token
  const data = await noteService.getNotes(token);
  return data;
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.notes = action.payload;
      });
  },
});

export default notesSlice.reducer;
