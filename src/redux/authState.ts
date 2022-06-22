import jwt_decode  from 'jwt-decode';


export class authState{
    userName:string="";
    userType:string="";
    userToken:string="";
    loggedIn:boolean=false;
}

export enum authActionType{
    UserLogin="UserLogin",
    userLogout="UserLogout",
    UpdateToken="UpdateToken",
}

export interface authAction{
    type: authActionType,
    payload?:any;
}

export  function userLogin(userToken:string):authAction{
    return {type:authActionType.UserLogin,payload:userToken};
}

export function userLogout():authAction{
    return{type:authActionType.userLogout};
}

export function updateToken(userToken:string):authAction{
    return {type:authActionType.UpdateToken,payload:userToken};

}


export function authReducer(currentState:authState=new authState,action:authAction):authState{
    const newState={...currentState};
    switch(action.type){
        case authActionType.UserLogin:
            var myToken=action.payload.replace("Bearer ","");
            var decoded=JSON.parse(JSON.stringify(jwt_decode(myToken)));
            newState.userName=decoded.sub;
            newState.userType=decoded.userType;
            newState.userToken=action.payload;
            newState.loggedIn=true;
        break;

        case authActionType.userLogout:
            newState.userName="";
            newState.userToken="";
            newState.userType="";
            newState.loggedIn=false;
        break;

        case authActionType.UpdateToken:
            newState.userToken=action.payload;
        break;
    }
    return newState;
}