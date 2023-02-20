import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import DisplayContacts from './components/DisplayContacts';
import DisplayProfile from './components/DisplayProfile';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ViewAllChats from './components/ViewAllChats';
import ViewBlockedUsers from './components/ViewBlockedUsers';
import ViewChatInfo from './components/ViewChatInfo';
import ViewSingleChat from './components/ViewSingleChat';
import validator from 'email-validator';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      email:'',
      password:'',
      errorText: '',
    }

  }


  login = () => {
    Alert.alert('Email: ' + this.state.email, 'Password: ' + this.state.password);


    //Check email and password validity
    if(!this.checkEmail(this.state.email)){
      this.setState({errorText:'Email in wrong format'});
      return;
    }
    if(!this.checkPassword(this.state.password)){
      this.setState({errorText:'Password in wrong format'});
      return;
    }
    this.setState({errorText: 'No Errors for now!'});
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
    return (
      <View style={{
        flex:1,
        justifyContent: 'center'
      }}>
        <TextInput onChangeText={(text)=>{this.setState({email:text})}} placeholder="Email..."/>
        <TextInput onChangeText={(text)=>{this.setState({password:text})}} secureTextEntry={true} placeholder="Password..."/>
        <Button title='Login' onPress={this.login}/>

        <Text>{this.state.errorText}</Text>

        <DisplayContacts></DisplayContacts>
        <DisplayProfile></DisplayProfile>
        <LoginForm></LoginForm>
        <SignUpForm></SignUpForm>
        <ViewAllChats></ViewAllChats>
        <ViewBlockedUsers></ViewBlockedUsers>
        <ViewChatInfo></ViewChatInfo>
        <ViewSingleChat></ViewSingleChat>


    

      </View>
      
    );
  }

}

export default App
