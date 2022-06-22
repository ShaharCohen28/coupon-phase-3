import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Company from "../../../Moduls/Company";
import "./updateCompany.css";
import { companyState, updateCompany } from '../../../redux/companyState';
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Form } from "react-bootstrap";
import { Button, TextField, ButtonGroup, Typography, Input } from "@mui/material";
import globals from "../../../util/globals";
import jwtAxios from "../../../util/JWTAxios";

function UpdateCompany(): JSX.Element {

    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { companyId }=location.state as any;
    const [company,setCompany]=useState(new Company());
    // const company=location.state as any;

    const {register,handleSubmit, formState:{errors}} = useForm<Company>();


    useEffect(()=>{
        if(store.getState().authState.userType!='ADMIN'){
            notify.error("you must login first");
            navigate("/login");
        }
        setCompany(store.getState().companyState.companies.find(item=>item.id==companyId));
    },[]);

    const send=()=>{
        jwtAxios.put(globals.admin.updateCompany,company)
        .then(response=>{
            if(response.status<300){
                notify.success("company updated");
            }else{
                notify.error("something went terribly wrong");
                console.log(response.data);
            }
        })
        .then(()=>{
            store.dispatch(updateCompany(company));
        })
        .catch(error=>{
            notify.error("update failed");
        })
        
    }

    const handleChange=(args:any)=>{
        const {name,value}=args.target;
        setCompany({
            ...company,
            [name]: value,
        });
    };


    return (
        <div className="updateCompany">
			<Typography variant="h3">Update company</Typography>
            <Form onSubmit={handleSubmit(send)}>
                <TextField 
                    name="companyId" 
                    variant="outlined" 
                    className="TextBox" 
                    disabled 
                    label="company id" 
                    {...register("id")} 
                    value={company.id} 
                />
                <br/><br/>
                <TextField 
                    name="name" 
                    variant="outlined" 
                    className="TextBox" 
                    disabled 
                    value={company.name} 
                    label="company name" 
                    {...register("name")}
                />
                <br/><br/>
                <TextField 
                    name="email" 
                    variant="outlined" 
                    className="TextBox" 
                    placeholder={company.email} 
                    label="company email" 
                    {...register("email")} 
                    value={company.email}
                    onChange={handleChange}
                />
                <br/><br/>

                <ButtonGroup variant="contained">
                    <Button type="submit" color="primary" >update</Button>
                    <Button type="reset" color="error" >clear</Button>
                </ButtonGroup> 
            </Form>
        </div>
    );
}

export default UpdateCompany;
