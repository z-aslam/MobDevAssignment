import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts from "../screens/contacts";
import Chats from "../screens/chats";
import Settings from "../screens/settings";
import Search from '../screens/search'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colours } from '../styles/colours';
import User from '../screens/user';


const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator initialRouteName = 'You' screenOptions={({route}) => ({
      tabBarIcon: ({focused,color,size}) => {
        let iconName;

        switch (route.name){
          case 'Search':
            iconName = focused ? 'search' : 'search-outline'
            break;
          case 'Contacts':
            iconName = focused ? 'people' : 'people-outline'
            break;
          case 'Chats':
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
            break;
          case 'Settings':
            iconName = focused ? 'settings' : 'settings-outline'
            break;
          case 'You':
            iconName = focused ? 'person' : 'person-outline'
            break;
        }

        return <Ionicons name = {iconName} size = {size} color = {color} /> ;
      },
      tabBarActiveTintColor: colours.green,
      tabBarInactiveTintColor: colours.lightGrey
    })}>
      <Tab.Screen name="Search" component={ Search} options={{tabBarLabel: 'Search'}}/>
      <Tab.Screen name="Contacts" component={ Contacts } options={{tabBarLabel: 'Contacts'}} />
      <Tab.Screen name="You" component={ User } options={{tabBarLabel: 'You'}} />
      
      <Tab.Screen name="Chats" component={ Chats } options={{tabBarLabel: 'Chats'}}/>
      <Tab.Screen name="Settings" component={ Settings } options={{tabBarLabel: 'Settings'}} />
      
    </Tab.Navigator>
  );
}
export default BottomNav;