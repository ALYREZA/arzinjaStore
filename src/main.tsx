import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoryScreen from './screens/CategoryScreen';
import BasketScreen from './screens/BasketScreen';
import ProductScreen from './screens/ProductScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import MapScreen from './screens/MapScreen';
import {BasketProvider} from './context/BasketContext';

function PurchaseNavigation() {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={({route}) => ({title: route.params.name})}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="CategoryTab"
          component={PurchaseNavigation}
          options={{
            title: 'Category',
            headerShown: false,
            tabBarLabel: 'Category',
            tabBarIcon: ({color, size}) => (
              <Icon name="shape" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Basket"
          component={BasketScreen}
          options={{
            tabBarLabel: 'Basket',
            tabBarIcon: ({color, size}) => (
              <Icon name="basket" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <BasketProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Navigation />
      </SafeAreaProvider>
    </BasketProvider>
  );
}

export default App;
