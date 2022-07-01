import { Typography, Fab, Collapse, TextField, ButtonGroup, Button } from "@mui/material";
import { useState, useEffect, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleCustomer from "../../../myProps/singleCustomer/singleCustomer";
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import "./getAllCustomers.css";
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


function GetAllCustomers(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [customers,setCustomers]=useState([]);
    const [open,setOpen]=useState(false);
    const [searchFisrtName,setSearchFirstName]=useState("");
    const [searchLastName,setSearchLastName]=useState("");
    const [tempFisrtName,setTempFirstName]=useState("");
    const [tempLastName,setTempLastName]=useState("");

    useEffect(()=>{
        console.log(store.getState().customerState.customers);
        if(store.getState().authState.userType==='ADMIN'){
            setCustomers(store.getState().customerState.customers);
        }else{
            notify.error("you must login first");
            navigate("/login");
        }
    },[])

    const handleOpen=()=>{
        setOpen(!open);
    }

    const customerFirstName=(sender:SyntheticEvent)=>{
        const value=(sender.target as HTMLInputElement).value;
        setTempFirstName(value);
    }
    const customerLastName=(sender:SyntheticEvent)=>{
        const value=(sender.target as HTMLInputElement).value;
        setTempLastName(value);
    }
    const findCustomer=()=>{
        setSearchFirstName(tempFisrtName);
        setSearchLastName(tempLastName);
    }
    const handleReset=()=>{
        setTempFirstName("");
        setTempLastName("");
        setSearchFirstName("");
        setSearchLastName("");
    }
    
    return (
        <div className="getAllCustomers">
			<Typography variant="h3">All Customers</Typography><br/>
            <ButtonGroup variant="contained">
                <Button 
                    color="primary" 
                    aria-label="add" 
                    onClick={()=>{navigate("/admin/addCustomer")}}
                >
                    <AddIcon sx={{mr:1}}/>Add Customer
                </Button>

                <Button 
                    color="secondary" 
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
                    label="customer first name" 
                    onChange={customerFirstName} 
                    value={tempFisrtName}
                >
                </TextField>&nbsp;&nbsp;

                <TextField 
                    variant="outlined" 
                    label="customer last name" 
                    onChange={customerLastName} 
                    value={tempLastName}
                >
                </TextField><br/><br/>
                <ButtonGroup variant="contained">
                    <Button color="primary" onClick={findCustomer}><SearchIcon/></Button>
                    <Button color="error" onClick={handleReset}><RestartAltIcon/></Button>
                </ButtonGroup>
                
            </Collapse>
            <br/>
            {customers
            .filter(item=>item.firstName.match(searchFisrtName))
            .filter(item=>item.lastName.match(searchLastName))
            .map(item=><SingleCustomer key={item.id} customer={item}></SingleCustomer>)}
            
        </div>
    );
}

export default GetAllCustomers;
