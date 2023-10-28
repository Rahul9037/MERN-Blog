import { createContext, useState } from "react";

export const UserContest = createContext({});

export const UserContextProvider = ({children}) => {

    const [userInfo , setUserInfo] = useState({})

    return (
        <UserContest.Provider value={{userInfo , setUserInfo}}>
            {children}
        </UserContest.Provider>
    )
}