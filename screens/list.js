import React, { createRef } from "react";
import ActionSheet from "react-native-actions-sheet";

import { StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions, View, Text, Alert} from 'react-native';
import styles from "./styles.js";
///iconos
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useEffect, useState, useRef } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MusicService from '../services/musicService'
import colors from '../consts/styles.json'
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
const { width: screenWidth } = Dimensions.get('window');
const actionSheetRef = createRef();

export default function ListComponent( props) {

  
  
  let actionSheet;
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    MusicService.getAll(props.cantidad, props.busqueda, props.lang , props.region)
      .then((response) => response.json())
      .then((json) => setData(json.result))
      .catch((error) => Alert.alert(error))
      .finally(() => {setLoading(false)});
  }, []);




    return (
      <ScrollView style={{  margin: 20 }}>


        <View >
  
          <Text style={styles.text}>{props.title} </Text>
          {isLoading ? <ActivityIndicator size="large" color={colors.terciary} style={{ marginTop: '20%', size: 200 }} /> : (

            <FlatList horizontal={true} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, index }) => (
                <Pressable  onPress={() => navigation.navigate('Player', {
                  id: item.id
                })} key={index}>
      
                <View style={styles.main} >
                   
                    <AntDesign name="playcircleo" size={50} color={colors.terciary} style={styles.play}   />


                    <Image
                       style={styles.images}
                      source={{
                        uri: item.thumbnails[0].url,
                        
                      }}
                     
                    />

                    <Text numberOfLines={1} style={{ fontSize: 16 ,color: 'black' }}> {item.title < 15
                      ? `${item.title}`
                      : `${item.title.substring(0, 15)}...`}</Text>


                  </View >
                  </Pressable>
                  
              )}
            />
          )}
        </View>
        
      </ScrollView >
    );
  };



