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
    <nav className="navbar  navbar-expand-lg py-3 bg-light mainnav fixed-top  ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="fresh cart logo" />
      </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse bg-light " id="navbarSupportedContent">
    <ul className="navbar-nav  mb-2 mb-lg-0 ">

{userToken!== null? <>
 <li className="nav-item ">
   <NavLink className="nav-link  fs-6 NavLink " to="/" id="RouterNavLink">Home</NavLink>
 </li>
 <li className="nav-item ">
   <NavLink className="nav-link  fs-6 " to="/products " id="RoutNavLink">Products</NavLink>
 </li>
 <li className="nav-item ">
   <NavLink className="nav-link   fs-6" to="/categories" id="RouNavLink">Categories</NavLink>
 </li>
 <li className="nav-item ">
   <NavLink className="nav-link  fs-6 " to="/brands" id="Routerk">Brands</NavLink>
 </li>
 <li className="nav-item">
   <NavLink className="nav-link  fs-f" to="/allorders" id="RouterNavLin"na>Orders</NavLink>
 </li>
 

 
 </>:''}
</ul>
 <div className='d-flex align-items-center justify-content-center ms-auto'>

  
 {userToken!== null?
      
      <ul className='list-unstyled d-flex justify-content-center align-items-center mb-1 '>
       <li className='pe-3 fw-bolder '><Link className="nav-link position-relative " to="/cart"> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
       {numberitems}
       <span class="visually-hidden">unread messages</span>
       </span><i className="fa-solid fa-cart-shopping fs-3  text-main"></i>
     </Link>
  </li>
      <li className='pe-3 fw-bolder'>
        <Link className="nav-link position-relative " to="/wishlist">
       <span class="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {wishlistCount}
      <span class="visually-hidden">unread messages</span>
      </span><i className="fa-solid fa-heart fs-2  text-danger "></i>
     </Link></li>

       
      
      </ul>:''}
    <li className="nav-item d-flex align-items-center justify-content-center ">   
     <Link  to={'https://www.facebook.com/'}><i className='fab fa-facebook mx-2'></i></Link>
     <Link to={'https://www.instagram.com/'}><i className='fab fa-instagram mx-2'></i></Link>
    <Link to={'https://www.whatsapp.com/'}> <i className='fab fa-whatsapp mx-2'></i></Link>
    <Link to={'https://www.tiktok.com/'}> <i className='fab fa-tiktok mx-2'></i></Link>
     </li>
     {userToken!==null?
        
        <li  className="nav-item list-unstyled me-3 d-flex "  >
         <Link  to="/profile"> <i className="fa-solid fa-user fs-4 text-main px-3"></i> </Link>
         <span className="nav-link cursor-pointer text-main fw-bolder btn  " onClick={logout}>Logout</span>

          </li>
         
       

       :<>
       <li className="nav-item px-2 ">
       <Link className="nav-link fw-bolder text-main fs-6" to="/Login">Login</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link fw-bolder text-main fs-6" to="/register">Register</Link>
     </li>
       </>}
       
        
       





 </div>



    </div>
  </div>
</nav>
  </>


}