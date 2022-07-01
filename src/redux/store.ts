import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./authState";
import { companyReducer } from "./companyState";
import { couponReducer } from "./couponState";
import { customerReducer } from "./customerState";
import { guestReducer } from "./guestState";


const reducers=combineReducers({authState:authReducer, companyState:companyReducer, customerState:customerReducer,couponState:couponReducer,guestState:guestReducer})
export const store= configureStore({reducer:reducers})