import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import ColorPalette from './Screens/ColorPalette';
import { createStackNavigator } from '@react-navigation/stack';
import AddColorPaletteModal from './Screens/AddColorPaletteModal';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="AddColorPaletteModal" component={AddColorPaletteModal} />
      </RootStack.Navigator>
      <StatusBar style={"auto"} />
    </NavigationContainer>
  );
};

export default App;