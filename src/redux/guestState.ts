import Coupon from "../Moduls/Coupon";

export class guestState{
    allCoupons?:Coupon[]=[];
}

export enum guestActionType{
    GetAllGuestCoupons="GetAllGuestCoupons",
    UpdateAmount="UpdateAmount",
}

export interface guestAction{
    type:guestActionType,
    payload?:any;
}

export function getAllGuestCoupons(coupons:Coupon[]):guestAction{
    return{type:guestActionType.GetAllGuestCoupons,payload:coupons}
}

export function updateAmount(coupon:Coupon):guestAction{
    return{type:guestActionType.UpdateAmount,payload:coupon}
}


export function guestReducer(currentState:guestState=new guestState,action:guestAction):guestState{
    var newState={...currentState}

    switch(action.type){
        case guestActionType.GetAllGuestCoupons:
            newState.allCoupons=action.payload;
        break;

        case guestActionType.UpdateAmount:
            var updatedAllCoupons=[...newState.allCoupons].filter(item=>item.id!=action.payload.id);
            updatedAllCoupons.push(action.payload);
            newState.allCoupons=updatedAllCoupons;
    }

    return newState;
}