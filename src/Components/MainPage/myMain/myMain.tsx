import { responsiveFontSizes, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./myMain.css";
import { authState } from '../../../redux/authState';
import { store } from "../../../redux/store";
import jwtAxios from '../../../util/JWTAxios';
import globals from '../../../util/globals';
import notify from "../../../util/notify";
import SingleCoupon from "../../../myProps/singleCoupon/singleCoupon";
import { getAllGuestCoupons } from "../../../redux/guestState";
import { NestCamWiredStand } from "@mui/icons-material";
import Company from "../../../Moduls/Company";

function MyMain(): JSX.Element {
    const dispatch=useDispatch();
    const [coupons,setCoupons]=useState([]);
    const [isCompany,setIsCompany]=useState(false);
    const [company,setCompany]=useState(new Company());
    useEffect(()=>{
        setIsCompany(store.getState().authState.userType==='COMPANY');
        if(store.getState().authState.userType===""){
            jwtAxios.get(globals.urls.guest)
            .then(response=>{
                if(response.status==200){
                    store.dispatch(getAllGuestCoupons(response.data));
                    setCoupons(response.data);
                }
            })
            .catch(error=>{
                notify.error("error loading coupons");
            }); 
        }else{
            setCoupons(store.getState().guestState.allCoupons);
            // console.log(store.getState().guestState.coupons);
        }
        if(isCompany){
            setCompany(store.getState().companyState.companies[0]);
        }
    },[]);

    return (
        <div className="myMain">
            <Typography variant="h3">Main</Typography>
            {isCompany?<Typography variant="h3">hello {company.name}</Typography>:
            coupons?.map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>)}
        </div>
    );
}

export default MyMain;
