import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./authState";
import { companyReducer } from "./companyState";
import { couponReducer } from "./couponState";
import { customerReducer } from "./customerState";


const reducers=combineReducers({authState:authReducer, companyState:companyReducer, customerState:customerReducer,couponState:couponReducer})
export const store= configureStore({reducer:reducers})