import { useNavigate } from "react-router-dom";
import "./getAllCompanies.css";
import { SyntheticEvent, useEffect, useState } from 'react';
import SingleCompany from "../../../myProps/singleCompany/singleCompany";
import { iteratorSymbol } from "immer/dist/internal";
import jwtAxios from '../../../util/JWTAxios';
import globals from "../../../util/globals";
import notify from '../../../util/notify';
import { Button, ButtonGroup, Collapse, Fab, IconButton, Input, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { store } from '../../../redux/store';
import { NavigateBeforeTwoTone, Search } from "@mui/icons-material";
import { updateToken } from "../../../redux/authState";
import { useDispatch } from 'react-redux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function GetAllCompanies(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [companies,setCompanies]=useState([]);
    const [open,setOpen]=useState(false);
    const [searchName,setSearchName]=useState("");
    const [tempName,setTempName]=useState("");

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
        setTempName(value);
    }
    const findCompany=()=>{
        setSearchName(tempName)
    }
    const handleReset=()=>{
        setTempName("");
        setSearchName("");

    }
    // sx={{position:'absolute',botton:16, right:16}}

    return (
        <div className="getAllCompanies">
			<Typography variant="h3">All Companies</Typography><br/>
            <ButtonGroup variant="contained">
                <Button
                    color="primary" 
                    aria-label="add" 
                    onClick={()=>{navigate("/admin/addCompany")}}
                >
                    <AddIcon sx={{mr:1}}/>Add Company
                </Button>
                <Button
                    color={open?"secondary":"primary"} 
                    onClick={handleOpen}
                    size="small"
                >
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Button>
            </ButtonGroup>
            <br/><br/>
            <Collapse in={open}>
                <TextField 
                    variant="outlined" 
                    label="company name" 
                    onChange={searchCompany} 
                    value={tempName}></TextField>
                    <br/><br/>

                <ButtonGroup variant="contained">
                    <Button color="primary" onClick={findCompany}><SearchIcon/></Button>
                    <Button color="error" onClick={handleReset}><RestartAltIcon/></Button>
                </ButtonGroup>
            </Collapse>
            <br/>
            {companies
                .filter(item=>(item.name.match(searchName))&&true)
                .map(item=><SingleCompany key={item.id} company={item}></SingleCompany>)}
        </div>
        
    );
}

export default GetAllCompanies;
