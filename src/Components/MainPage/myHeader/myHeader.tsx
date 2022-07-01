import "./myHeader.css";
//import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonGroup ,Button, AppBar, Box, IconButton, Toolbar, Typography, Divider, ListItemIcon, Menu, MenuItem, Avatar, Switch, PaletteMode} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { store } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../redux/authState";
import { Logout, ShoppingCart } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import { logoutCompany } from "../../../redux/companyState";
import { logoutCustomer } from "../../../redux/customerState";
import { amber, grey, deepOrange } from "@mui/material/colors";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logoutCoupon } from "../../../redux/couponState";


interface myHeaderProps{
    currentMode:boolean
    changeMode:()=>{}
}

function MyHeader( props:myHeaderProps): JSX.Element {
     // menu settings
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => {
            setAnchorEl(null);
        };
    
        const navigate=useNavigate();
        useEffect(()=>{         
        },[])
        const dispatch=useDispatch();
        const logout=()=>{
            dispatch(userLogout());
            dispatch(logoutCompany());
            dispatch(logoutCustomer());
            dispatch(logoutCoupon());
            handleClose();
            navigate("/");
        }
    
    
        const adminOptions=["All Companies","Add Company","All Customers","Add Customer",];
        const adminLinks=["/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",];
    
        const companyOptions=["Details","All Coupons","Add Coupon",];
        const companyLinks=["/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",];
    
        const customerOptions=["Details","My Coupons",];
        const customerLinks=["/customer/getCustomerDetails","/customer/getCustomerCoupons",];
     
        return (
            <div className="myHeader">            
                <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{bgcolor:'primary.main'}}>
                    <Toolbar>
                        {(store.getState().authState.loggedIn)&&
                        (<IconButton 
                            color="inherit" 
                            onClick={()=>{navigate(-1)}}
                        >
                            <ArrowBackIcon/>
                        </IconButton>)}


                        {(store.getState().authState.loggedIn)&&(
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>)}


                        {(!store.getState().authState.loggedIn)&&
                        (<Button 
                            color="inherit" 
                            onClick={()=>{navigate("/login")}}
                        >
                            Login
                        </Button>)}
                        {(store.getState().authState.userType==='CUSTOMER'|| store.getState().authState.userType==='')&&
                        (<IconButton
                                color="inherit"
                        >
                            <ShoppingCartIcon/>
                        </IconButton>)}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{'aria-labelledby': 'basic-button',}}
                        >
                                
                            {(store.getState().authState.userType==='ADMIN')&&
                            adminOptions.map((option,index)=>
                                <MenuItem 
                                    key={index} 
                                    onClick={()=>{
                                        navigate(adminLinks[index]); 
                                        handleClose();
                                    }}
                                >
                                    {option}
                                </MenuItem>)}

                            {(store.getState().authState.userType==='COMPANY')&&
                            companyOptions.map((option,index)=>
                                <MenuItem 
                                    key={index} 
                                    onClick={()=>{
                                        navigate(companyLinks[index],{state:{companyId:store.getState().companyState.companies[0].id}});
                                        handleClose();
                                    }}
                                >
                                    {option}
                                </MenuItem>)}
                            
                            {(store.getState().authState.userType==='CUSTOMER')&&
                            customerOptions.map((option,index)=>
                                <MenuItem 
                                    key={index} 
                                    onClick={()=>{
                                        navigate(customerLinks[index],{state:{customerId:store.getState().customerState.customers[0].id}});
                                        handleClose();
                                    }}
                                >
                                    {option}
                                </MenuItem>)}

                            <Divider/>

                            <MenuItem onClick={logout}>
                                Logout <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                            </MenuItem>
                        </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        coupons
                    </Typography>

                    <IconButton 
                        color="inherit" 
                        onClick={()=>props.changeMode()}
                    >
                        {props.currentMode?<LightModeIcon/>:<DarkModeIcon/>}
                    </IconButton>

                    <IconButton 
                        color="inherit" 
                        onClick={()=>{navigate("/")}}
                    >
                        <HomeIcon/>
                    </IconButton>
                    
                    </Toolbar>
                </AppBar>
                </Box>
            
                
            </div>
        );
    }

export default MyHeader;
