import { BreakfastDiningRounded } from "@mui/icons-material";
import { act } from "react-dom/test-utils";
import Customer from "../Moduls/Customer";
import { companyAction } from './companyState';
import jwtAxios from '../util/JWTAxios';
import globals from "../util/globals";
import notify from '../util/notify';
import Coupon from '../Moduls/Coupon';

export class customerState{
    customers?:Customer[]=[];
}

export enum customerActionType{
    GetAllCustomers="GetAllCustomers",
    AddCustomer="AddCustomer",
    UpdateCustomer="UpdateCustomer",
    DeleteCustomer="DeleteCustomer",
    PurchaseCoupon="PurchaseCoupon",

    LogoutCustomer="CustomerLogout",
}

export interface customerAction{
    type:customerActionType,
    payload?:any;
}

export function getAllCustomers(customers:Customer[]):customerAction{
    return{type:customerActionType.GetAllCustomers,payload:customers}
}

export function addCustomer(customer:Customer):customerAction{
    return{type:customerActionType.AddCustomer,payload:customer}
}

export function updateCustomer(customer:Customer):customerAction{
    return{type:customerActionType.UpdateCustomer,payload:customer}
}

export function deleteCustomer(customerId:number):customerAction{
    return{type:customerActionType.DeleteCustomer,payload:customerId}
}

export function purchaseCoupon(coupon:Coupon):customerAction{
    return{type:customerActionType.PurchaseCoupon,payload:coupon}
}

export function logoutCustomer():customerAction{
    return{type:customerActionType.LogoutCustomer}
}

export function customerReducer(currentState:customerState=new customerState, action:customerAction):customerState{
    var newState={...currentState}

    switch(action.type){
        case customerActionType.GetAllCustomers:
            newState.customers=action.payload;
            
        break;

        case customerActionType.AddCustomer:
            newState.customers.push(action.payload);
        break;

        case customerActionType.UpdateCustomer:
            var updatedCustomers=[...newState.customers].filter(item=>item.id==action.payload.id)
            updatedCustomers.push(action.payload);
            newState.customers=updatedCustomers;
        break;

        case customerActionType.DeleteCustomer:
            var updatedCustomers=[...newState.customers].filter(item=>item.id==action.payload.id)
        break;

        case customerActionType.PurchaseCoupon:
            if(newState.customers.length==1){
                newState.customers[0].coupons.push(action.payload);
            }
        break;

        case customerActionType.LogoutCustomer:
            newState.customers=[];
        break;

    }

    return newState;
}