import React, { Component, useEffect, useState } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import validator from 'email-validator';
import styles from '../styles/globalStyle';
import BigLogo from '../components/BigLogo';



class SignUpForm extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          first_name: '',
          last_name: '',
          email:'',
          password:'',
          errorText: '',
          
        }
        
      }
      
    
      signUpHandler = () => {
        console.log('singup handle')
        Alert.alert('First Name: ' + this.state.first_name 
        + 'Last Name: ' + this.state.last_name 
        + 'Email: ' + this.state.email 
        + 'Password: ' + this.state.password)
    
    
        //Check email and password validity
        if(!this.checkFirstName(this.state.first_name)){
            this.setState({errorText: '* First Name in wrong format'});
            return;
        }
        if(!this.checkLastName(this.state.last_name)){
            this.setState({errorText: '* Last Name in wrong format'});
            return;
        }
        if(!this.checkEmail(this.state.email)){
          this.setState({errorText:'* Email in wrong format'});
          return;
        }
        if(!this.checkPassword(this.state.password)){
          this.setState({errorText:'* Password in wrong format'});
          return;
        }
        
        
        fetch('http://localhost:3333/api/1.0.0/user', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
        }).then((response) => {
            console.log(response)
            if(response.status === 201){
              throw "Signup Successful.. Please Login"
            }
            else if(response.status === 400){
              throw "Looks like your email already exists or your password isn't strong enough";
            }
            else{
              throw 'Server Error: Something went wrong';
            }
            
        }).catch((err) => {
          console.log(err)
            this.setState({errorText: err});
        })
      }
      
      checkFirstName = (fName) => {
        const nameREGEX = /^[a-zA-Z]+$/.test(fName); 
        return nameREGEX;
      }

      checkLastName = (lName) => {
        const nameREGEX = /^[a-zA-Z]+$/.test(lName); 
        return nameREGEX;
      } 

      checkEmail = (email) => {
        //Email check logic
        return validator.validate(email); 
      }
    
      checkPassword = (password) => {
        //Password check logic
        const PASSWORD_REGEX = new RegExp('^(?=.*[A-Z])(?=.*[1@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$');
        //console.log(PASSWORD_REGEX.test(password));
        return PASSWORD_REGEX.test(password);
      }
    
      

      render() {

        const navigation = this.props.navigation;
    
        return (
          <View style={styles.container}>
    
            {/* <Text style = {styles.titleText}>WHATSTHAT?</Text> */}
            <BigLogo/>


            <Text style = {styles.secondaryTitleText}> Sign Up </Text>

              <TextInput 
              style = {styles.inputView}
              onChangeText={(text)=>{this.setState({first_name:text})}} 
              placeholder="Forename..."
              placeholderTextColor = "#808080"
              />

              <TextInput 
              style = {styles.inputView}
              onChangeText={(text)=>{this.setState({last_name:text})}} 
              placeholder="Surname..."
              placeholderTextColor = "#808080"
              />
    
    
              <TextInput 
              style = {styles.inputView}
              onChangeText={(text)=>{this.setState({email:text})}} 
              placeholder="Email..."
              placeholderTextColor = "#808080"
              />
    
              <TextInput 
              style = {styles.inputView}
              onChangeText={(text)=>{this.setState({password:text})}} 
              secureTextEntry={true} 
              placeholder="Password..."
              placeholderTextColor = "#808080"
              />
    
              <Text style = {styles.errorStyle}>{this.state.errorText}</Text>
    
    
    
            <View style = {styles.buttonContainer}>
    
    
            <TouchableOpacity
            style = {styles.inputButton}
            onPress={this.signUpHandler}>
              <Text 
              style = {styles.buttonText}
              numberOfLines = {1}
              > Sign Up </Text>
            </TouchableOpacity>

            <Text style = {styles.normalText}> or </Text>

            <TouchableOpacity
            style = {styles.altInputButton}
            onPress={()=>navigation.navigate('Login')}>
              <Text 
              style = {styles.buttonText}
              numberOfLines = {1}
              > Login </Text>
            </TouchableOpacity>
    
            </View>
    
          </View>
          
        );
      }
    }
  
  
      


export default SignUpForm;