import { useNavigate } from "react-router-dom";
import "./getAllCompanies.css";
import { SyntheticEvent, useEffect, useState } from 'react';
import SingleCompany from "../../../myProps/singleCompany/singleCompany";
import { iteratorSymbol } from "immer/dist/internal";
import jwtAxios from '../../../util/JWTAxios';
import globals from "../../../util/globals";
import notify from '../../../util/notify';
import { Collapse, Fab, IconButton, Input, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { store } from '../../../redux/store';
import { NavigateBeforeTwoTone } from "@mui/icons-material";
import { updateToken } from "../../../redux/authState";
import { useDispatch } from 'react-redux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

function GetAllCompanies(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [companies,setCompanies]=useState([]);
    const [open,setOpen]=useState(false);
    const [searchName,setSearchName]=useState("");

    useEffect(()=>{
        if(store.getState().authState.userType==='ADMIN'){
            setCompanies(store.getState().companyState.companies);
            console.log(companies);
        }else{
            notify.error("you must login first");
            navigate("/login");
        }
    },[])

    const handleOpen=()=>{
        setOpen(!open);
    }

    const searchCompany=(sender:SyntheticEvent)=>{
        const value=(sender.target as HTMLInputElement).value;
        setSearchName(value);
    }
    const findCompany=()=>{
        setSearchName(searchName)
    }
    // sx={{position:'absolute',botton:16, right:16}}

    return (
        <div className="getAllCompanies">
			<Typography variant="h3">All Companies</Typography><br/>
            <Fab 
                color="primary" 
                variant="extended" 
                aria-label="add" 
                onClick={()=>{navigate("/admin/addCompany")}}
            >
                <AddIcon sx={{mr:1}}/>Add Company
            </Fab>
            <Fab 
                color="secondary" 
                onClick={handleOpen}
            >   
                {open ? <ExpandLess /> : <ExpandMore />}
            </Fab>
            <br/><br/>
            <Collapse in={open}>
                <TextField 
                    variant="outlined" 
                    label="company name" 
                    onChange={searchCompany} 
                    value={searchName}></TextField>&nbsp;&nbsp;
            </Collapse>
            <br/>
            {companies
                .filter(item=>item.name.match(searchName))
                .map(item=><SingleCompany key={item.id} company={item}></SingleCompany>)}
        </div>
        
    );
}

export default GetAllCompanies;
