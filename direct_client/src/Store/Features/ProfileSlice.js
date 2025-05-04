import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload ? action.payload : null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
