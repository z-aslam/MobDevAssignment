import React, { Component } from 'react';
import { Text, TextInput, View,TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyle';
import BigLogo from '../components/BigLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';
import ChatCard from './ChatCard';

class ChatForm extends Component {
    static contextType = UserContext;
    constructor(props){
        super(props);
    
        this.state = {
            chats: []
        }
        
      }  
    
      componentDidMount(){
        fetch(`http://localhost:3333/api/1.0.0/chat`, {
            method: "GET",
            headers: {
            Accept: 'application/json',
            'X-Authorization': this.context.UserData.sessionToken,
            'Content-Type': 'application/json'},
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({chats: data})
        })
        .catch((err)=>{
            console.log(err)
        })
      }
      

      render() {
        return (
          <View style={styles.pageContainer}>
            {this.state.chats.map((chat)=>
            {
                console.log(chat)
                if(chat.creator){
                   return( <ChatCard key ={chat.chat_id} first_name = {chat.creator.first_name} name = {chat.name} chat_id={chat.chat_id}/>)
                }
            })}
           
          </View>
          
        );
      }
    }
  
  
      


export default ChatForm;