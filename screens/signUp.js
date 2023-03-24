import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import SignUpForm from '../components/SignUpForm';
import styles from '../styles/globalStyle';






class SignUp extends Component {
  constructor(props){
    super(props);

  }


  render() {

    return (

        <View style={styles.container}> 
            <SignUpForm navigation = {this.props.navigation}/>
        </View>
  
      
    );
  }

}

export default SignUp
