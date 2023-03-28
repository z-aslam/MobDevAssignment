import * as React from 'react';
import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from "./screens/signUp";
import Login from "./screens/login";
import Home from "./screens/home";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserContext';
import BottomNav from './components/BottomNav';

const Stack = createNativeStackNavigator();


const Router = () => {
    const userContext = useUser()
    useEffect(()=>{
        const asyncFunc = async () => {
            userContext.updateData()
        }   
        asyncFunc()
    },[])
  return (
    <NavigationContainer >
      {userContext.UserData.sessionToken ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  );
}

const AuthStack = () => {
  return(
    <Stack.Navigator initialRouteName='SignUp' >
        <Stack.Screen name="SignUp" component={ SignUp } />
        <Stack.Screen name="Login" component={ Login } />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return(
    <BottomNav />
  )
}

export default Router;