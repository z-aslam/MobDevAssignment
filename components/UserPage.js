import React, { Component, createRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { UserContext } from "../UserContext";
import globalStyle from "../styles/globalStyle";
import { colours } from "../styles/colours";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/globalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";

class UserPage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.cameraRef = createRef(null);
    this.state = {
      imageURI: "",
      userData: {
        first_name: "",
        email: "",
        takingPhoto: false,
        camera: {},
        dark: false,
      },
    };
  }

  handleLogout = async () => {
    await AsyncStorage.removeItem("userID");
    await AsyncStorage.removeItem("sessionToken");
    this.context.updateData();
  };

  handleTakePhoto = () => {
    this.setState({ takingPhoto: true });
    if (this.state.takingPhoto) {
      const options = { quality: 0.5, base64: true };

      this.cameraRef.current.takePictureAsync(options).then((response) => {
        fetch(`${response.uri}`)
          .then((res) => res.blob())
          .then((blob) => {
            fetch(
              `http://localhost:3333/api/1.0.0/user/${this.context.UserData.userID}/photo`,
              {
                method: "POST",
                headers: {
                  Accept: "image/png",
                  "X-Authorization": this.context.UserData.sessionToken,
                  "Content-Type": "image/png",
                },
                body: blob,
              }
            ).then((r) => {
              this.setState({
                imageURI: response.uri,
                takingPhoto: false,
              });
            });
          });
      });
    }
  };

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
    )
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        console.log(userData);
        this.setState({ userData: userData });
      })
      .catch((err) => {
        throw err;
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
      allowsEditing: true,
      base64: true,
    }).then((image) => {
      if (!image.canceled) {
        fetch(`data:image/png;base64,${image.assets[0].base64}`)
          .then((res) => res.blob())
          .then((blob) => {
            fetch(
              `http://localhost:3333/api/1.0.0/user/${this.context.UserData.userID}/photo`,
              {
                method: "POST",
                headers: {
                  Accept: "image/png",
                  "X-Authorization": this.context.UserData.sessionToken,
                  "Content-Type": "image/png",
                },
                body: blob,
              }
            ).then((response) => {
              this.setState({
                imageURI: `data:image/png;base64,${image.assets[0].base64}`,
              });
            });
          });
      }
    });
  };
  render() {
    return (
      <View
        style={[
          globalStyle.pageContainer,
          { backgroundColor: colours.offWhite },
        ]}
      >
        {!this.state.takingPhoto ? (
          <TouchableOpacity onPress={this.handleImageChange}>
            <Image
              source={{
                uri: this.state.imageURI,
              }}
              style={{
                height: 250,
                width: 250,
                borderRadius: 250,
                margin: 20,
              }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{ height: 250, width: 250, borderRadius: 250, margin: 20 }}
          >
            <Camera
              style={{
                height: 250,
                width: 250,
                borderRadius: 250,
                overflow: "hidden",
              }}
              ratio="1:1"
              ref={this.cameraRef}
            ></Camera>
          </View>
        )}
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

        <TouchableOpacity
          style={styles.mainAppButton}
          onPress={() => {
            this.handleLogout();
          }}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            {" "}
            Log Out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainAppButton}
          onPress={() => {
            this.handleImageChange();
          }}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            {" "}
            Upload Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainAppButton}
          onPress={() => {
            this.handleTakePhoto();
          }}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            {" "}
            Take Photo
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.mainAppButton}
          onPress={() => {
            this.context.updateDarkMode();
          }}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            Toggle Dark Mode
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default UserPage;
