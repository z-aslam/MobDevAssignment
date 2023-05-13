import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import globalStyle from "../styles/globalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-web";
import { UserContext } from "../UserContext";
import ContextContactCard from "./ContactCard";
import { colours } from "../styles/colours";
import { useToast } from "react-native-toast-notifications";

const DisplayContacts = (props) => {
  const toast = useToast();
  return <DisplayContactChild toast={toast} {...props} />;
};

class DisplayContactChild extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      blocked: 0,
    };
  }

  showBlock = () => {
    this.getContacts(!this.state.blocked);
    this.setState({ blocked: !this.state.blocked });
  };

  getContacts = (blocked) => {
    if (!blocked) {
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
            this.props.toast("Unauthorised", {
              type: "danger",
            });
          } else {
            this.props.toast("Server error", {
              type: "danger",
            });
          }
        })
        .then((json) => {
          this.setState({ contacts: json });
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch("http://localhost:3333/api/1.0.0/blocked", {
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
            this.props.toast("Unauthorised", {
              type: "danger",
            });
          } else {
            this.props.toast("Server error", {
              type: "danger",
            });
          }
        })
        .then((json) => {
          this.setState({ contacts: json });
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.getContacts(false);
  }

  render() {
    this.props.navigation.addListener("focus", (e) => {
      this.getContacts(false);
    });
    return (
      <View style={globalStyle.pageContainer}>
        <View
          style={{ flexDirection: "row", width: "90%", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 30,
              fontWeight: "bold",
              flex: 10,
              color: colours.black,
            }}
          >
            {this.state.blocked ? "Blocked Contacts" : "Your Contacts"}
          </Text>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.showBlock();
            }}
          >
            {this.state.blocked ? (
              <Ionicons
                name="thumbs-down-outline"
                size={30}
                color={colours.black}
              />
            ) : (
              <Ionicons
                name="thumbs-up-outline"
                size={30}
                color={colours.black}
              />
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.contacts}
          style={{ width: "100%", marginTop: 10, height: "100%" }}
          renderItem={({ item }) => {
            return (
              <ContextContactCard
                email={item.email}
                family_name={item.last_name}
                given_name={item.first_name}
                user_id={item.user_id}
                key={item.user_id}
                contactBlocked={this.state.blocked}
              />
            );
          }}
        />
      </View>
    );
  }
}

export default DisplayContacts;
