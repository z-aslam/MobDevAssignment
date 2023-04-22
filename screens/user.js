import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyle';
import UserPage from '../components/UserPage';




class User extends Component {
  constructor(props){
    super(props);

  }


  render() {

    return (

        <View style={styles.container}> 
            <UserPage/>
        </View>
  
      
    );
  }

}

export default User
