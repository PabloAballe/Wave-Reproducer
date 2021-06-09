// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  i18n  from './consts/traslations';

// tabs
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


//screens 
import HomeScreen from './screens/home';
import SettingScreen from './screens/settings';
import SearchScreen from './screens/shearch';
import DiscoverScreen from './screens/discover';
import RadioScreen from './screens/radio';
import styles from './consts/styles.json'
//iconos
import { AntDesign, MaterialIcons , FontAwesome, Feather,MaterialCommunityIcons,Ionicons  } from '@expo/vector-icons';

//change of the tabs
const color = styles.terciary;
const size=24;


  const Tab = createMaterialBottomTabNavigator();

  export default function Nav() {




    return (

      <Tab.Navigator
        initialRouteName="Home"
        activeColor={color}
         inactiveColor="grey"
        barStyle={{ backgroundColor: "#333333", fontFamily: 'Poppins_500Medium', }}
      >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: `${i18n.t('screen1')}`,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarLabel:  `${i18n.t('screen2')}`,
            tabBarIcon: ({ color }) => (
              <AntDesign name="switcher" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel:  `${i18n.t('screen3')}`,
            tabBarIcon: ({ color }) => (
            <AntDesign  name="search1" size={size} color={color} />
            
            ),
          }}
        />
        <Tab.Screen
          name="Radio"
          component={RadioScreen}
          options={{
            tabBarLabel:  `${i18n.t('screen4')}`,
            tabBarIcon: ({ color }) => (
            <Ionicons name="save-outline" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Profile"
          component={SettingScreen}
          options={{
            tabBarLabel:  `${i18n.t('screen5')}`,
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={size} color={color}/>
            ),
          }}
        />
      </Tab.Navigator>

    );

  }
