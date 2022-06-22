import axios from "axios";
import { request } from "http";
import { useDispatch } from "react-redux";
import { authState, updateToken } from '../redux/authState';
import { store } from "../redux/store";

const jwtAxios=axios.create();

jwtAxios.interceptors.request.use(request=>{
    request.headers={
        "authorization":store.getState().authState.userToken
    };
    return request;
});

jwtAxios.interceptors.response.use(response=>{
    store.dispatch(updateToken(response.headers.authorization));
    return response;
});




export default jwtAxios;