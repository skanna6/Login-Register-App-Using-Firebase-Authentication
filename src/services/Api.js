import axios from "axios";
import { getuserdata } from "./Storage";

const Apikey = "AIzaSyCEIsKVNCgcnnGDVbSTqqmReU66Ycv_gvE"

const Resigterurl = `/accounts:signUp?key=${Apikey}`;
const Loginurl = `/accounts:signInWithPassword?key=${Apikey}`
const Userdetailsurl = `/accounts:lookup?key=${Apikey}`


axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1"

export const RegisterApi = (input) => {

  let data = {
    displayName: input.name,
    email: input.email,
    password: input.password
  };

  return axios.post(Resigterurl, data);

};

export const LoginApi = (input) => {

    let data = {
      email: input.email,
      password: input.password
    };
  
    return axios.post(Loginurl, data);
  
  };

  export const Userdetailapi = ()=>{
    let data = {idToken : getuserdata()};
    return axios.post(Userdetailsurl,data);
  }