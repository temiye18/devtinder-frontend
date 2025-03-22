import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: () => null,
    removeUserFromFeed: (state, action) => {
      return state.filter((feed) => feed._id !== action.payload);
    },
  },
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
