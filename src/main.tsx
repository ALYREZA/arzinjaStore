import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoryScreen from './screens/CategoryScreen';
import BasketScreen from './screens/BasketScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
//const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            tabBarLabel: 'Category',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="shape" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Basket"
          component={BasketScreen}
          options={{
            tabBarLabel: 'Basket',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="basket" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
