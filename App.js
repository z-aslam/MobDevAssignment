import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from "./screens/signUp";
import Login from "./screens/login";



function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignUp'>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




// import React, { Component } from 'react';
// //import { Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
// //import styles from './styles/globalStyle';

// //importing navigation libraries is the problem
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// //import Login from "./screens/login";
// import SignUp from "./screens/signUp";

// const Stack = createNativeStackNavigator();


// class App extends Component {

  

//   render() {

    
    

//     // return (
//     //   <NavigationContainer>
//     //     <Stack.Navigator>
//     //       <Stack.Screen name="signup" component={SignUp} />
//     //     </Stack.Navigator>
//     //   </NavigationContainer>
//     // )
//       // <NavigationContainer>
//       //   <Stack.Navigator 
//       //   initialRouteName = "SignUp">

//       //     <Stack.Screen name="SignUp" component={SignUp} />
//       //     {/* <Stack.Screen name="Login" component={Login} /> */}

//       //   </Stack.Navigator>

//       // </NavigationContainer>
//       // <View style={styles.container}><SignUp /></View>
//   }
// }


// export default App
