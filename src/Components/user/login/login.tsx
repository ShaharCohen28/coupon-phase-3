import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import "./login.css";
import UserData from '../../../Moduls/UserData';
import axios from "axios";
import { useForm } from "react-hook-form";
import { threadId } from "worker_threads";
import { useState } from "react";
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

function Login(): JSX.Element {

    const [userType, setUserType] = useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleChange = (event: SelectChangeEvent) => {
        setUserType(event.target.value as string);
    };
    const {register,handleSubmit, formState:{errors}} = useForm<UserData>();
 
    const send=(msg:UserData)=>{
        jwtAxios.post(globals.urls.login,msg)
        .then(response=>{
            notify.success(SuccessMessage.LOGIN_APPROVED);
            dispatch(userLogin(response.headers.authorization));
        })
        .then(()=>{
            if(store.getState().authState.userType==='ADMIN'){
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
            if(store.getState().authState.userType==='ADMIN'){
                jwtAxios.get(globals.admin.allCustomers)
                .then(response=>{
                    dispatch(getAllCustomers(response.data));
                })
                .catch(error=>{
                    notify.error("error loading customers");
                });
            }
        })
        .then(response=>{
            if(store.getState().authState.userType==='COMPANY'){
                jwtAxios.get(globals.company.companyDetails)
                .then(response=>{
                    dispatch(addCompany(response.data))
                })
                .catch(error=>{
                    notify.error("error loading company details");
                })
            }
        })
        .then(response=>{
            if(store.getState().authState.userType==='CUSTOMER'){
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
                    <Button type="reset" color="secondary" variant="contained">clear</Button>
                </ButtonGroup> 
                <br/>
            </Form>
        </div>

    );
}

export default Login;
