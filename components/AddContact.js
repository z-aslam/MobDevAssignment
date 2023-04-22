import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyle';
import { UserContext } from '../UserContext';

class AddContact extends Component {
    static contextType = UserContext;
    constructor(props){
      super(props);
      this.state = {
        id: '1'

      }
  
      }

      createContacts = () => {
        fetch('http://localhost:3333/api/1.0.0/user/'+ this.state.id +'/contact', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'X-Authorization': this.context.UserData.sessionToken,
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id: this.state.id,
          })
        })
         .then((response) => {
          console.log(response.status);
          if(response.status === 200){
            throw "Contact added"
          }else if(response.status === 400){
            throw "You can't add yourself as a contact";
          }else if(response.status === 401){
            throw "Unauthorised";
          }else if(response.status === 404){
            throw "Not Found";
          }else{
            throw 'Server error';
          }
        }).catch((error)=>{
          console.log(error)
          //error handling sort this future zainab
          this.setState({errorText: error})
        })
    
    };

  
    

render() {
    return(

        <View>
            <TouchableOpacity
            style = {styles.inputButton}
            onPress={()=>this.createContacts()}>
              <Text 
              style = {styles.buttonText}
              numberOfLines = {1}
              > Create a Contact </Text>
            </TouchableOpacity>



        </View>

    );
}

}


export default AddContact;