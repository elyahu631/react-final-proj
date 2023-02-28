import React, { createContext, /*useEffect,*/ useState } from 'react'

export const localUsersContext = createContext();

export default function LocalUsersContextProvider(props) {
  const [usersLocal, setUsersLocal] = useState(JSON.parse(localStorage.getItem('localUsersContext')) || [])
  const [idCounter, setIdCounter] = useState(JSON.parse(localStorage.getItem('nextUserId')) || parseInt(1));


  const GetUserFromDB = (id) => {
    let user = JSON.parse(localStorage.getItem('localUsersContext')).find(user => user.id === id);
    let userInfo = { userId: id, fullName: user.firstName + " " + user.lastName, userImg: user.userImage ,gender:user.gender};
    return userInfo;
  }
  const addUserToContext = (newUser) => {
    let pastUsers = usersLocal;
    let newUsers = [...pastUsers, newUser]
    setUsersLocal(newUsers);
    console.log(idCounter,"idd");
    localStorage.setItem('localUsersContext', JSON.stringify(newUsers))
    localStorage.setItem('nextUserId', idCounter+1)
    setIdCounter(prev=>prev+1)
  }

  const editUserInContext = (newUser) => {
    let users = usersLocal.filter(user => user.id !== newUser.id);   
    let newUsers = [...users, newUser].sort((a, b) => a.id - b.id);
    setUsersLocal(newUsers);
    localStorage.setItem('localUsersContext', JSON.stringify(newUsers))
    localStorage.setItem('nextUserId', idCounter)
  }
  
  // useEffect(() => {
  //     const updateLocalStorage=()=>{
  //         localStorage.setItem('localUsersContext', JSON.stringify(usersLocal))
  //         localStorage.setItem('nextUserId', JSON.stringify(idCounter))
  //     };
  //     window.addEventListener('beforeunload',updateLocalStorage)             //כניסה 
  //     return () => {
  //         window.removeEventListener('beforeunload',updateLocalStorage)      //יציאה
  //     }
  // }, [usersLocal,idCounter]);

  return (
    <localUsersContext.Provider value={{
      idCounter,usersLocal, setUsersLocal, addUserToContext,editUserInContext,GetUserFromDB
    }}>

      {props.children}
    </localUsersContext.Provider>
  )
}
