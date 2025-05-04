import { createSlice } from "@reduxjs/toolkit";
import { keys } from "@config";

const initialState = {
  pastFiles: [],
  projects: [],
  project: {},
};

export const fundingAgencySlice = createSlice({
  name: "fundingAgency",
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
  fundingAgencySlice.actions;

export default fundingAgencySlice.reducer;
