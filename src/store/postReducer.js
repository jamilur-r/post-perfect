import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, actions) => {
      state.push(actions.payload.post);
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
