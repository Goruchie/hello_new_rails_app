
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const GETTED_MSN = 'GETTED_MSN';

const initialState = {
  message: ""
};

export const getmsn = createAsyncThunk(
  GETTED_MSN, async () => {
    const response = await fetch("http://127.0.0.1:5000/api/hello");
    const data = await response.json();
    console.log(data)
    return data;
  },
);

export const greetingSlice = createSlice({
  name: "greeting",
  initialState,
  reducers: { 
    getMessage: (state) => {
      state.message = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getmsn.fulfilled, (_, action) => action.payload);
    builder.addCase(getmsn.rejected, (state) => {
      const newState = state;
      newState.status = 'failed';
    });
    builder.addCase(getmsn.pending, (_, action) => action.payload);
  },
});

export const { getMessage } = greetingSlice.actions;
export default greetingSlice.reducer;