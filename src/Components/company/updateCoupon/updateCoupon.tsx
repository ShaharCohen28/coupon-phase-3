import { Button, ButtonGroup, containerClasses, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import "./updateCoupon.css";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Coupon from "../../../Moduls/Coupon";
import { useForm } from "react-hook-form";
import { store } from "../../../redux/store";
import notify from "../../../util/notify";
import jwtAxios from '../../../util/JWTAxios';
import globals from "../../../util/globals";
import { updateCoupon } from "../../../redux/couponState";
import { Form } from "react-bootstrap";
import { categories } from "../../../Moduls/Categories";

function UpdateCoupon(): JSX.Element {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const { couponId }=location.state as any;
    const [coupon,setCoupon]=useState(new Coupon());
    const [category,setCategory]=useState("");

    const {register,handleSubmit,formState:{errors}}=useForm<Coupon>();

    useEffect(()=>{
        if(store.getState().authState.userType!='COMPANY'){
            notify.error("you must login first");
            navigate("/login");
        }
        setCoupon(store.getState().couponState.coupons.find(item=>item.id==couponId));
    },[])

    const send=()=>{
        jwtAxios.put(globals.company.updateCoupon,coupon)
        .then(response=>{
            if(response.status===200){
                notify.success("coupon updated")
                store.dispatch(updateCoupon(coupon));
            }else{
                notify.error("something went terriblt wrong");
                console.log(response.data);
            }
        })
        .catch(error=>{
            notify.error("something went terribly wrong");
            console.log("update failed");
        })
    }
    const isPositive=(value:number)=>value>0;


    const handleChange=(args:any)=>{
        const {name,value}=args.target;
        setCoupon({
            ...coupon,
            [name]: value,
        });
    };




    return (
        <div className="updateCoupon">
            <Typography variant="h3">Update Coupon</Typography><br/>
            <Form onSubmit={handleSubmit(send)}>
                <TextField 
                    name="id" 
                    label="id" 
                    variant="outlined" 
                    className="TextBox addField"
                    disabled 
                    value={coupon.id}
                    {...register("id")}
                />
                <br/><br/>
                <TextField 
                    name="title" 
                    label="Title" 
                    variant="outlined" 
                    placeholder={coupon.title}
                    className="TextBox addField"
                    {...register("title")}
                    value={coupon.title}
                    onChange={handleChange}
                />
                <br/><br/>

                <TextField 
                    name="description" 
                    label="Description" 
                    variant="outlined"
                    className="TextBox addField"  
                    {...register("description")}
                    value={coupon.description}
                    onChange={handleChange}
                />
                <br/><br/>

                <InputLabel id="categoryType">CATEGORY</InputLabel>
                <Select 
                    labelId="categoryType" 
                    label="category"
                    className="addField"
                    {...register("category",{onChange:(e)=>handleChange(e)})}
                    value={coupon.category}
                >
                    {categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select><br/><br/>

                <TextField
                    type={"date"}
                    name="startDate"
                    label="start date"
                    className="TextBox dateField"
                    {...register("startDate")}
                    value={coupon.startDate}
                    onChange={handleChange}
                />
                &nbsp;

                <TextField
                    type={"date"}
                    name="endDate"
                    label="end date"
                    className="TextBox dateField"
                    {...register("endDate")}
                    value={coupon.endDate}
                    onChange={handleChange}
                />
                <br/><br/>

                <TextField
                    name="amount"
                    label="amount"
                    className="TextBox dateField"
                    {...register("amount",{
                        validate:{
                            isPositive,
                            // message:'price must be positive',
                        } 
                    })}
                    value={coupon.amount}
                    onChange={handleChange}
                />
                &nbsp;

                <TextField
                    name="price"
                    label="price"
                    className="TextBox dateField"
                    {...register("price",{
                        validate:{
                            isPositive,
                            // message:'price must be positive',
                        } 
                    })}
                    value={coupon.price}
                    onChange={handleChange}
                />
                {/* <span>{errors.price && errors.price?.message}</span> */}
                <br/><br/>
                <TextField 
                    name="image" 
                    label="Image" 
                    variant="outlined"
                    className="TextBox addField" 
                    {...register("image")}
                    value={coupon.image}
                    onChange={handleChange}
                />
                <br/><br/>
                <ButtonGroup variant="contained">
                    <Button type="submit" color="primary" >update</Button>
                    <Button type="reset" onClick={()=>setCategory("")} color="error" >clear</Button>
                </ButtonGroup> 
            </Form>

        </div>
    );
}

export default UpdateCoupon;
