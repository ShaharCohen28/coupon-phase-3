import "./getAllCompanyCoupons.css";
import { SyntheticEvent, useEffect, useState } from 'react';
import { authState } from '../../../redux/authState';
import { store } from "../../../redux/store";
import notify from '../../../util/notify';
import { useLocation, useNavigate } from "react-router-dom";
import Company from "../../../Moduls/Company";
import SingleCoupon from "../../../myProps/singleCoupon/singleCoupon";
import Coupon from "../../../Moduls/Coupon";
import { Box, Button, ButtonGroup, Collapse, Fab, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { categories } from "../../../Moduls/Categories";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';



function GetAllCompanyCoupons(): JSX.Element {
    const navigate=useNavigate();
    const location=useLocation();
    const { companyId }=location.state as any;
    const [company,setCompany]=useState(new Company());
    const [coupons,setCoupons]=useState([]);
    const [open,setOpen]=useState(false);
    const [category,setCategory]=useState('');
    const [tempCategory,setTempCategory]=useState('')
    const [maxPrice,setMaxPrice]=useState(0);
    const [price,setPrice]=useState(0);
    const [tempPrice,setTempPrice]=useState(0);

    

    const handleOpen=()=>{
        setOpen(!open);
    }
    const findMaxAdmin=()=>{
        let currentMax=0;
        for(let counter=0; counter<company.coupons?.length; counter++){
            if(company.coupons[counter].price>currentMax){
                currentMax=company.coupons[counter].price;
            }
        }
        return currentMax;
    }
    const findMaxCompany=()=>{
        let currentMax=0;
        for(let counter=0; counter<coupons.length; counter++){
            if(coupons[counter].price>currentMax){
                currentMax=coupons[counter].price;
            }
        }
        return currentMax;
    }


    useEffect(()=>{
        if(store.getState().authState.userType==='ADMIN'){
            setCompany(store.getState().companyState.companies.find(item=>item.id==companyId)); 
            setMaxPrice(findMaxAdmin);
            console.log(maxPrice);

        }else if(store.getState().authState.userType==='COMPANY'){
            setCoupons(store.getState().couponState.coupons);
            setMaxPrice(findMaxCompany());
            console.log(maxPrice);
        }else{
            notify.error("please login");
            navigate("/login");
        }
    },[])

    const handleChange=(event:SelectChangeEvent)=>{
        setTempCategory(event.target.value as string);
    }
    // const searchPrice=(sender:SyntheticEvent)=>{
    //     const value=(sender.target as HTMLInputElement).value;
    //     setTempPrice(value);
    // }
    const searchPrice=(event:Event, newValue:number | number[])=>{
        setTempPrice(newValue as number);
    }

    const findCoupon=()=>{
        setCategory(tempCategory);
        setPrice(tempPrice)
    }

    const handleReset=()=>{
        setTempCategory('');
        setCategory('');
        setPrice(maxPrice);
        setTempPrice(maxPrice);

    }
    return (
        <div className="getAllCompanyCoupons"> 
            <Typography variant="h3">{company.name}'s&nbsp; Coupons </Typography><br/>
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
                    onChange={handleChange}
                    value={tempCategory}
                    sx={{width:300}}
                >
                    {categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
                {/* <TextField
                    type="number"
                    variant="outlined"
                    label="price"

                />*/}
                <br/> 
                <Slider
                    min={0}
                    max={maxPrice}
                    defaultValue={maxPrice}
                    color="secondary"
                    valueLabelDisplay="on"
                    value={tempPrice}
                    sx={{width:300}}
                />
                <br/><br/>

                <ButtonGroup variant="contained">
                    <Button color="primary" onClick={findCoupon}><SearchIcon/></Button>
                    <Button color="error" onClick={handleReset}><RestartAltIcon/></Button>
                </ButtonGroup>
            </Collapse>
            <br/>
            {(store.getState().authState.userType==='ADMIN')&&
            (company.coupons?.filter(item=>item.category.match(category)).map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>))}
            {(store.getState().authState.userType==='COMPANY')&&
            (coupons.filter(item=>item.category.match(category)).map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>))}
        </div>
    );
}

export default GetAllCompanyCoupons;
