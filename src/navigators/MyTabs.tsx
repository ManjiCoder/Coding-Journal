import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
}

export default MyTabs;
