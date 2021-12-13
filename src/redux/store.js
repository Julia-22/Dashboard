import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from './reducer';
import authorizationReducer from './authorization/reducer';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    authorization: authorizationReducer,
  }
});

export default store;