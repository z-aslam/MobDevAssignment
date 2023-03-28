import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';
import styles from '../styles/globalStyle';




class Login extends Component {
  constructor(props){
    super(props);

  }


  render() {

    return (

        <View style={styles.container}> 
            <LoginForm/>
        </View>
  
      
    );
  }

}

export default Login
