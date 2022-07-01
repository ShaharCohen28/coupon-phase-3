import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import Coupon from "../../Moduls/Coupon";
import "./singleCoupon.css";
import  DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import Company from "../../Moduls/Company";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deepOrange, lightBlue } from "@mui/material/colors";
import jwtAxios from '../../util/JWTAxios';
import globals from '../../util/globals';
import notify from '../../util/notify';
import { purchaseCoupon } from "../../redux/customerState";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { deleteCoupon } from '../../redux/couponState';
import { updateAmount } from "../../redux/guestState";


interface SingleCouponProps {
	coupon:Coupon;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const navigate=useNavigate();
    const [isPurchaseable,setPurchaseable]=useState(true);
    const [isPurchased,setPurchased]=useState(false); 
    const [open,setOpen]=useState(false);
    const [amountValue,setAmountValue]=useState(0);

    const handleClickOpen=()=>{{
        setOpen(true);
    }}

    const handleClose=()=>{
        setOpen(false);
    }
    
    const show=(type:string)=>{
        return store.getState().authState.userType===type;
    }

    const load=()=>{
        const couponAmount=props.coupon.amount!=0;
        if(show('CUSTOMER')||show('')){
            if(store.getState().customerState.customers.length==1){
                setPurchased(store.getState().customerState.customers[0].coupons?.filter(item=>item.id==props.coupon.id).length==1);
            }
            setPurchaseable(couponAmount&&!isPurchased);
        }
    }
    let today=new Date();
    useEffect(()=>{
        setAmountValue(props.coupon.amount);
        load();
        // console.log(props.coupon.id + ":"+couponAmount);
        // const couponExpired=props.coupon.endDate
            // console.log(store.getState().customerState.customers[0].coupons?.filter(item=>item.id==props.coupon.id).length==1);
            // console.log(props.coupon.id);
            // console.log(isPurchased);
        // console.log(props.coupon.id);
        // console.log("is coupon amount above 0?: "+couponAmount);
        // console.log("is the coupon already been purchesased?: "+isPurchased);
        // console.log("is coupon number "+props.coupon.id + " purchaseable? "+ isPurchaseable);

    },[])

    const purchaseAmount=()=>{
        if(amountValue>0){
            setAmountValue(amountValue-1);
        }
    }
    const purchase=()=>{
        if(isPurchaseable){
            if(store.getState().authState.userType==='CUSTOMER'){
                jwtAxios.post(globals.customer.purchaseCoupon+props.coupon.id)
                .then(response=>{
                    if(response.status===200){
                        // purchaseAmount();
                        props.coupon.amount=amountValue;
                        store.dispatch(updateAmount(response.data));
                        store.dispatch(purchaseCoupon(response.data));

                        notify.success("coupon purchased");
                    }
                })
                .then(()=>{
                    console.log("look at me im here")
                    
                    // console.log(amountValue);
                    // console.log(props.coupon);
                    // store.dispatch(purchaseCoupon(props.coupon));
                })
                .catch(error=>{
                    notify.error("error purchasing coupon");
                });
            }else{
                notify.error("you must login first");
                navigate("/login");
            }
        }else{
            notify.error("cannot purchase this coupon");
        }
    }
    
    
    

    const deleteSelected=()=>{
        jwtAxios.delete(globals.company.deletCouponById+props.coupon.id)
        .then(response=>{
            if(response.status===200){
                notify.success("coupon number " +props.coupon.id+" was deleted");
                store.dispatch(deleteCoupon(props.coupon.id));
            }
        })
        .catch(error=>{
            notify.error("error deleting coupon")
            console.log(error.data);
        })
    }

    const cardStyle={
        display:"block",
        transitionDuration:"0.3",
        height:"420px"
    }
    return (
    <div  className="SingleCoupon Single" style={{textAlign:'center'}}>
        <Card elevation={5} style={cardStyle}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>{props.coupon.id}</Avatar>
                }
                
                title={props.coupon.title}
                subheader={props.coupon.category}
            />
            <CardMedia 
                component="img" 
                height="140"
                image={props.coupon.image}
            />
            <CardContent>
                <Typography variant="h4">{props.coupon.title}</Typography>
                <Typography variant="body2" color="text.secondary">{props.coupon.description}</Typography>
                <Typography variant="body2">start date:{props.coupon.startDate}&nbsp;end date:{props.coupon.endDate}</Typography>
                <Typography variant="body2">price:&nbsp;{props.coupon.price}$</Typography>
                {(props.coupon.amount<=5&&props.coupon.amount>0)&&
                (<Typography variant="body2" color="error">only &nbsp;{props.coupon.amount}&nbsp; left </Typography>)}
                {(props.coupon.amount==0)&&
                (<Typography variant="body2" color="error">out of stock </Typography>)}
            </CardContent>
            <CardActions>
                
                {/*button to purchase coupon */}
                {(show('CUSTOMER')|| show(''))&&
                (<Button 
                    color={isPurchaseable?"secondary":"warning"} 
                    fullWidth
                    disabled={!isPurchaseable}
                    onClick={()=>purchase()}
                >
                    {isPurchaseable?"buy coupon":"cannot buy coupon"}
                </Button>)}
            
                {(show('COMPANY')||show('CUSTOMER'))&&(<Box sx={{flexGrow:1}}/>)}

                {(show('CUSTOMER')||show(''))&&
                (<IconButton
                    color="secondary"
                    disabled={!isPurchaseable}
                >
                    <AddShoppingCartIcon/>
                </IconButton>)}

                {((show('COMPANY'))&&(props.coupon.companyId==store.getState().companyState.companies[0].id))&&
                (<IconButton 
                    color="secondary" 
                    className="Update" 
                    onClick={()=>{
                        navigate("/company/updateCoupon",{state:{couponId:props.coupon.id}})
                        }}
                >
                    <EditIcon/>
                </IconButton>)}

                {((show('COMPANY'))&&(props.coupon.companyId==store.getState().companyState.companies[0].id))&&
                (<IconButton 
                    color="secondary" 
                    className="Delete"
                    onClick={handleClickOpen}
                >
                    <DeleteIcon/>
                </IconButton>)}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Delete coupon number {props.coupon.id}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Deleting this coupon will cause the loss of its information</DialogContentText>
                        <DialogActions>
                            <Button onClick={handleClose}>RETURN</Button>
                            <Button className="Delete" color="error" onClick={deleteSelected}>DELETE</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            

            </CardActions>
        </Card>
        </div>
    );
}

export default SingleCoupon;
