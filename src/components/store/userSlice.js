import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { records: [] },
  reducers: {
    addUser: (state, action) => {
      state.records.push(action.payload);
    },
    editUser: (state, action) => {
      state.records = action.payload;
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.records = state.records.filter((record) => record.id !== id);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
