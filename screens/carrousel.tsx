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



export default function CarouselScreen  () {
 
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const navigation = useNavigation();

    React.useEffect(() => {
      MusicService.getAll('10', 'top', i18n.t('region') , i18n.t('lenguaje'))
        .then((response) => response.json())
        .then((json) => setData(json.result))
        .catch((error) => console.error(error))
        .finally(() => {setLoading(false)});
    }, []);

  const renderItem = data => (
    <Pressable  onPress={() => navigation.navigate('Player', {
      id: data.id
    })}>
    <Image 
    style={styles.main_scroller}
    source={{ uri:`${data.thumbnails[0].url}`  }}
    onPress={() => navigation.navigate('Player')}
    />      
    </Pressable>
  );
  return (
   <View style={styles.scroller}>
  {isLoading ? <ActivityIndicator size="large" color={colors.terciary} style={{ marginTop: '20%', size: 200 }} /> : (

 <Carousel 
        pagination={Pagination}
        renderItem={renderItem}
        data={data}
      />
)}
  </View>
  
  );
};

