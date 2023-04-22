import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import SearchContacts from '../components/SearchContacts';
import styles from '../styles/globalStyle';




class Search extends Component {
  constructor(props){
    super(props);

  }


  render() {

    return (

        <View style={styles.container}> 
            <SearchContacts navigation ={this.props.navigation}/>
        </View>
  
      
    );
  }

}

export default Search