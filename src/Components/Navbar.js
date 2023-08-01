import React from 'react'
import { isAuth } from '../services/Auth'
import { Link } from 'react-router-dom'

export const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="#">LoginRegisterApp</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto"  >
               {!isAuth ?( <li className="nav-item"><Link to='/register' className="nav-link" >Register</Link></li>):null}
               { !isAuth ?( <li><Link to='/login' className="nav-link"  >Login</Link></li>):null}
               { isAuth ?(<li className="nav-item"><Link to='/dashboard' className="nav-link" >Dashboard</Link></li>):null}
                { isAuth ?(<li><a className="nav-link"  onClick={props.logoutUser} >Logout</a></li>):null}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar