import AlertReducer from "./Features/AlertSlice.js";
import SocketReducer from "./Features/SocketSlice.js";
import ProfileSliceReducer from "./Features/ProfileSlice.js";
import QalamSliceReducer from "./Features/QalamSlice.js";
import loadingSlice from "./Features/loadingSlice.js";
import USRSlice from "./Features/usr.js";
import userAgencySlice from "./Features/userAgency.js";
import fundingAgencySlice from "./Features/fundingAgency.js";
import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "directapp",
  version: 1,
  storage,
};

const ProfileSlice = persistReducer(persistConfig, ProfileSliceReducer);
const PersistQalam = persistReducer(persistConfig, QalamSliceReducer);
const ignoreNonSerializableMiddleware = (storeAPI) => (next) => (action) => {
  const isSerializable = (value) => {
    // Add your own logic here to determine if `value` is serializable
    return typeof value !== "function";
  };

  if (!isSerializable(action.payload)) {
    console.warn("Ignoring non-serializable value", action.payload);
    return next({ ...action, payload: undefined });
  }

  return next(action);
};
export const store = configureStore({
  reducer: {
    alert: AlertReducer,
    socket: SocketReducer,
    profile: ProfileSlice,
    qalam: PersistQalam,
    loading: loadingSlice,
    usr: USRSlice,
    userAgency: userAgencySlice,
    fundingAgency: fundingAgencySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(ignoreNonSerializableMiddleware),
});
export let persistor = persistStore(store);
