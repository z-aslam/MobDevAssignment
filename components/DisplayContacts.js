import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';
import globalStyle from '../styles/globalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-web';
import { colours } from '../styles/colours';
import { UserContext } from '../UserContext';
import ContactCard from './ContactCard';

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
        console.log(response.status);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw "Unauthorised";
        } else {
          throw "Server error";
        }
      })
      .then((json) => {
        console.log(json);
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
    return (
      <View style={globalStyle.pageContainer}>

        <ScrollView style={{ width: "100%", marginTop: 10, height: "100%" }}>
          {this.state.contacts.map(
            ({ email, first_name, last_name, user_id }) => (
              <ContactCard
                email={email}
                family_name={first_name}
                given_name={last_name}
                user_id={user_id}
                key={user_id}
              />
            )
          )}
        </ScrollView>
      </View>
    );
  }
}

export default DisplayContacts;
