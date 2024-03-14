import React , {useState,createContext,useContext} from 'react'

export const userContext = createContext(null);

const MyContext = ({children}) => {
    const initialValue = {name:"",email:""}
    const[userData , setUserData] = useState(initialValue);
  return (
    <userContext.Provider value={{
        userData,
        setUserData
    }}>
        {children}
    </userContext.Provider>
  )
}

export default MyContext