import React, { Component, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { UserContext } from "../UserContext";
import { StyleSheet } from "react-native";
import { colours } from "../styles/colours";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyle from "../styles/globalStyle";

class MessageBubble extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      chatOpened: false,
      isUser: false,
    };
  }

  componentDidMount() {

  }
  render() {
    return (
     
        <View style={style.container}>
            {
                this.props.user_id == this.context.UserData.userID && (
                    <View style={{width:'40%'}}></View>
                )
            }
            <View style={[style.bubble,this.props.user_id == this.context.UserData.userID? {backgroundColor:colours.lightGrey} : {backgroundColor: colours.green}]}>
                
            <Text style= {[{fontSize: 15,fontWeight:'bold'},style.text]}>
                {this.props.author}
            </Text>
            <Text style= {[{fontSize: 15, marginVertical:5},style.text]}>
                {this.props.message}
            </Text>

            <Text style={[style.text,{textAlign:'right',fontStyle:'italic',fontSize:10}]}>
                {this.props.timestamp}
            </Text>
            </View>
        </View>
        
 
    );
  }
}

const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        margin: 10,
       
    },
    bubble:{
        width:'60%',
        padding:10,
        borderRadius: 10,
    },
    text: {
        color: colours.white
    }
});

export default MessageBubble;
