import { responsiveFontSizes, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./myMain.css";
import { authState } from '../../../redux/authState';
import { store } from "../../../redux/store";
import jwtAxios from '../../../util/JWTAxios';
import globals from '../../../util/globals';
import notify from "../../../util/notify";
import { getAllCoupons } from "../../../redux/couponState";
import SingleCoupon from "../../../myProps/singleCoupon/singleCoupon";

function MyMain(): JSX.Element {
    const dispatch=useDispatch();
    const [coupons,setCoupons]=useState([]);
    useEffect(()=>{
        if(store.getState().authState.userType===""){
            jwtAxios.get(globals.urls.guest)
            .then(response=>{
                if(response.status==200){
                    dispatch(getAllCoupons(response.data));
                    setCoupons(response.data);
                }
            })
            .then(()=>{
                console.log(store.getState().couponState.coupons);
            })
            .catch(error=>{
                notify.error("error loading coupons");
            }); 
        }else{
            setCoupons(store.getState().couponState.coupons);
            console.log(store.getState().couponState.coupons);
        }
    },[]);

    return (
        <div className="myMain">
            <Typography variant="h3">Main</Typography>
            {coupons?.map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>)}
        </div>
    );
}

export default MyMain;
