import React, { Component, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { UserContext } from "../UserContext";
import globalStyle from "../styles/globalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colours } from "../styles/colours";
import * as ImagePicker from "expo-image-picker";
class UserPage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = { imageURI: "", userData: {
        first_name: '',
        email: ''
      } };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3333/api/1.0.0/user/${this.context.UserData.userID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Authorization": this.context.UserData.sessionToken,
          "Content-Type": "application/json",
        },
      }
    ).then((response)=>{
        return response.json()
    }).then(userData => {
        console.log(userData)
        this.setState({userData: userData})
    }).catch((err)=>{
        throw err
    });
    fetch(
      `http://localhost:3333/api/1.0.0/user/${this.context.UserData.userID}/photo`,
      {
        method: "GET",
        headers: {
          Accept: "image/png",
          "X-Authorization": this.context.UserData.sessionToken,
          "Content-Type": "image/png",
        },
      }
    )
      .then((response) => {
        return response.blob();
      })
      .then((imageRAW) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result;
          this.setState({ imageURI: base64data });
        };
        reader.readAsDataURL(imageRAW);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleImageChange = () => {
    ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true
    }).then((image) => {
        if(!image.canceled) {
          console.log(image.assets[0])
          fetch(
            `http://localhost:3333/api/1.0.0/user/${this.context.UserData.userID}/photo`,
            {
              method: "POST",
              headers: {
                Accept: "image/png",
                "X-Authorization": this.context.UserData.sessionToken,
                "Content-Type": "image/png",
              },
              body: {uri: image.assets[0].uri}
              
            }
          )
        }
    })
  };
  render() {
    return (
      <View style={globalStyle.pageContainer}>
        <TouchableOpacity onPress={this.handleImageChange}>
          {/* <Ionicons name='add-circle' color={colours.lighterGrey} size={200}/> */}
          <Image
            source={{
              uri: this.state.imageURI,
            }}
            style={{ height: 250, width: 250, borderRadius: 250, margin: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 35, fontWeight: "bold", color: colours.black }}
        >
          Hello {this.state.userData.first_name}!
        </Text>

        <Text
          style={{ fontSize: 25, fontStyle: "italic", color: colours.black }}
        >
          {this.state.userData.email}
        </Text>
      </View>
    );
  }
}

export default UserPage;
