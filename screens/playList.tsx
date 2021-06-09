import React from 'react';
import { StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions, View, ActivityIndicator,Text ,SafeAreaView,Pressable} from 'react-native';
import Carousel, { Pagination } from 'react-native-x2-carousel';
import styles from "./styles.js";
import MusicService from '../services/musicService';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  i18n  from '../consts/traslations';
import colors from '../consts/styles.json'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import slugify  from 'slugify'; 

export default function  PlayListScreen ({ route }){

    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const navigation = useNavigation();
    const {author }= route.params;

      React.useEffect(() => {
        MusicService.getAll('20', author ? slugify(author) : slugify('top'), i18n.t('region') , i18n.t('lenguaje'))
          .then((response) => response.json())
          .then((json) => setData(json.result))
          .catch((error) => console.error(error))
          .finally(() => {setLoading(false)});
      }, []);


  

  function callBack(id){
      console.log(id)
      props.parentCallback(id)
  }

 return  (
  <View style={styles.home_container}>
       <Text style={styles.app_name}>{ i18n.t('playlist')}</Text>
       
       <ScrollView>     
    { data.map((item, index) => 
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
       <Text numberOfLines={1} style={{ fontSize: 12 ,color: colors.secundary, fontWeight: 'bold', margin: 5, marginTop: 20, }}> {item.viewCount.text }</Text>
      </View>
          </Pressable>))
      }
      </ScrollView>
      </View>
    );
  
}