import React, { Component, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, View, Button, Alert } from 'react-native';
import { UserContext } from '../UserContext';

class DisplayContacts extends Component {
    static contextType = UserContext;
    constructor(props){
      super(props);
      this.state = {
        data: [], 
      };
  
      }

      getContacts = () => {
        fetch('http://localhost:3333/api/1.0.0/contacts', {
            method: "GET",
            headers: {
            Accept: 'application/json',
            'X-Authorization': this.context.UserData.sessionToken,
            'Content-Type': 'application/json'},
        })
        .then((response) => {
            console.log(response.status);
            if(response.status === 200){
                return response.json();
            }else if(response.status === 401){
                throw 'Unauthorised';
            }else{
                throw 'Server error';
            }})
        .then((json) => { 
            console.log(json);
            this.setState({data: json})})
            
        .catch(error => { console.log(error); })
        
    };

    componentDidMount(){
        this.getContacts();
    }
  
    

render() {
    
    return(

        <View style={{flex: 1, padding: 24}}>
          <FlatList
            data= {this.state.data}
            keyExtractor={({user_id}) => user_id}
            renderItem={({item}) => (
              <Text>
                {item.first_name}, {item.last_name}
              </Text>
            )}
          />
      </View>

    );
}

}


export default DisplayContacts