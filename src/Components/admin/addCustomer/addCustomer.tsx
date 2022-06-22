import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Company from "../../../Moduls/Company";
import Customer from "../../../Moduls/Customer";
import { addCustomer } from "../../../redux/customerState";
import { store } from "../../../redux/store";
import jwtAxios from "../../../util/JWTAxios";
import notify from "../../../util/notify";
import "./addCustomer.css";
import globals from '../../../util/globals';

function AddCustomer(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {register,handleSubmit, formState:{errors}} = useForm<Customer>();

    useEffect(()=>{
        // console.log(store.getState().authState);
        // console.log(store.getState().companyState);
        if(store.getState().authState.userType!='ADMIN'){
            notify.error("you must login first");
            navigate("/login");
        }
    });

    const send=(msg:Customer)=>{
        jwtAxios.post(globals.admin.addCustomer,msg)
        .then(response=>{
            if(response.status===200){
                notify.success("customer added");
                msg.id=response.data;
                dispatch(addCustomer(msg));
                navigate("/admin/getAllCustomers");
            }
        })
        .catch(error=>{
            notify.error("failed adding customer")
        });
        // console.log(store.getState().companyState);

    };


    return (
        <div className="addCustomer">
			<Typography variant="h3">Add New Customer</Typography><br/>

            <Form onSubmit={handleSubmit(send)}>
                <TextField 
                    name="firstName" 
                    label="First Name" 
                    variant="outlined" 
                    className="TextBox" 
                    required 
                    {...register("firstName")}
                />
                <br/><br/>

                <TextField 
                    name="lastName" 
                    label="Last Name" 
                    variant="outlined" 
                    className="TextBox" 
                    required 
                    {...register("lastName")}
                />
                <br/><br/>

                <TextField 
                    name="email" 
                    label="Email" 
                    variant="outlined" 
                    className="TextBox" 
                    required 
                    {...register("email")}
                />
                <br/><br/>

                <TextField 
                    name="password" 
                    type="password" 
                    label="Password" 
                    variant="outlined" 
                    className="TextBox" 
                    required 
                    {...register("password")}
                />
                <br/><br/>
                

                <ButtonGroup >
                    <Button type="submit" color="primary" >add</Button>
                    <Button type="reset" color="secondary" >clear</Button>
                </ButtonGroup> 
            </Form>
        </div>
    );
}

export default AddCustomer;
