import { Button, ButtonGroup,TextField, Typography } from "@mui/material";
import "./updateCustomer.css";
import {  Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Customer from "../../../Moduls/Customer";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { send } from "process";
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import globals from "../../../util/globals";
import jwtAxios from "../../../util/JWTAxios";
import { updateCustomer } from "../../../redux/customerState";


function UpdateCustomer(): JSX.Element {
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { customerId }=location.state as any;
    const [customer,setCustomer]=useState(new Customer());

    const {register,handleSubmit, formState:{errors}} = useForm<Customer>();

    useEffect(()=>{
        if(store.getState().authState.userType!='ADMIN'){
            notify.error("you must login first");
            navigate("/login");
        }
        
        setCustomer(store.getState().customerState.customers.find(item=>item.id==customerId));
        
    },[]);
    
    const send=()=>{
        jwtAxios.put(globals.admin.updateCustomer,customer)
        .then(response=>{
            if(response.status<300){
                notify.success("customer updated");
            }else{
                notify.error("something wnet terribly wrong");
                console.log(response.data);
            }
        })
        .then(()=>{
            store.dispatch(updateCustomer(customer))
        })
        .catch(error=>{
            notify.error("update failed");
        })
    } 

    const handleChange=(args:any)=>{
        const {name,value}=args.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };
    
    
    return (
        <div className="updateCustomer">
			<Typography variant="h3">Update customer</Typography>
            <Form onSubmit={handleSubmit(send)}>
                <TextField
                    name="customerId" 
                    variant="outlined" 
                    className="TextBox" 
                    disabled 
                    label="customer id" 
                    {...register("id")} value={customer.id} 
                />
                <br/><br/>
                <TextField 
                    name="firstName" 
                    variant="outlined" 
                    className="TextBox"  
                    placeholder={customer.firstName} 
                    label="customer first name" 
                    {...register("firstName")}
                    value={customer.firstName} 
                    onChange={handleChange}
                />
                <br/><br/>
                <TextField 
                    name="lastName" 
                    variant="outlined" 
                    className="TextBox"  
                    placeholder={customer.lastName} 
                    label="customer last name" 
                    {...register("lastName")} 
                    value={customer.lastName}
                    onChange={handleChange}
                />
                <br/><br/>
                <TextField 
                    name="email" 
                    variant="outlined" 
                    className="TextBox" 
                    placeholder={customer.email} 
                    label="customer email" 
                    {...register("email")} 
                    value={customer.email}
                    onChange={handleChange}/>
                <br/><br/>

                <ButtonGroup >
                    <Button type="submit" color="primary" >update</Button>
                    <Button type="reset" color="secondary" >clear</Button>
                </ButtonGroup> 
            </Form>
        </div>
    );
}

export default UpdateCustomer;
