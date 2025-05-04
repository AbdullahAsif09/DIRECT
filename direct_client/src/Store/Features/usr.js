import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastFiles: [],
  projects: [],
  project: {},
};

export const USRSLlice = createSlice({
  name: "profile",
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
    updateProjectsArray: (state, action) => {
      state.projects = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPastFiles,
  setProjects,
  setProject,
  updateProjects,
  updateProjectsArray,
} = USRSLlice.actions;

export default USRSLlice.reducer;
