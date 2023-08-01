import React, { useState } from "react";
import "./Registerpage.css";
import { RegisterApi } from "../services/Api";
import { Storeuserdata } from "../services/Storage";
import { isAuth } from "../services/Auth";
import {Link , Navigate} from 'react-router-dom';
import Navbar from "../Components/Navbar";

const Registerpage = () => {

  const initialStateerrors = {
    name: { required: false },
    password: { required: false },
    email: { required: false },
    custom_error: null,
  };
  const [errors, seterrors] = useState(initialStateerrors);

  const [loading, setloading] = useState(false);

  const handleinput = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value });
  };

  const [input, setinput] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handlesubmit = (event) => {
    event.preventDefault();

    let error = initialStateerrors;
    let hasError = false;
    if (input.name == "") {
      error.name.required = true;
      hasError = true;
    }
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

      RegisterApi(input).then((resp)=>{
        Storeuserdata(resp.data.idToken);
        
      }).catch((err)=>{
        console.log(err)
        if(err.response.data.error.message == 'EMAIL_EXISTS'){
          seterrors({...errors,custom_error:"Already this Email has Registered!"})
        }else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')){
          seterrors({...errors,custom_error:"Password should be at least 6 character"})
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
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form className="register-form" action="" onSubmit={handlesubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  onChange={handleinput}
                  name="name"
                  id=""
                />

                {errors.name.required ? (
                  <span className="text-danger">Name is required.</span>
                ) : null}

              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Email
                </label>

                <input
                  type="text"
                  className="form-control"
                  onChange={handleinput}
                  name="email"
                  id=""
                />
                {errors.email.required ? (
                  <span className="text-danger">Email is required.</span>
                ) : null}

              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  onChange={handleinput}
                  name="password"
                  id=""
                />
                {errors.password.required ? (
                  <span className="text-danger">Password is required.</span>
                ) : null}

              </div>
              <div className="form-group">
                <span className="text-danger">
                  {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                </span>
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                <input
                  type="submit"
                  className="btn btn-login float-right"
                  value="Register"
                  disabled={loading}
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Already have account ? Please <Link to='/login'>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Registerpage;
