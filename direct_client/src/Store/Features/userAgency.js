import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastFiles: [],
  projects: [],
  project: {},
};

export const userAgencySlice = createSlice({
  name: "userAgency",
  initialState,
  reducers: {
    setPastFiles: (state, action) => {
      state.pastFiles = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPastFiles, setProjects, setProject, updateProjects } =
  userAgencySlice.actions;

export default userAgencySlice.reducer;
