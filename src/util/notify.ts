import { Notyf } from "notyf";

export enum SuccessMessage{
    LOGIN_APPROVED="Welcome",
}

export enum ErrorMessage{
    LOGIN_FAILED="Incorrect email or password. Please try again.",
}

class Notify{
    private notification=new Notyf({duration:4000 ,position:{x:"center",y:"top"}});

    public success(message:string){
        this.notification.success(message);
    }

    public error(err:any){
        this.notification.error(this.extractMessage(err));
    }

    private extractMessage(err:any):string{
        if(typeof err=='string'){
            return err;
        }
        if(typeof err?.response?.data==='string'){
            return err.response.data;
        }
        if(Array.isArray(err?.response?.data)){
            return err?.response?.dta[0];
        }
        if(typeof err?.message==='string'){
            return err?.message;
        }
        return "Something went terribly wrong!";
    }
}

const notify=new Notify();
export default notify;