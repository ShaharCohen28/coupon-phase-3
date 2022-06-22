import { Typography, Fab, Collapse, TextField } from "@mui/material";
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


function GetAllCustomers(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [customers,setCustomers]=useState([]);
    const [open,setOpen]=useState(false);
    const [searchFisrtName,setSearchFirstName]=useState("");
    const [searchLastName,setSearchLastName]=useState("");

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
        setSearchFirstName(value);
    }
    const customerLastName=(sender:SyntheticEvent)=>{
        const value=(sender.target as HTMLInputElement).value;
        setSearchLastName(value);
    }
    
    return (
        <div className="getAllCustomers">
			<Typography variant="h3">All Customers</Typography><br/>
            <Fab 
                color="primary" 
                variant="extended" 
                aria-label="add" 
                onClick={()=>{navigate("/admin/addCustomer")}}
            >
                <AddIcon sx={{mr:1}}/>Add Customer
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
                    label="customer first name" 
                    onChange={customerFirstName} 
                    value={searchFisrtName}
                >
                </TextField>&nbsp;&nbsp;

                <TextField 
                    variant="outlined" 
                    label="customer last name" 
                    onChange={customerLastName} 
                    value={searchLastName}
                >
                </TextField>&nbsp;&nbsp;
                
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
