import React, { useContext } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg';
import { UserContext } from '../Context/userContext';
import { CartContext } from '../Context/CartContext';
import { NavLink } from 'react-router-dom';



export default function Navbar() {
  
let{numberitems ,wishlistCount}=useContext(CartContext)
  let {userToken,setuserToken} = useContext(UserContext);
  let navigate =useNavigate();

  function logout(){
    localStorage.removeItem('userToken');
    setuserToken(null)

    navigate('/login')
  }

 
  return <>
    <nav className="navbar navbar-expand-lg py-3 bg-light mainnav fixed-top ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="fresh cart logo" />
      </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0 ps-2 bg-light">

       {userToken!== null? <>
        <li className="nav-item mx-1">
          <NavLink className="nav-link fw-bold fs-6 NavLink " to="/" id="RouterNavLink">Home</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link fw-bold fs-6 " to="/products " id="RoutNavLink">Products</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link  fw-bold fs-6" to="/categories" id="RouNavLink">Categories</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link fw-bold fs-6 " to="/brands" id="Routerk">Brands</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link fw-bold fs-f" to="/allorders" id="RouterNavLin"na>Orders</NavLink>
        </li>
        
        <li className="nav-item">
          
        </li>
        
        
        
         
       
        
        
        </>:''}
        
        
         

       
      </ul>

      
      
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex  align-items-center bg-light justify-content-between ">
     
       
     
 
      {userToken!== null?
      <ul className='list-unstyled d-flex justify-content-center align-items-center'>
      <li className='pe-2 fw-bolder '>{numberitems}<Link className="nav-link" to="/cart"><i className="fa-solid fa-cart-shopping fs-3  text-main"></i></Link></li>
      <li className='pe-2 fw-bolder'>{wishlistCount}<Link className="nav-link" to="/wishlist"><i className="fa-solid fa-heart fs-2  text-danger "></i></Link></li>

       
      
      </ul>:''}
      <li className="nav-item d-flex align-items-center justify-content-center ">
     
         
          <Link  to={'https://www.facebook.com/'}><i className='fab fa-facebook mx-2'></i></Link>
          <Link to={'https://www.instagram.com/'}><i className='fab fa-instagram mx-2'></i></Link>
         <Link to={'https://www.whatsapp.com/'}> <i className='fab fa-whatsapp mx-2'></i></Link>
         <Link to={'https://www.tiktok.com/'}> <i className='fab fa-tiktok mx-2'></i></Link>
      </li>

       


        {userToken!==null?<>
         <ul className='d-flex justify-content-around   align-items-center text-center bg-light  '>
        <li  className="nav-item list-unstyled me-3"  >
         <Link  to="/profile"> <i className="fa-solid fa-user fs-4 text-main "></i> </Link>
          </li>
         
          <li className="nav-item list-unstyled ">
         
          <span className="nav-link cursor-pointer text-main fw-bolder btn  font" onClick={logout}>Sign Out</span>
        </li>

        </ul>
       
        
        </>:<>

        <li className="nav-item">
          <Link className="nav-link" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>

        </>}
       
       
         

       
      </ul>

      
    </div>
  </div>
</nav>
  </>


}