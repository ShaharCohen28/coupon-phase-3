import "./getCustomerDetails.css";
import { useState } from 'react';
import Customer from "../../../Moduls/Customer";
import { Typography } from "@mui/material";
import SingleCustomer from "../../../myProps/singleCustomer/singleCustomer";
import { useEffect } from 'react';
import { store } from "../../../redux/store";

function GetCustomerDetails(): JSX.Element {

    const [customer,setCustomer]=useState(new Customer());

    useEffect(()=>{
        setCustomer(store.getState().customerState.customers[0]);
    },[])

    return (
        <div className="getCustomerDetails">
			<Typography variant="h3">{customer.firstName} {customer.lastName}'s Details</Typography><br/>
            <SingleCustomer customer={customer}></SingleCustomer>
        </div>
    );
}

export default GetCustomerDetails;
