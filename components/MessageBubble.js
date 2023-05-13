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
      deleted: false,
      messageText: this.props.message
    };
  }

  componentDidMount() {

  }

  handleEdit = () => {
    fetch(
        `http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}/message/${this.props.message_id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "X-Authorization": this.context.UserData.sessionToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: this.state.messageText
          })
        }
      ).then((response) => {
        switch (response.status) {
          case 200:
            this.props.toast.show("Message edited", {
              type: "success"
            });
            break;
          case 401:
            this.props.toast.show("Unauthorized", {
              type: "danger"
            });
            break;
          case 404:
            this.props.toast.show("Not found", {
              type: "danger"
            });
          case 500:
            this.props.toast.show("Server error", {
              type: "danger"
            });
            break;
        }
    })
  }

  handleDelete = () => { 
    fetch(
        `http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}/message/${this.props.message_id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "X-Authorization": this.context.UserData.sessionToken,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        switch (response.status) {
          case 200:
            this.setState({ deleted: true});
            this.props.toast.show("Message deleted", {
              type: "success"
            });
            break;
          case 401:
            this.props.toast.show("Unauthorized", {
              type: "danger"
            });
            break;
          case 404:
            this.props.toast.show("Not found", {
              type: "danger"
            });
          case 500:
            this.props.toast.show("Server error", {
              type: "danger"
            });
            break;
        }
    })
  }
  
  render() {
    return (
     
        <View style={style.container}>
            {
                this.props.user_id == this.context.UserData.userID && (
                    <View style={{width:'30%'}}></View>
                )
            }
            {!this.state.deleted && (<View style={[style.bubble,this.props.user_id == this.context.UserData.userID? {backgroundColor:colours.lightGrey} : {backgroundColor: colours.green}]}>
                
            <Text style= {[{fontSize: 15,fontWeight:'bold'},style.text]}>
                {this.props.author}
            </Text>
            {this.props.user_id != this.context.UserData.userID &&(<Text style= {[{fontSize: 15, marginVertical:5},style.text]}>
                {this.props.message}
            </Text>)}

            {this.props.user_id == this.context.UserData.userID &&(<TextInput style= {[{fontSize: 15, marginVertical:5},style.text]} defaultValue={this.props.message} onSubmitEditing={this.handleEdit} onChangeText={(value)=>{this.setState({messageText: value})}}/>
                
           )}
            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:5}}>
            <Text style={[style.text,{textAlign:'right',fontStyle:'italic',fontSize:10}]}>
                {this.props.timestamp}
            </Text>
            { this.props.user_id == this.context.UserData.userID && (
            <TouchableOpacity style={{textAlign:'right'}} onPress={this.handleDelete}>
                <Ionicons name = 'close-outline' color={colours.white} size={24}/>
            </TouchableOpacity>)}
            </View>
            
            </View>)}
            
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
        width:'70%',
        padding:10,
        borderRadius: 10,
    },
    text: {
        color: colours.white
    }
});

export default MessageBubble;
