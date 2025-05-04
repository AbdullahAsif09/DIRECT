import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  text: "",
};

/**
 * @typedef {Object} AlertPayload
 * @property {"error" | "success"} status
 * @property {string} text
 */

export const AppLoader = createSlice({
  name: "apploader",
  initialState,
  reducers: {
    /**
     * @param {Object} state
     * @param {import('@reduxjs/toolkit').PayloadAction<AlertPayload>} action
     */
    setAlert: (state, action) => {
      state.status = action.payload.status;
      state.text = action.payload.text;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert } = AppLoader.actions;

export default AppLoader.reducer;
