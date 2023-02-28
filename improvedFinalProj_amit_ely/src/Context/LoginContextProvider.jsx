import React, { createContext, useState } from 'react'

export const LoginContext = createContext();

export default function LoginContextProvider(props) {
    const [userLoggedin, setUserLoggedin] = useState('')

    const SetLogUserIn = (user)=>{
        setUserLoggedin(user);
    }

    const LogUserOut = () =>{
      setUserLoggedin("");
    }

  return (
    <LoginContext.Provider value={{
        userLoggedin, setUserLoggedin, SetLogUserIn,LogUserOut
      }}>
  
        {props.children}
      </LoginContext.Provider>
  )
}
