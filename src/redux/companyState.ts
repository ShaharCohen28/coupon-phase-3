import Company from "../Moduls/Company";
import jwtAxios from '../util/JWTAxios';
import globals from '../util/globals';
import notify from '../util/notify';
import { updateToken } from "./authState";
import { useDispatch } from 'react-redux';
import Coupon from "../Moduls/Coupon";

export class companyState{
    companies:Company[]=[];
}

export enum companyActionType{
    GetAllCompanies="GetAllCompanies",
    AddCompany="AddCompany",
    UpdateCompany="UpdateCompany",
    DeleteCompany="DeleteCompany",
    LogoutCompany="LogoutCOmpany",
}

export interface companyAction{
    type: companyActionType,
    payload?:any;
}

export function getAllCompanies(companies:Company[]):companyAction{
    return{type:companyActionType.GetAllCompanies,payload:companies}
}

export function addCompany(company:Company):companyAction{
    return{type:companyActionType.AddCompany,payload:company}
}

export function updateCompany(company:Company):companyAction{
    return{type:companyActionType.UpdateCompany,payload:company}
}

export function deleteCompany(companyId:number):companyAction{
    return {type:companyActionType.DeleteCompany,payload:companyId}
}

export function logoutCompany():companyAction{
    return{type:companyActionType.LogoutCompany}
}



export function companyReducer(currentState:companyState=new companyState, action:companyAction):companyState{
    var newState={...currentState};
    switch(action.type){
        case companyActionType.GetAllCompanies:
            newState.companies=action.payload;
        break;

        case companyActionType.AddCompany:
            newState.companies.push(action.payload);
        break;
        
        case companyActionType.UpdateCompany:
            var updatedCompanies=[...newState.companies].filter(item=>item.id!=action.payload.id);
            updatedCompanies.push(action.payload);
            newState.companies=updatedCompanies;

        break;

        case companyActionType.DeleteCompany:
            newState.companies=[...newState.companies].filter(item=>item.id!=action.payload);

        break;
        case companyActionType.LogoutCompany:
            newState.companies=[];
        break;

        
    }
    return newState;
}