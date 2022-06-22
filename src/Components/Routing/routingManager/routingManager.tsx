import MyMain from "../../MainPage/myMain/myMain";
import "./routingManager.css";
import { Route, Routes } from "react-router-dom";
import Page404 from "../../user/page404/page404";

import Login from "../../user/login/login";
import AddCompany from "../../admin/addCompany/addCompany";
import AddCustomer from "../../admin/addCustomer/addCustomer";
import DeleteCompany from "../../admin/deleteCompany/deleteCompany";
import DeleteCustomer from "../../admin/deleteCustomer/deleteCustomer";
import GetAllCompanies from "../../admin/getAllCompanies/getAllCompanies";
import GetAllCustomers from "../../admin/getAllCustomers/getAllCustomers";
import GetCustomer from "../../admin/getCustomer/getCustomer";
import GetOneCompany from "../../admin/getOneCompany/getOneCompany";
import UpdateCompany from "../../admin/updateCompany/updateCompany";
import UpdateCustomer from "../../admin/updateCustomer/updateCustomer";
import AddCoupon from "../../company/addCoupon/addCoupon";
import DeleteCoupon from "../../company/deleteCoupon/deleteCoupon";
import GetAllCompanyCoupons from "../../company/getAllCompanyCoupons/getAllCompanyCoupons";
import GetCompanyDetails from "../../company/getCompanyDetails/getCompanyDetails";
import GetCouponByCategory from "../../company/getCouponByCategory/getCouponByCategory";
import GetCouponsByMaxPrice from "../../company/getCouponsByMaxPrice/getCouponsByMaxPrice";
import UpdateCoupon from "../../company/updateCoupon/updateCoupon";
import GetCustomerCoupons from "../../customer/getCustomerCoupons/getCustomerCoupons";
import GetCustomerCouponsByCategory from "../../customer/getCustomerCouponsByCategory/getCustomerCouponsByCategory";
import GetCustomerCouponsByMoney from "../../customer/getCustomerCouponsByMoney/getCustomerCouponsByMoney";
import GetCustomerDetails from "../../customer/getCustomerDetails/getCustomerDetails";
import PurchaseCoupon from "../../customer/purchaseCoupon/purchaseCoupon";
import { Paper } from "@mui/material";

function RoutingManager(): JSX.Element {
    return (
        <div className="routingManager">
			<Routes>
                <Route path="/" element= {<MyMain/>}/>
                <Route index element={<MyMain/>}/>
                {/* admin*/}
                <Route path="admin/addCompany" element={<AddCompany/>}/>
                <Route path="admin/addCustomer" element={<AddCustomer/>}/>
                <Route path="admin/deleteCompany" element={<DeleteCompany/>}/>
                <Route path="admin/deleteCustomer" element={<DeleteCustomer/>}/>
                <Route path="admin/getAllCompanies" element={<GetAllCompanies/>}/>
                <Route path="admin/getAllCustomers" element={<GetAllCustomers/>}/>
                <Route path="admin/getCustomer" element={<GetCustomer/>}/>
                <Route path="admin/getOneCompany" element={<GetOneCompany/>}/>
                <Route path="admin/updateCompany" element={<UpdateCompany/>}/>
                <Route path="admin/updateCustomer" element={<UpdateCustomer/>}/>
                {/* company */}
                <Route path="company/addCoupon" element={<AddCoupon/>}/>
                <Route path="company/deleteCoupon" element={<DeleteCoupon/>}/>
                <Route path="company/getAllCompanyCoupons" element={<GetAllCompanyCoupons/>}/>
                <Route path="company/getCompanyDetails" element={<GetCompanyDetails/>}/>
                <Route path="company/getCouponsByCategory" element={<GetCouponByCategory/>}/>
                <Route path="company/getCouponsByMaxPrice" element={<GetCouponsByMaxPrice/>}/>
                <Route path="company/updateCoupon" element={<UpdateCoupon/>}/>

                {/* Customer */}
                <Route path="customer/getCustomerCoupons" element={<GetCustomerCoupons/>}/>
                <Route path="customer/getCustomerCouponsByCategory" element={<GetCustomerCouponsByCategory/>}/>
                <Route path="customer/getCustomerCouponsByMaxPrice" element={<GetCustomerCouponsByMoney/>}/>
                <Route path="customer/getCustomerDetails" element={<GetCustomerDetails/>}/>
                <Route path="customer/purchaseCoupon" element={<PurchaseCoupon/>}/>
                
                <Route path="login" element= {<Login/>}/>

                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>

        // <Paper sx={{height:1}}>
        //     <Routes>
        //         <Route path="/" element= {<MyMain/>}/>
        //         <Route index element={<MyMain/>}/>
        //         {/* admin*/}
        //         <Route path="admin/addCompany" element={<AddCompany/>}/>
        //         <Route path="admin/addCustomer" element={<AddCustomer/>}/>
        //         <Route path="admin/deleteCompany" element={<DeleteCompany/>}/>
        //         <Route path="admin/deleteCustomer" element={<DeleteCustomer/>}/>
        //         <Route path="admin/getAllCompanies" element={<GetAllCompanies/>}/>
        //         <Route path="admin/getAllCustomers" element={<GetAllCustomers/>}/>
        //         <Route path="admin/getCustomer" element={<GetCustomer/>}/>
        //         <Route path="admin/getOneCompany" element={<GetOneCompany/>}/>
        //         <Route path="admin/updateCompany" element={<UpdateCompany/>}/>
        //         <Route path="admin/updateCustomer" element={<UpdateCustomer/>}/>
        //         {/* company */}
        //         <Route path="company/addCoupon" element={<AddCoupon/>}/>
        //         <Route path="company/deleteCoupon" element={<DeleteCoupon/>}/>
        //         <Route path="company/getAllCompanyCoupons" element={<GetAllCompanyCoupons/>}/>
        //         <Route path="company/getCompanyDetails" element={<GetCompanyDetails/>}/>
        //         <Route path="company/getCouponsByCategory" element={<GetCouponByCategory/>}/>
        //         <Route path="company/getCouponsByMaxPrice" element={<GetCouponsByMaxPrice/>}/>
        //         <Route path="company/updateCoupon" element={<UpdateCoupon/>}/>

        //         {/* Customer */}
        //         <Route path="customer/getCustomerCoupons" element={<GetCustomerCoupons/>}/>
        //         <Route path="customer/getCustomerCouponsByCategory" element={<GetCustomerCouponsByCategory/>}/>
        //         <Route path="customer/getCustomerCouponsByMaxPrice" element={<GetCustomerCouponsByMoney/>}/>
        //         <Route path="customer/getCustomerDetails" element={<GetCustomerDetails/>}/>
        //         <Route path="customer/purchaseCoupon" element={<PurchaseCoupon/>}/>
                
        //         <Route path="login" element= {<Login/>}/>

        //         <Route path="*" element={<Page404/>}/>
        //     </Routes>
        // </Paper>
    );
}

export default RoutingManager;
