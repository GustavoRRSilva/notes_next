import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "@/service/notesService";
import { useUser } from "@/contexts/userContext";
const initialState = {
  notes: [],
  note: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getUserNotes = createAsyncThunk("notes/getUserNotes", async () => {
  const localStorageToken = localStorage.getItem("user");
  const jsonData = JSON.parse(localStorageToken);
  const token = jsonData.token;
  const data = await noteService.getNotes(token);
  return data;
});

export const postNote = createAsyncThunk(
  "notes/postNote",
  async (note, thunkAPI) => {
    try {
      const data = await noteService.postNote(note);
      if (data.errors) {

        return thunkAPI.rejectWithValue(data.errors[0]);
      }
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
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

      .addCase(postNote.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Nota publicada com sucesso!";
        state.notes.push(action.payload); // Adiciona a nova nota ao estado
      })
      .addCase(postNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.notes = action.payload;
      })
      .addCase(getUserNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetMessage } = notesSlice.actions;
export default notesSlice.reducer;
