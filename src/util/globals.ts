class Globals{

}

class DevelopmentGlobals extends Globals{
    public urls={
        login:"http://localhost:8080/login",
        guest:"http://localhost:8080/guest/allCoupons",
    }

    public admin={
        allCompanies:"http://localhost:8080/admin/allCompanies",
        getCompanyById:"http://localhost:8080/admin/company/",
        allCustomers:"http://localhost:8080/admin/allCustomers",
        addCompany:"http://localhost:8080/admin/company/add",
        deleteCompanyById:"http://localhost:8080/admin/company/delete/",
        updateCompany:"http://localhost:8080/admin/company/update",
        getCustomerById:"http://localhost:8080/admin/customer/",
        addCustomer:"http://localhost:8080/admin/customer/add",
        deleteCustomerById:"http://localhost:8080/admin/customer/delete/",
        updateCustomer:"http://localhost:8080/admin/customer/update",
    }

    public company={
        addCoupon:"http://localhost:8080/company/addCoupon",
        allCompanyCoupons:"http://localhost:8080/company/allCoupons",
        allCompanyCouponsByCategory:"http://localhost:8080/company/couponsByCategory/",
        allCompanyCoupnsByPrice:"http://localhost:8080/company/couponsByPrice/",
        deletCouponById:"http://localhost:8080/company/deleteCoupon/",
        companyDetails:"http://localhost:8080/company/Details",
        updateCoupon:"http://localhost:8080/company/updateCoupon",
    }

    public customer={
        allCustomerCoupons:"http://localhost:8080/customer/customerCoupons",
        allCustomerCouponsByCategory:"http://localhost:8080/customer/customerCouponsByCategory/",
        allCustomerCouponsByPrice:"http://localhost:8080/customer/customerCouponsByPrice/",
        customerDetails:"http://localhost:8080/customer/Details",
        purchaseCoupon:"http://localhost:8080/customer/purchaseCoupon/",
    }
}

class ProductionGlobals extends Globals{
    public urls={
        login:"/login",
        guest:"/guest/allCoupons",
    }

    public admin={
        allCompanies:"/admin/allCompanies",
        getCompanyById:"/admin/company/",
        allCustomers:"/admin/allCustomers",
        addCompany:"/admin/company/add",
        deleteCompanyById:"/admin/company/delete/",
        updateCompany:"/admin/company/update",
        getCustomerById:"/admin/customer/",
        addCustomer:"/admin/customer/add",
        deleteCustomerById:"/admin/customer/delete/",
        updateCustomer:"/admin/customer/update",
    }

    public company={
        addCoupon:"/company/addCoupon",
        allCompanyCoupons:"/company/allCoupons",
        allCompanyCouponsByCategory:"/company/couponsByCategory/",
        allCompanyCoupnsByPrice:"/company/couponsByPrice/",
        deletCouponById:"/company/deleteCoupon/",
        companyDetails:"/company/Details",
        updateCoupon:"/company/updateCoupon",
    }

    public customer={
        allCustomerCoupons:"/customer/customerCoupons",
        allCustomerCouponsByCategory:"/customer/customerCouponsByCategory/",
        allCustomerCouponsByPrice:"/customer/customerCouponsByPrice/",
        customerDetails:"/customer/Details",
        purchaseCoupon:"/customer/purchaseCoupon/",
    }
}

const globals=process.env.NODE_ENV==='production'?new ProductionGlobals:new DevelopmentGlobals;
export default globals;