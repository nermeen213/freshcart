import './App.css';
import {createBrowserRouter} from 'react-router-dom';
import {RouterProvider} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';



import Layout from './component/Layout/Layout';
import Allorders from './component/Allorders/Allorders';
import Home from './component/Home/Home';
import Cart from './component/Cart/Cart';
import NotFound from './component/NotFound/NotFound';
import Brands from './component/Brands/Brands';
import Categories from './component/Categories/Categories';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Products from './component/Products/Products';
import Profile from './component/Profile/Profile';
import UserContextProvider, { UserContext } from './component/Context/userContext';
import { useContext, useEffect} from 'react';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import ProductDetails from './component/ProductDetails/ProductDetails'
import CartContextProvider from './component/Context/CartContext';
import SpecificCategories from './component/SpecificCategories/SpecificCategories';
import Specificbrands from './component/Specificbrands/Specificbrands';
import Wishlist from './component/Wishlist/Wishlist';
import Address from './component/Address/Address'
import Cashpayment from './component/Cashpayment/Cashpayment'
import Forgetpassword from './component/Forgetpassword/Forgetpassword';
import Changepassword from './component/Changepassword/Changepassword'
import Resetcode from './component/ResetCode/ResetCode'



let routers = createBrowserRouter([
  {path:'/' , element:<Layout/> , children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'address' , element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'cashpayment' , element:<ProtectedRoute><Cashpayment/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'/productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'/products/productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'/wishlist/productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'/products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'/forgetpassword' , element:<Forgetpassword/>},
    {path:'/resetcode' , element:<Resetcode/>},
    {path:'/changepassword' , element:<Changepassword/>},
    {path:'/specificcategories/:id' , element:<ProtectedRoute><SpecificCategories/></ProtectedRoute>},
    {path:'/specificbrands/:id' , element:<ProtectedRoute><Specificbrands/></ProtectedRoute>},
    {path:'*' , element:<NotFound/>},
  ] }
]); 



function App() {
  let {setuserToken}=useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken')!== null){
      setuserToken(localStorage.getItem('userToken'))

    }

  } , []);
 return <CartContextProvider>

<RouterProvider router={routers}></RouterProvider>
<Toaster/>
</CartContextProvider>








}

export default App;
