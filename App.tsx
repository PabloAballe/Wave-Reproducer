import React from 'react';
import { Text, View } from 'react-native';
import styles from "./styles.js";
import  i18n  from './consts/traslations'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider } from 'react-native-appearance';
import Nav from './navigation';
import AuthScreen from './screens/LoginComponent';
// tabs
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



//screens 
import HomeScreen from './screens/home';
import SettingScreen from './screens/settings';
import SearchScreen from './screens/shearch';
import DiscoverScreen from './screens/discover';
import RadioScreen from './screens/radio';
import LoginScreen from './screens/login';
import PlayerScreen from './screens/player'
import PlayListScreen from './screens/playList'

//iconos
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as GoogleSignIn from 'expo-google-sign-in';

// <Text>{i18n.t('welcome')}{i18n.t('app_name')} </Text>


const Stack = createStackNavigator();


export default function App() {


  AuthScreen
 // const [isLogin, setLogin] = React.useState(GoogleSignIn.isSignedInAsync());
 const [isLogin, setLogin] = React.useState(true);
  
  if (isLogin){
  return (
    <AppearanceProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Nav" headerMode="none">
          <Stack.Screen name="Nav" component={Nav} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Radio" component={RadioScreen} />
          <Stack.Screen name="Profile" component={SettingScreen} />
          <Stack.Screen name="Player" component={PlayerScreen} />
          <Stack.Screen name="PlayList" component={PlayListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}else {
  return <LoginScreen/>
}
}


