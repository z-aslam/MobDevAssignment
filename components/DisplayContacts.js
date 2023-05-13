import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, ScrollView, FlatList } from 'react-native';
import globalStyle from '../styles/globalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-web';
import { colours } from '../styles/colours';
import { UserContext } from '../UserContext';
import ContextContactCard from './ContactCard';

class DisplayContacts extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    }
  }

  getContacts = () => {
    fetch("http://localhost:3333/api/1.0.0/contacts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw "Unauthorised";
        } else {
          throw "Server error";
        }
      })
      .then((json) => {
        this.setState({ contacts: json });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getContacts();
  }



  render() {
    this.props.navigation.addListener('focus', (e) => {
     this.getContacts()
    });
    return (
      <View style={globalStyle.pageContainer}>
        <Text style={{width: '90%', textAlign:'left', fontSize:30, fontWeight:'bold'}}>
          Your Contacts
        </Text>
       
          <FlatList
            data={this.state.contacts}
            style={{ width: "100%", marginTop: 10, height: "100%" }}
            renderItem={({item}) => {
              return(
                <ContextContactCard
                email={item.email}
                family_name={item.last_name}
                given_name={item.first_name}
                user_id={item.user_id}
                key={item.user_id}
              />
              )
            }}
          />
      </View>
    );
  }
}

export default DisplayContacts;
