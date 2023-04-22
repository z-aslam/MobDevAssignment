import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';
import { StyleSheet } from 'react-native';
import { colours } from '../styles/colours';

class ContactCard extends Component {
    static contextType = UserContext;
    constructor(props){
      super(props);

      this.state = {

      }
      }
  



render() {
    return(
        <View style={style.container}>
            <Text style={[style.title,style.textGeneral]}>{this.props.given_name + ' ' + this.props.family_name}</Text>
            <Text style = {[style.email,style.textGeneral]}> {this.props.email}</Text>
            <TouchableOpacity style={style.button}>
                <Text style={[style.buttonText,style.textGeneral]}>+ Add Contact</Text>
            </TouchableOpacity>
        </View>

    );
}

}

const style = StyleSheet.create({
    container: {
        backgroundColor: colours.green,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        gap: 10
    },
    textGeneral: {
        color: colours.white
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    email:{
        fontSize:15,
        fontStyle: 'italic'
    },
    button: {
        width:'100%',
    },
    buttonText:{
        width:'100%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight:'500'
    },
})



export default ContactCard;