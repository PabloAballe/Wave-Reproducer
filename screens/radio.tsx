import React from 'react';
import { StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions, View, ActivityIndicator,Text ,SafeAreaView,Pressable} from 'react-native';
import styles from "./styles.js";
import Carousel, { Pagination } from 'react-native-x2-carousel';
import MusicService from '../services/musicService';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  i18n  from '../consts/traslations';
import colors from '../consts/styles.json'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import slugify  from 'slugify'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function  RadioScreen ({navigation}){


  const [data, setData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

 const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      setKeys(keys)
    } catch(e) {
      alert("Ha ocurrido el siguinte error "+e)
    }
  
    console.log(keys)
  }

 const  getMyObject = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      alert("Ha ocurrido el siguinte error "+e)
    }
  
    console.log('Done.')
  
  }

  const maper =  () => {
    keys.map((item, index) =>
  {
    let value=item.replace("@", "")
    console.log("El item es "+item)
    console.log("Añadiendo video id "+value)
    MusicService.getInfoVideo(value)
    .then((response) => response.json())
    .then((json) => setData(data=>[...data, json]))
    .catch((error) => console.error(error))
    .finally(() => { console.log("Añadido el video id "+value); setLoading(false); })
  }
  )
  
}


 





  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     getAllKeys()
      maper()
      console.log(data)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
 return  (
  <View style={styles.home_container}>
  <Text style={styles.app_name}>{ i18n.t('tuplaylist')}</Text>
  
  <ScrollView>     
{data.map((item, index) => 
    isLoading ? <ActivityIndicator size="large" color={colors.terciary} style={{ marginTop: '20%', size: 200 }} /> : (
   <Pressable style={{display:'flex', flexDirection: 'row'}} onPress={() => navigation.navigate('Player', {
     id: item.id
   })}   key={index}>
     <Image 
     style={styles.image_playlist}
     source={{ uri:`${item.thumbnails[0].url}`  }}
     />      
     <View>
     <Text numberOfLines={1} style={{ fontSize: 14 ,color: colors.terciary, fontWeight: 'bold', margin: 5, marginTop: 20, }}> {item.title < 35
                 ? `${item.title}`
                 : `${item.title.substring(0, 35)}...`}</Text>
  <Text numberOfLines={1} style={{ fontSize: 12 ,color: colors.secundary, fontWeight: 'bold', margin: 5, marginTop: 20, }}> {item.channel.name }</Text>
 </View>

     </Pressable>))}
 </ScrollView>
 </View>
);

}