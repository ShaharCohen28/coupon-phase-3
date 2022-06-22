import "./getCustomerCoupons.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Customer from "../../../Moduls/Customer";
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import { Collapse, Fab, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import SingleCoupon from "../../../myProps/singleCoupon/singleCoupon";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { categories } from "../../../Moduls/Categories";

function GetCustomerCoupons(): JSX.Element {
    const navigate=useNavigate();
    const location=useLocation();
    const { customerId }=location.state as any;
    const [customer,setCustomer]=useState(new Customer());
    const [searchCategory,setSearchCategory]=useState("");
    const [open,setOpen]=useState(false);
    

    const handleOpen=()=>{
        setOpen(!open);
    }

    useEffect(()=>{
        if(store.getState().authState.userType==='ADMIN'){
            setCustomer(store.getState().customerState.customers.find(item=>item.id==customerId));
        }else if(store.getState().authState.userType==='CUSTOMER'){
            setCustomer(store.getState().customerState.customers.find(item=>item.id==customerId));

        }else{
            notify.error("please login");
            navigate("/login");
        }
        
    },[])

    return (
        <div className="getCustomerCoupons">
            <Typography variant="h3">{customer.firstName}&nbsp;{customer.lastName}'s Coupons</Typography>
            <br/>
            <Fab 
                color={open?"secondary":"primary"} 
                variant="extended" 
                onClick={handleOpen}
            >
                {open ? <ExpandLess sx={{mr:1}}/> : <ExpandMore sx={{mr:1}}/>} {open?"CLOSE":"FILTER"}
            </Fab>
            <br/>

            <Collapse in={open}>
                <InputLabel id="categoryType">CATEGORY</InputLabel>
                <Select 
                    labelId="categoryType" 
                    label="category"
                >
                    {categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
            </Collapse>
            <br/>
            {customer.coupons?.map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>)}
        </div>
    );
}

export default GetCustomerCoupons;
