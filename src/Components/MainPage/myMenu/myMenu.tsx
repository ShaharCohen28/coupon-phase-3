import "./myMenu.css";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from '../../../redux/store';
import React, { Children, useEffect, useState } from "react";
import { Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { userLogout } from '../../../redux/authState';
import { useDispatch } from "react-redux";

function MyMenu(): JSX.Element {
    // menu settings
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // console.log(store.getState().authState);
        const newType=store.getState().authState.userType;
        // console.log(type);
        setType(newType);
        if(type==='ADMIN'){
            setMenuOptions(adminOptions);
            setMenuLinks(adminLinks);
        }else if(type==='COMPANY'){
            setMenuOptions(companyOptions);
            setMenuLinks(companyLinks);
        }else if(type==='CUSTOMER'){
            setMenuOptions(customerOptions);
            setMenuLinks(customerLinks);
        }else{
            setMenuOptions([]);
            setMenuLinks([]);
        }
        // console.log(menuOptions,menuLinks);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // -------------------
    const navigate=useNavigate();
    const [type, setType]= useState('');
    const [menuOptions,setMenuOptions]=useState([]);
    const [menuLinks, setMenuLinks]=useState([]);    
    const [isLogged,setIsLogged]=useState(store.getState().authState.loggedIn);
    useEffect(()=>{
        // console.log(isLogged);
        
    },[])
    const dispatch=useDispatch();
    const logout=()=>{
        dispatch(userLogout());
        handleClose();
        navigate("/");
    }


    const adminOptions=["All Companies","Add Company","All Customers","Add Customer",];
    const adminLinks=["/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",];

    const companyOptions=["Details","All Coupons","Add Coupon",];
    const companyLinks=["/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",];

    const customerOptions=["Details","My Coupons",];
    const customerLinks=["/customer/getCustomerDetails","/customer/getCustomerCoupons",];
    
    const options=[
        "All Companies","Add Company","All Customers","Add Customer",
        "Details","All Coupons","Add Coupon",
        "Details","My Coupons"
    ];
    const links=[
        "/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",
        "/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",
        "/customer/getCustomerDetails","/customer/getCustomerCoupons"
    ];


    return (
        <div className="myMenu">
			{/* <h2>menu</h2><hr/> */}
            
           {/* {!isLogged?  */}
            <div>
                <Button color="primary" variant="outlined" onClick={()=>{navigate("/login")}}>LOGIN</Button><br/>
            </div> 
            {/*:*/} 
            <div>
                <IconButton color="info" onClick={()=>{navigate(-1)}}><ArrowBackIcon/></IconButton>
            
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="info">
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                    {menuOptions.map((option,index)=><MenuItem key={index} onClick={()=>{navigate(menuLinks[index]); handleClose();}}>{option}</MenuItem>)}

                <Divider/>
                    <MenuItem onClick={logout}>Logout <ListItemIcon><Logout fontSize="small" /></ListItemIcon></MenuItem>
                </Menu>
               </div>
            {/* } */}
            
           
            
            
            {/* {userType==="Admin"&&adminMenu()}
            {userType==="Company"&&companyMenu()}
            {userType=="Customer"&&customerMenu()} */}
            {/* {adminMenu()}
            {companyMenu()}
            {customerMenu()} */}
        </div>
    );
}

export default MyMenu;
