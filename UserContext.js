import React, {useContext, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const UserContext = React.createContext()

export const useUser = () => {
 return useContext(UserContext)   
}

export const UserProvider = ({children}) => {
    const [UserData,setUserData] = useState({
        sessionToken: null,
        userID: null
        
    })

    const updateData = () => {
        AsyncStorage.getItem('sessionToken').then(sT => {
            AsyncStorage.getItem('userID').then(uid => {
                setUserData({
                    sessionToken: sT,
                    userID: uid
                })    
                return new Promise((resolve,reject)=>{
                    resolve(UserData)
                });  
            })
        })
        
    }

    return (
        <UserContext.Provider value = {{UserData,updateData}}>
            {children}
        </UserContext.Provider>
    )
}
