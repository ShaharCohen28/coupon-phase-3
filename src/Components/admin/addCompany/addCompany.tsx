import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserData from "../../../Moduls/UserData";
import "./addCompany.css";
import { Button, TextField, ButtonGroup, Typography } from "@mui/material";
import Company from '../../../Moduls/Company';
import globals from "../../../util/globals";
import jwtAxios from "../../../util/JWTAxios";
import notify from "../../../util/notify";
import { store } from '../../../redux/store';
import { useDispatch } from "react-redux";
import { updateToken } from "../../../redux/authState";
import { addCompany } from '../../../redux/companyState';
import { CompressOutlined } from "@mui/icons-material";
import { useEffect } from "react";

function AddCompany(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {register,handleSubmit, formState:{errors}} = useForm<Company>();

    useEffect(()=>{
        // console.log(store.getState().authState);
        // console.log(store.getState().companyState);
        if(store.getState().authState.userType!='ADMIN'){
            notify.error("you must login first");
            navigate("/login");
        }
    });

    const send=(msg:Company)=>{
        jwtAxios.post(globals.admin.addCompany,msg)
        .then(response=>{
            if(response.status===200){
                notify.success("company added");
                msg.id=response.data;
                dispatch(addCompany(msg));
                // console.log(store.getState().companyState.companies);
                navigate("/admin/getAllCompanies");
            }
        })
        .catch(error=>{
            notify.error("error adding compny");
        })
        // console.log(store.getState().companyState);

    };

    return (
        <div className="addCompany">
			<Typography variant="h3">Add New Company</Typography><br/>
            <Form onSubmit={handleSubmit(send)}>
                <TextField 
                    name="name" 
                    label="Name" 
                    variant="outlined" 
                    className="TextBox" 
                    required {...register("name")}
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
                

                <ButtonGroup variant="contained" >
                    <Button type="submit" color="primary" >add</Button>
                    <Button type="reset" color="error">clear</Button>
                </ButtonGroup> 
                
            </Form>
        </div>
    );
}

export default AddCompany;
