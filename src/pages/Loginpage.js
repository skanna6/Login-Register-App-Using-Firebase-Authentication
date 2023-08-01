import React from 'react'
import './Loginpage.css'
import { useState } from "react";
import { LoginApi } from '../services/Api';
import { Storeuserdata } from "../services/Storage";
import { isAuth } from "../services/Auth";
import {Link, Navigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';


export const Loginpage = () => {


    const initialStateerrors = {
        password: { required: false },
        email: { required: false },
        custom_error: null,
      };
    const [errors, seterrors] = useState(initialStateerrors);

    const [loading, setloading] = useState(false);

    const [input, setinput] = useState({
        email: "",
        password: ""
    });

    const handleinput = (event) => {
        setinput({ ...input, [event.target.name]: event.target.value });
    };

    const handlesubmit = (event) => {
        event.preventDefault();
    
        let error = initialStateerrors;
        let hasError = false;
        
        if (input.email == "") {
          error.email.required = true;
           hasError = true;
        }
        if (input.password == "") {
          error.password.required = true;
           hasError = true;
        }
    
        if(hasError != true){
          setloading(true)
    
          LoginApi(input).then((resp)=>{
            Storeuserdata(resp.data.idToken);
            
          }).catch((err)=>{
            console.log(err)
            if(err.code == 'ERR_BAD_REQUEST'){
              seterrors({...errors,custom_error:"Invaild Email or Password!"})
            }
    
          }).finally(()=>{
            setloading(false);
          })
    
          
        };
        
        seterrors({...error});
        
    };

      if(isAuth()){
        return <Navigate to='/dashboard'/>
    
      }

  return (
      <div>
        <Navbar/>
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit={handlesubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" onChange={handleinput} name="email"  id="" placeholder="email"  />
                            {errors.email.required ? (
                                <span className="text-danger">Email is required.</span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password" onChange={handleinput} name="password" placeholder="password" id="" />
                            {errors.password.required ? (
                                <span className="text-danger">Password is required.</span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : null}
                            <span className="text-danger" >
                            {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                            </span>
                            <input  type="submit" className="btn btn-login float-right" disabled={loading} value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link to='/register'>Register</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      </div>
  )
}

export default Loginpage