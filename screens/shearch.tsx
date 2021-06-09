import React, { createRef } from "react";
import {  Text, View ,TextInput, ScrollView, ActivityIndicator, FlatList, Pressable, Image} from 'react-native';
import styles from "./styles.js";
import { MaterialCommunityIcons, FontAwesome, Feather ,AntDesign} from '@expo/vector-icons';
import colors from '../consts/styles.json'
import  i18n  from '../consts/traslations';
import MusicService from '../services/musicService'
import { useNavigation } from "@react-navigation/native";
import slugify  from 'slugify'; 

const actionSheetRef = createRef();

export default function  ShearchScreen (){
  const [text, setText] = React.useState();
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const navigation = useNavigation();



  React.useEffect(() => {
    MusicService.getAll('20', text ? slugify(text, '_') : 'top',i18n.t('region') ,i18n.t('lenguaje'))
      .then((response) => response.json())
      .then((json) => setData(json.result))
      .catch((error) => Alert.alert(error))
      .finally(() => {setLoading(false)});
  }, [text]);

 return  (
      <View style={styles.container}>
        <View style={styles.in}>
        <MaterialCommunityIcons name="movie-search-outline" size={40} color={colors.terciary} styles={{ position: 'absolute',  left  : 100}}/>
          <TextInput
            value={text}
            style={styles.texto}
            placeholder={i18n.t('label_busqueda') }
            onChangeText={text => { console.log(text) ;setText(text)}}
            editable={true}
            multiline={false}
          />
        </View>
        <ScrollView style={{marginTop: 100}}>
       
    { data.map((item, index) => 
        
        <Pressable style={{display:'flex', flexDirection: 'row'}} onPress={() => navigation.navigate('Player', {
          id: item.id
        })}  key={index}>
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
          </Pressable>)
      }
      </ScrollView>
      </View>
    );
  
}