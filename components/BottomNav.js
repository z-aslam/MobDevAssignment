import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts from "../screens/contacts";
import Chats from "../screens/chats";
import Settings from "../screens/settings";


const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator initialRouteName = 'Chats'>
      <Tab.Screen name="Contacts" component={ Contacts } options={{tabBarLabel: 'Contacts'}} />
      <Tab.Screen name="Chats" component={ Chats } options={{tabBarLabel: 'Chats'}}/>
      <Tab.Screen name="Settings" component={ Settings } options={{tabBarLabel: 'Settings'}} />
    </Tab.Navigator>
  );
}
export default BottomNav;