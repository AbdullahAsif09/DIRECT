import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  flag: 0,
};

export const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = state.flag + 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSocket, setFlag } = SocketSlice.actions;

export default SocketSlice.reducer;
