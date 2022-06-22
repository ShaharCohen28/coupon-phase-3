import Coupon from "../Moduls/Coupon";

export class couponState{
    coupons?:Coupon[]=[];
}

export enum couponActionType{
    GetAllCoupons="GetAllCoupons",
    AddCoupon="AddCoupon",
    UpdateCoupon="UpdateCoupon",
    DeleteCoupon="DeleteCoupon",
}

export interface couponAction{
    type:couponActionType,
    payload?:any;
}

export function getAllCoupons(coupons:Coupon[]):couponAction{
    return{type:couponActionType.GetAllCoupons,payload:coupons}
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


export function couponReducer(currentState:couponState=new couponState,action:couponAction):couponState{
    var newState={...currentState}

    switch(action.type){
        case couponActionType.AddCoupon:
            newState.coupons.push(action.payload);
        break;

        case couponActionType.DeleteCoupon:

        break;

        case couponActionType.GetAllCoupons:
            newState.coupons=action.payload;
        break;

        case couponActionType.UpdateCoupon:

        break;
    }

    return newState;
}