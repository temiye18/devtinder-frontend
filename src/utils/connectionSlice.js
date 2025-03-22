import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  initialState: null,
  name: "connections",
  reducers: {
    addConnections: (state, action) => {
      state = action.payload;
      return state;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
