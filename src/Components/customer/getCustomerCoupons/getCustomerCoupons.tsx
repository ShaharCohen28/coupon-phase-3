import "./getCustomerCoupons.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Customer from "../../../Moduls/Customer";
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import { Button, ButtonGroup, Collapse, Fab, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import SingleCoupon from "../../../myProps/singleCoupon/singleCoupon";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { categories } from "../../../Moduls/Categories";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


function GetCustomerCoupons(): JSX.Element {
    const navigate=useNavigate();
    const location=useLocation();
    const { customerId }=location.state as any;
    const [customer,setCustomer]=useState(new Customer());
    const [open,setOpen]=useState(false);
    const [category,setCategory]=useState('');
    const [tempCategory,setTempCategory]=useState('')
    

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

    const handleChange=(event:SelectChangeEvent)=>{
        setTempCategory(event.target.value as string);
    }
    const findCoupon=()=>{
        setCategory(tempCategory);
    }

    const handleReset=()=>{
        setTempCategory('');
        setCategory('');


    }

    return (
        <div className="getCustomerCoupons">
            <Typography variant="h3">{customer.firstName}&nbsp;{customer.lastName}'s Coupons</Typography>
            <br/>
            <Button 
                color={open?"secondary":"primary"} 
                onClick={handleOpen}
                variant="contained"
            >
                {open ? <ExpandLess sx={{mr:1}}/> : <ExpandMore sx={{mr:1}}/>} {open?"CLOSE":"FILTER"}
            </Button>
            <br/>

            <Collapse in={open}>
                <InputLabel id="categoryType">CATEGORY</InputLabel>
                <Select 
                    labelId="categoryType" 
                    label="category"
                    value={tempCategory}

                >
                    {categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
                <ButtonGroup variant="contained">
                    <Button color="primary" onClick={findCoupon}><SearchIcon/></Button>
                    <Button color="error" onClick={handleReset}><RestartAltIcon/></Button>
                </ButtonGroup>
            </Collapse>
            <br/>
            {customer.coupons?.filter(item=>item.category.match(category)).map(item=><SingleCoupon key={item.id} coupon={item}></SingleCoupon>)}
        </div>
    );
}

export default GetCustomerCoupons;
