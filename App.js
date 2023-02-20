import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';


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
    return true;
  }

  checkPassword = (password) => {
    //Password check logic
    return false;
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

      </View>
      
    );
  }

}

export default App
