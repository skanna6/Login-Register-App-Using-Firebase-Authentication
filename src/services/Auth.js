import { Removeuserdata, getuserdata } from "./Storage"

export const isAuth = ()=>{
    return getuserdata() != null ? true : false;
}

export const Logout =()=>{
    Removeuserdata();
}