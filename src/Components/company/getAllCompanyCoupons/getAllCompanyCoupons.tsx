import "./getAllCompanyCoupons.css";
import { useEffect, useState } from 'react';
import { authState } from '../../../redux/authState';
import { store } from "../../../redux/store";
import notify from '../../../util/notify';
import { useLocation, useNavigate } from "react-router-dom";
import Company from "../../../Moduls/Company";
import SingleCoupon from "../../../myProps/singleCoupon/singleCoupon";
import Coupon from "../../../Moduls/Coupon";
import { Box, Button, ButtonGroup, Collapse, Fab, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { categories } from "../../../Moduls/Categories";



function GetAllCompanyCoupons(): JSX.Element {
    const navigate=useNavigate();
    const location=useLocation();
    const { companyId }=location.state as any;
    const [company,setCompany]=useState(new Company());
    const [coupons,setCopons]=useState([]);
    const [open,setOpen]=useState(false);
    

    const handleOpen=()=>{
        setOpen(!open);
    }
    useEffect(()=>{
        if(store.getState().authState.userType==='ADMIN'){
            setCompany(store.getState().companyState.companies.find(item=>item.id==companyId));
        }else if(store.getState().authState.userType==='COMPANY'){
            // console.log(store.getState().companyState.companies);
            setCompany(store.getState().companyState.companies.find(item=>item.id==companyId));
        }else{
            notify.error("please login");
            navigate("/login");
        }
        
    },[])
    return (
        <div className="getAllCompanyCoupons"> 
            <Typography variant="h3">{company.name}'s&nbsp; Coupons </Typography><br/>
            {/* {(store.getState().authState.userType==='COMPANY')&&
            (<Fab 
                color="primary" 
                variant="extended" 
                aria-label="add" 
                onClick={()=>{navigate("/company/addCoupon",{state:{companyId:store.getState().companyState.companies[0].id}})}}
            >
                <AddIcon sx={{mr:1}}/>Add Coupon
            </Fab>)}
            <Fab 
                color={open?"secondary":"primary"} 
                variant="extended" 
                onClick={handleOpen}
            >
                {open ? <ExpandLess sx={{mr:1}}/> : <ExpandMore sx={{mr:1}}/>} {open?"CLOSE":"FILTER"}
            </Fab> */}
            <ButtonGroup variant="contained">
                {(store.getState().authState.userType==='COMPANY')&&
                (<Button
                    color="primary"
                    aria-label="add"
                    onClick={()=>{navigate("/company/addCoupon",{state:{companyId:store.getState().companyState.companies[0].id}})}}
                    >
                        <AddIcon sx={{mr:1}}/>Add Coupon  
                    </Button>)}
                {(store.getState().authState.userType==='COMPANY')&&
                (<Button
                    color={open?"secondary":"primary"} 
                    onClick={handleOpen}
                    size="small"
                >
                    {open ? <ExpandLess /> : <ExpandMore />} 
                </Button>)}
                {(store.getState().authState.userType==='ADMIN')&&
                ( <Button
                color={open?"secondary":"primary"} 
                onClick={handleOpen}
            >
                {open ? <ExpandLess sx={{mr:1}}/> : <ExpandMore sx={{mr:1}}/>} {open?"CLOSE":"FILTER"}
            </Button>)}
            </ButtonGroup>

            <Collapse in={open}>
                <br/>
                <InputLabel id="categoryType">CATEGORY</InputLabel>
                <Select 
                    labelId="categoryType" 
                    label="category"
                >
                    {categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
            </Collapse>
            <br/>
            {company.coupons?.map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>)}
        </div>
    );
}

export default GetAllCompanyCoupons;
