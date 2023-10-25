import { createContext, useState } from "react";





export let UserContext =createContext();
export default function UserContextProvider(props) {
const [userToken, setuserToken] = useState(null)
const [userdata, setuserdata] = useState(null)


   return <UserContext.Provider value={{ userToken , setuserToken ,setuserdata,userdata}}>

        {props.children}
    </UserContext.Provider>
    

    
}

