import Coupon from "../Moduls/Coupon";
import Company from '../Moduls/Company';

export class couponState{
    coupons?:Coupon[]=[];
}

export enum couponActionType{
    GetAllCoupons="GetAllCoupons",
    AddCoupon="AddCoupon",
    UpdateCoupon="UpdateCoupon",
    DeleteCoupon="DeleteCoupon",
    LogoutCOupon="LogoutCOupon",
}

export interface couponAction{
    type:couponActionType,
    payload?:any;
}

export function getAllCoupons(coupon:Coupon[]):couponAction{
    return{type:couponActionType.GetAllCoupons,payload:coupon}
}

export function addCoupon(coupon:Coupon):couponAction{
    return{type:couponActionType.AddCoupon,payload:coupon}
}

export function updateCoupon(coupon:Coupon):couponAction{
    return{type:couponActionType.UpdateCoupon,payload:coupon}
}

export function deleteCoupon(couponId:number):couponAction{
    return{type:couponActionType.DeleteCoupon,payload:couponId}
}

export function logoutCoupon():couponAction{
    return{type:couponActionType.LogoutCOupon}
}


export function couponReducer(currentState:couponState=new couponState,action:couponAction):couponState{
    var newState={...currentState}

    switch(action.type){
        case couponActionType.AddCoupon:
            newState.coupons.push(action.payload);
        break;

        case couponActionType.DeleteCoupon:
            newState.coupons=[...newState.coupons].filter(item=>item.id!=action.payload);
        break;

        case couponActionType.GetAllCoupons:
            newState.coupons=action.payload;
        break;

        case couponActionType.UpdateCoupon:
            var updatedCoupons=[...newState.coupons].filter(item=>item.id!=action.payload.id);
            updatedCoupons.push(action.payload);
            newState.coupons=updatedCoupons;
        break;

        case couponActionType.LogoutCOupon:
            newState.coupons=[];
        break;
    }

    return newState;
}