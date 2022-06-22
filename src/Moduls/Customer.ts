import Coupon from "./Coupon"

class Customer{
    id?:number
    firstName:string
    lastName:string
    email:string
    password:string
    coupons?:Coupon[]
}

export default Customer;