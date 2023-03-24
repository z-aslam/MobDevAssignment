import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';




class Login extends Component {
  constructor(props){
    super(props);

  }


  render() {

    return (

        <View> 
            <LoginForm/>
        </View>
  
      
    );
  }

}

export default LoginForm
