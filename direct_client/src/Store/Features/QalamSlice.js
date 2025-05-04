import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  projects: null,
};

export const QalamSlice = createSlice({
  name: "qalam",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profiles = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    resetProfile: (state) => {
      state.profiles = null;
    },
    resetProjects: (state) => {
      state.projects = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile, setProjects, resetProfile, resetProjects } =
  QalamSlice.actions;

export default QalamSlice.reducer;
