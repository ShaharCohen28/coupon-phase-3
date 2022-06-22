import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import Company from "../../Moduls/Company";
import "./singleCompany.css";
import  DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { store } from "../../redux/store";
import jwtAxios from '../../util/JWTAxios';
import globals from '../../util/globals';
import notify from "../../util/notify";
import { deleteCompany } from "../../redux/companyState";



interface SingleCompanyProps {
	company:Company;
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
    const navigate=useNavigate();
    const [open,setOpen]=useState(false);

    const handleClickOpen=()=>{{
        setOpen(true);
    }}

    const handleClose=()=>{
        setOpen(false);
    }

    const deleteSelected=()=>{
        jwtAxios.delete(globals.admin.deleteCompanyById+props.company.id)
        .then(response=>{
            if(response.status<300){
                notify.success("company "+props.company.name+" was deleted");
                store.dispatch(deleteCompany(props.company.id));
            }else{
                notify.error("error");
            }
        })
        .catch(error=>{
            notify.error("error deleting company");
            console.log(error.data);
        })
        setOpen(false);
    }
    return (
        <Card elevation={5} sx={{width:260,display:"inline-block",mx:"20px"}} >
            <CardContent>
                <Typography variant="h5">{props.company.name}</Typography>
                <Typography variant="body2">{props.company.email}</Typography>
            </CardContent>
            <CardActions>
                <Button 
                    color="secondary" 
                    fullWidth onClick={()=>{
                            navigate("/company/getAllCompanyCoupons",{state:{companyId:props.company.id}})
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
                            navigate("/admin/updateCompany",{state:{companyId:props.company.id}})
                        }}
                >
                    <EditIcon/>
                </IconButton>)}

                {(store.getState().authState.userType==='ADMIN')&&
                (<IconButton 
                    color="secondary" 
                    className="Delete" 
                    onClick={(handleClickOpen)}
                >
                    <DeleteIcon/>
                </IconButton>)}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Delete company {props.company.name}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Deleting this company will cause the loss of its information</DialogContentText>
                    </DialogContent>    
                    <DialogActions>
                        <Button onClick={handleClose}>RETURN</Button>
                        <Button className="Delete" color="error" onClick={deleteSelected}>DELETE</Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}

export default SingleCompany;
