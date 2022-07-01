import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Customer from "../../Moduls/Customer";
import "./singleCustomer.css";
import  DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { ReportHandler } from 'web-vitals';
import globals from '../../util/globals';
import jwtAxios from '../../util/JWTAxios';
import notify from "../../util/notify";
import { deleteCustomer } from '../../redux/customerState';
import { store } from "../../redux/store";


interface SingleCustomerProps {
	customer:Customer;
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    const navigate=useNavigate();
    const [open,setOpen]=useState(false);
    
    const handleClickOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const deleteSelected=()=>{
        jwtAxios.delete(globals.admin.deleteCustomerById+props.customer.id)
        .then(response=>{
            if(response.status<300){
                notify.success("customer " +props.customer.firstName +" "+props.customer.lastName +" was deleted");
                store.dispatch(deleteCustomer(props.customer.id));
            }
        })
        .catch(error=>{
            notify.error("error deleting customer");
            console.log(error.data);
        })
    }

    return (
        <Card elevation={5} sx={{width:300,display:"inline-block",mx:"20px"}} >
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>{props.customer.id}</Avatar>
                }
            />
            <CardContent>
                <Typography variant="h5">{props.customer.firstName}{" "}{props.customer.lastName}</Typography>
                <Typography variant="body2">{props.customer.email}</Typography>
            </CardContent>
            <CardActions>

                <Button 
                    color="secondary" 
                    fullWidth 
                    onClick={()=>{
                            navigate("/customer/getCustomerCoupons",{state:{customerId:props.customer.id}})
                        }}
                >
                    show coupons
                </Button>

                {(store.getState().authState.userType==='ADMIN')&&(<Box sx={{flexGrow:1}}/>)}

                {(store.getState().authState.userType==='ADMIN')&&
                (<IconButton 
                    color="secondary" 
                    className="Update" 
                    onClick={()=>{
                            navigate("/admin/updateCustomer",{state:{customerId:props.customer.id}})
                        }}
                >
                    <EditIcon/>
                </IconButton>)}

                {(store.getState().authState.userType==='ADMIN')&&
                (<IconButton 
                    color="secondary" 
                    className="Delete" 
                    onClick={handleClickOpen}
                >
                    <DeleteIcon/>
                </IconButton>)
                }
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Delete customer {props.customer.firstName} &nbsp; {props.customer.lastName}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Deleting this customer will cause the loss of its information</DialogContentText>
                    </DialogContent>    
                    <DialogActions>
                        <Button onClick={handleClose}>RETURN</Button>
                        <Button className="Delete" onClick={deleteSelected}>DELETE</Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
            
        </Card>
            
    );
}

export default SingleCustomer;
