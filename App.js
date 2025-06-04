import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RidesProvider } from './context/RidesContext';


import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import AllRidesScreen from './screens/AllRidesScreen';
import ReportsScreen from './screens/ReportsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RidesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Vaše ekrane */}
        </Stack.Navigator>
      </NavigationContainer>
    </RidesProvider>
  );
}
