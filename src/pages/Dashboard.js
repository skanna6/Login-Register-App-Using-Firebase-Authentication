import React, { useEffect, useState } from "react";
import { Userdetailapi } from "../services/Api";
import Navbar from "../Components/Navbar";
import { Logout } from "../services/Auth";
import { useNavigate , Navigate} from "react-router-dom";
import { isAuth } from "../services/Auth";


export const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setuser] = useState({name:'',email:'',localid:''})
  

  useEffect(()=>{
    if(isAuth()){
    Userdetailapi().then((resp)=>{
      console.log(resp)
      setuser({
        name: resp.data.users[0].displayName,
        email: resp.data.users[0].email,
        localid: resp.data.users[0].localId
        
      })
    })
  }
    

  },[]);

  const logoutUser = ()=>{
    Logout();
    navigate('/login')
  }
  if(!isAuth()){
    return <Navigate to='/login'/>

  }

  return (
    <div>
      <Navbar logoutUser={logoutUser}/>
      <main role="main" className="container mt-5">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>
            { user.name && user.email && user.localid ? (
            <div>
              <p className="text-bold " >Hi {user.name}, your Firebase ID is {user.localid}</p>
              <p>Your email is {user.email}</p>
            </div>
            ) : <p>Loading...</p>
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
