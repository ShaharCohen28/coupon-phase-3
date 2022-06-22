import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./getCompanyDetails.css";
import { store } from '../../../redux/store';
import notify from "../../../util/notify";
import Company from '../../../Moduls/Company';
import jwtAxios from '../../../util/JWTAxios';
import globals from "../../../util/globals";
import SingleCompany from "../../../myProps/singleCompany/singleCompany";
import { Typography } from "@mui/material";

function GetCompanyDetails(): JSX.Element {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [company,setCompany]=useState(new Company());

    useEffect(()=>{
        setCompany(store.getState().companyState.companies[0]);
        // console.log(company);
    },[])

    return (
        <div className="getCompanyDetails">
			<Typography variant="h3">{company.name}'s Details</Typography><br/>
            <SingleCompany company={company}></SingleCompany>
        </div>
    );
}

export default GetCompanyDetails;
