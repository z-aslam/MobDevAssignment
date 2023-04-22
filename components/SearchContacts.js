import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import globalStyle from '../styles/globalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-web';
import { colours } from '../styles/colours';
import { UserContext } from '../UserContext';
import ContactCard from './ContactCard';
class SearchContacts extends Component {
    static contextType = UserContext;
    constructor(props){
      super(props);

      this.state = {
        contacts: []
      }
      }
  

      
      searchContact = (text) => {
        if(text === ''){
            this.setState({contacts: []})
        }else{
            fetch('http://localhost:3333/api/1.0.0/search?' + new URLSearchParams({
                q: text
            }), {
                method: "GET",
                headers: {
                Accept: 'application/json',
                'X-Authorization': this.context.UserData.sessionToken,
                'Content-Type': 'application/json'},
            }).then((response) => {
                return response.json()
            }).then((data) => {
                this.setState({contacts: data})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
      }

render() {
    return(
        <View style={globalStyle.pageContainer}>
            <View style = {{width: '100%', flexDirection:'row',alignItems:'center'}}>
            <TextInput style={[globalStyle.searchBar, {flex: 9}]} placeholder='Search Contacts...' onChangeText={(text)=>{this.searchContact(text)}}/>
            {/* <TouchableOpacity style={{width:'100%', textAlign:"center",flex: 1}}>
                <Ionicons name = 'search' color={colours.black}  size={24}/> 
            </TouchableOpacity> */}
            </View>

            <View style = {{width: '100%', marginTop: 20}}>
                {this.state.contacts.map(({email,family_name,given_name,user_id})=>(
                    <ContactCard email = {email} family_name = {family_name} given_name = {given_name} user_id = {user_id} key={user_id}/>
                ))}
            </View>
        </View>

    );
}

}


export default SearchContacts;