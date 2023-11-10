import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./slices/campaignSlice";

const store = configureStore({
  reducer: {
    campaign: campaignReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
