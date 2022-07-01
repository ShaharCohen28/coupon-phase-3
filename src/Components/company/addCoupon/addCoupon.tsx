import { Button, ButtonGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Coupon from "../../../Moduls/Coupon";
import "./addCoupon.css";
import { authAction } from '../../../redux/authState';
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import { Form } from "react-bootstrap";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { categories } from "../../../Moduls/Categories";
import Company from "../../../Moduls/Company";
import jwtAxios from '../../../util/JWTAxios';
import globals from '../../../util/globals';
import { addCoupon } from "../../../redux/couponState";


function AddCoupon(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const [category,setCategory]=useState("");
    const { companyId }=location.state as any;
    const [company,setCompany]=useState(new Company());
    
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const {register,handleSubmit, formState:{errors}} = useForm<Coupon>();
    
    useEffect(()=>{
        if(store.getState().authState.userType==='COMPANY'){
            // console.log(store.getState().companyState.companies[0]);
            // console.log(startDate);
            setCompany(store.getState().companyState.companies.find(item=>item.id===companyId));
            console.log(company);
        }else{
            notify.error("you must login first");
            navigate("/login");
        }
    },[]);

    var startDate=new Date().toISOString().slice(0,10);

    const send=(msg:Coupon)=>{
        msg.companyId=company.id;
        jwtAxios.post(globals.company.addCoupon,msg)
        .then(response=>{
            if(response.status===200){
                notify.success("coupon added");
                msg.id=response.data;
                dispatch(addCoupon(msg));
                // console.log(store.getState().companyState.companies)
                // console.log(store.getState().couponState.coupons)
                // console.log(store.getState().guestState.allCoupons)


                
            }else{
                notify.error("coupon not added");
            }
        })
        .then(()=>{
            // company.coupons.push(msg);
            // dispatch(updateCompany(company));
            // dispatch(addCouponToCompany(msg))
            console.log(store.getState().companyState.companies)


        })
        .catch(error=>{
            notify.error("coupon not added");
        });

    }
    const isPositive=(value:number)=>value>0;

    return (
        <div className="addCoupon">
            <Typography variant="h3">Add New Coupon</Typography><br/>
            <Form onSubmit={handleSubmit(send)}>
                <TextField 
                    name="title" 
                    label="Title" 
                    variant="outlined" 
                    className="addField"
                    required 
                    {...register("title")}
                />
                <br/><br/>

                <TextField 
                    name="description" 
                    label="Description" 
                    variant="outlined"
                    className="addField" 
                    required 
                    {...register("description")}
                />
                <br/><br/>

                <InputLabel id="categoryType">CATEGORY</InputLabel>
                <Select 
                    labelId="categoryType" 
                    label="category"
                    className="addField"
                    required 
                    value={category}
                    {...register("category",{onChange:(e)=>handleChange(e)})}
                >
                    {categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select><br/><br/>

                <TextField
                    type={"date"}
                    name="startDate"
                    label="start date"
                    className="dateField"
                    required
                    defaultValue={startDate}
                    {...register("startDate")}
                />
                &nbsp;

                <TextField
                    type={"date"}
                    name="endDate"
                    label="end date"
                    className="dateField"
                    required
                    {...register("endDate")}
                />
                <br/><br/>

                <TextField
                    name="amount"
                    label="amount"
                    className="dateField"
                    required
                    {...register("amount",{
                        required:{
                            value:true,
                            message:"please enter amout",
                        },
                        validate:{
                            isPositive,
                            // message:'price must be positive',
                        } 
                    })}
                />
                &nbsp;

                <TextField
                    name="price"
                    label="price"
                    className="dateField"
                    
                    {...register("price",{
                        required:{
                            value:true,
                            message:"please enter price",
                        },
                        validate:{
                            isPositive,
                            // message:'price must be positive',
                        } 
                    })}
                />
                {/* <span>{errors.price && errors.price?.message}</span> */}
                <br/><br/>

                <TextField 
                    name="image" 
                    label="Image" 
                    variant="outlined"
                    className="addField" 
                    required {...register("image")}
                />
                <br/><br/>
                <ButtonGroup variant="contained">
                    <Button type="submit" color="primary" >add</Button>
                    <Button type="reset" onClick={()=>setCategory("")} color="error" >clear</Button>
                </ButtonGroup> 
                
            </Form>

        </div>
    );
}

export default AddCoupon;
