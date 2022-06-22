import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
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


interface SingleCouponProps {
	coupon:Coupon;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const navigate=useNavigate();
    const [isPurchaseable,setPurchaseable]=useState(true);
    const [isPurchased,setPurchased]=useState(false); 
    


    const load=()=>{
        const couponAmount=props.coupon.amount!=0;
        if(store.getState().customerState.customers.length==1){
            setPurchased(store.getState().customerState.customers[0].coupons?.filter(item=>item.id==props.coupon.id).length==1);
        }
        setPurchaseable(couponAmount&&!isPurchased);

    }
    let today=new Date();
    useEffect(()=>{
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

    const purchase=()=>{
        if(isPurchaseable){
            if(store.getState().authState.userType==='CUSTOMER'){
                jwtAxios.post(globals.customer.purchaseCoupon+props.coupon.id)
                .then(response=>{
                    if(response.status===200){
                        store.dispatch(purchaseCoupon(props.coupon));
                    }
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
    
    const show=(type:string)=>{
        return store.getState().authState.userType===type;
    }
   

    return (

        <Card elevation={5} sx={{maxHeight:500,display:"inline-block",mx:"20px"}}>
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
                <Typography variant="body2">amount in stock: &nbsp;{props.coupon.amount} </Typography>
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

                {((show('CUSTOMER')||show(''))&&isPurchaseable)&&
                (<IconButton
                    color="secondary"
                >
                    <AddShoppingCartIcon/>
                </IconButton>)}

                {((show('COMPANY'))&&(props.coupon.companyId==store.getState().companyState.companies[0].id))&&
                (<IconButton 
                    color="secondary" 
                    className="Update" 
                    onClick={()=>{
                        navigate("/company/updateCoupon",{state:{companyId:props.coupon.id}})
                        }}
                >
                    <EditIcon/>
                </IconButton>)}

                {((show('COMPANY'))&&(props.coupon.companyId==store.getState().companyState.companies[0].id))&&
                (<IconButton color="secondary" className="Delete"><DeleteIcon/></IconButton>)}
            

            </CardActions>
        </Card>
    );
}

export default SingleCoupon;
