import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  initialState: null,
  name: "requests",
  reducers: {
    addRequests: (state, action) => {
      state = action.payload;
      return state;
    },
    removeRequests: () => {
      return null;
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
