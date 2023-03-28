import React, { Component, useEffect, useState } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import validator from 'email-validator';
import styles from '../styles/globalStyle';
import BigLogo from '../components/BigLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';

      



class LoginForm extends Component {
  static contextType = UserContext;
    constructor(props){
        super(props);
        
        this.state = {
          email: '',
          password: '',
          errorText: ''
        };
      }

      loginHandler = () => {
        fetch('http://localhost:3333/api/1.0.0/login', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        }).then((response) => {
          console.log(response.status);
          if(response.status === 200){
            return response.json();
          }else if(response.status === 400){
            throw 'Invalid email / password supplied';
          }else{
            throw 'Server error';
          }
    
          return response.json()
        }).then(async (userData) => {
          // console.log(useUser)
          await AsyncStorage.setItem('sessionToken',userData.token);
          await AsyncStorage.setItem('userID',userData.id);
          this.context.updateData()

        }).catch((error)=>{
          console.log(error)
          //error handling sort this future zainab
          this.setState({errorText: error})
        })
    
    };

      

      render() {

        const navigation = this.props.navigation;
    
        return (
          <View style={styles.container}>
    
            <BigLogo/>

            <Text style = {styles.secondaryTitleText}> Login </Text>

    
              <TextInput 
              style = {styles.inputView}
              onChangeText={(text)=> this.setState({
                email: text
              })} 
              placeholder="Email..."
              placeholderTextColor = "#808080"
              />
    
              <TextInput 
              style = {styles.inputView}
              onChangeText={(text)=> this.setState({
                password: text
              })}
              secureTextEntry={true} 
              placeholder="Password..."
              placeholderTextColor = "#808080"
              />
    
              <Text style = {styles.errorStyle}>{this.state.errorText}</Text>
    
    
    
            <View style = {styles.buttonContainer}>
    
    
            <TouchableOpacity
            style = {styles.inputButton}
            onPress={()=>this.loginHandler()}>
              <Text 
              style = {styles.buttonText}
              numberOfLines = {1}
              > Login </Text>
            </TouchableOpacity>

            <Text style = {styles.normalText}> or </Text>

            <TouchableOpacity
            style = {styles.altInputButton}
            onPress={()=>navigation.navigate('SignUp')}>
              <Text 
              style = {styles.buttonText}
              numberOfLines = {1}
              > Sign Up </Text>
            </TouchableOpacity>
    
            </View>
    
          </View>
          
        );
      }
    }
    
  
  
      


export default LoginForm;