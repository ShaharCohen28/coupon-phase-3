import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import "./login.css";
import UserData from '../../../Moduls/UserData';
import axios from "axios";
import { useForm } from "react-hook-form";
import { threadId } from "worker_threads";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import notify, { ErrorMessage, SuccessMessage } from '../../../util/notify';
import jwtAxios from '../../../util/JWTAxios';
import { useNavigate } from "react-router-dom";
import globals from "../../../util/globals";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/authState";
import { store } from "../../../redux/store";
import { addCompany, getAllCompanies } from "../../../redux/companyState";
import { addCustomer, getAllCustomers } from "../../../redux/customerState";
import { getAllCoupons } from "../../../redux/couponState";
import Company from "../../../Moduls/Company";

function Login(): JSX.Element {

    const [userType, setUserType] = useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleChange = (event: SelectChangeEvent) => {
        setUserType(event.target.value as string);
    };
    const {register,handleSubmit, formState:{errors}} = useForm<UserData>();

    const checkType=(type:string)=>{
        return store.getState().authState.userType===type;
    }

    const send=(msg:UserData)=>{
        jwtAxios.post(globals.urls.login,msg)
        .then(response=>{
            notify.success(SuccessMessage.LOGIN_APPROVED);
            dispatch(userLogin(response.headers.authorization));
        })
        .then(()=>{
            if(checkType('ADMIN')){
                jwtAxios.get(globals.admin.allCompanies)
                .then(response=>{
                    dispatch(getAllCompanies(response.data));
                })
                .catch(error=>{
                    notify.error("error loading companies");
                });
            }
        })
        .then(()=>{
            if(checkType('ADMIN')){
                jwtAxios.get(globals.admin.allCustomers)
                .then(response=>{
                    dispatch(getAllCustomers(response.data));
                })
                .catch(error=>{
                    notify.error("error loading customers");
                });
            }
        })
        .then(()=>{
            if(checkType('COMPANY')){
                if(store.getState().companyState.companies.length<1){
                    console.log("help meeeeee im alive")
                    jwtAxios.get<Company>(globals.company.companyDetails)
                    .then((response)=>{
                        console.log(response.data.coupons);
                        let companies:Company[]=[];
                        companies.push(response.data);
                        store.dispatch(getAllCompanies(companies));
                        store.dispatch(getAllCoupons((response.data as Company).coupons));
                        
                    })
                    .catch(error=>{
                        notify.error("error loading company details");
                    })   
                }
                
            }
        })
        // .then(()=>{
        //     if(checkType('COMPANY')){
        //         jwtAxios.get(globals.company.companyDetails)
        //         .then(response=>{
        //             dispatch(getAllCompanies(response.data));
        //         })
        //         .catch(error=>{
        //             notify.error("error loading company details");
        //         })
        //     }
        // })
        // .then(()=>{
        //     if(checkType('COMPANY')){
        //         jwtAxios.get(globals.company.allCompanyCoupons)
        //         .then(response=>{
        //             dispatch(getAllCoupons(response.data));
        //         })
        //         .catch(error=>{
        //             notify.error("error loading company's coupons");
        //         })
        //     }
        // })
        .then(()=>{
            if(checkType('CUSTOMER')){
                jwtAxios.get(globals.customer.customerDetails)
                .then(response=>{
                    dispatch(addCustomer(response.data));
                })
                .catch(error=>{
                    notify.error("error loading customer details");
                })
            }
        })
        .then(()=>{
            // console.log(store.getState().companyState);
            // console.log(store.getState().couponState);
            // console.log(store.getState().guestState)
            // console.log(store.getState().customerState);
            navigate("/");
        })
        .catch(error=>{
            notify.error(ErrorMessage.LOGIN_FAILED);
        })
        /*
        .then(response=>{
            notify.success(SuccessMessage.LOGIN_APPROVED);
            dispatch(userLogin(response.headers.authorization));
            if(store.getState().authState.userType==='ADMIN'){
                jwtAxios.get(globals.urls.allCompanies)
                .then(response=>{
                    dispatch(getAllCompanies(response.data));
                })
                .catch(error=>{
                    notify.error("error loading companies");
                });
                jwtAxios.get(globals.urls.allCustomers)
                .then(response=>{
                    dispatch(getAllCustomers(response.data));
                })
                .catch(error=>{
                    notify.error("error loading customers");
                });
                
            }
            console.log(store.getState().companyState);
            console.log(store.getState().customerState);
            navigate("/");
        })

        .catch(error=>{
            notify.error(ErrorMessage.LOGIN_FAILED);
        })
        */
    }
    useEffect(()=>{
        // console.log(store.getState().companyState);
        // console.log(store.getState().couponState);
        // console.log(store.getState().guestState)
    },[])
    
    return (
        <div className="login">
            <Typography variant="h3">LOGIN</Typography>
            <Form onSubmit={handleSubmit(send)}>

                <TextField 
                    name="email" 
                    label="Email" 
                    variant="outlined" 
                    className="TextBox LoginFeild" 
                    required {...register("userEmail")}
                />
                <br/><br/>
                
                <TextField 
                    name="password" 
                    label="Password" 
                    type ="password" 
                    variant="outlined" 
                    className="TextBox LoginFeild" 
                    required 
                    {...register("userPassword")} 
                />
                <br/><br/>
                
                <FormControl required className="LoginFeild" >
                    <InputLabel id="userType" >User Type</InputLabel>
                
                    <Select 
                        labelId="userType" 
                        id="userSelect" 
                        value={userType} 
                        label="user type"
                        {...register("userType",{onChange:(e)=>handleChange(e)})}
                    >
                        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                        <MenuItem value={"COMPANY"}>COMPANY</MenuItem>
                        <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
                    </Select>
                </FormControl>
                <br/><br/> 
                
            
                <ButtonGroup >
                    <Button type="submit" color="primary" variant="contained" >login</Button>
                    <Button type="reset" color="error" onClick={()=>setUserType("")} variant="contained">clear</Button>
                </ButtonGroup> 
                <br/>
            </Form>
        </div>

    );
}

export default Login;
