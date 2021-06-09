
import ActionSheet from "react-native-actions-sheet";
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Switch,
  Pressable,
  Alert
} from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayButton from './play';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Foundation } from '@expo/vector-icons';
import MusicService from '../services/musicService'
import colors from '../consts/styles.json'
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus } from 'expo-av';
import { play } from 'react-native-track-player';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Carousel, { Pagination } from 'react-native-x2-carousel';
import  i18n  from '../consts/traslations';
import PlayListScreen from './playList';
import slugify  from 'slugify'; 
import { StatusBar } from "expo-status-bar";
import * as Permissions from "expo-permissions";
const actionSheetRef = createRef();
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useKeepAwake } from 'expo-keep-awake';
import { Linking } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PlayerScreen({ route }) {

  let actionSheet;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();
  const [isAlreadyPlay, setisAlreadyPlay] = React.useState(false);
  const [duration, setDuration] = React.useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = React.useState('00:00:00');
  const [percent, setPercent] = React.useState(0);
  const [current_track, setCurrentTrack] = React.useState(0);
  const [inprogress, setInprogress] = React.useState(false);
  const { id }= route.params;
  const [ videoID , setVideoID ]= React.useState('');
  const [data, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [sound, setSound] = React.useState();
  const [viewVideo, setViweVideo] = React.useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const opacity = React.useMemo(() => new Animated.Value(0), []);
  const [isPress, setIsPress] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [seconds, setSeconds] = React.useState(false);
  const [isStored, setisStored] = React.useState(false);
  const [uri, setUri] = useState();

  const [filename, setFilename] = useState("");
  const [downloadProgress, setDownloadProgress] = useState("0%");
  const [downloading, setDownloading ]= useState(false)
  const videoProps = {
    style: isEnabled ? styles.video : styles.none,
  };

  
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@"+value, value)
      setisStored(true)
      console.log("Se ha guardado el valor "+"@"+value)
    } catch (e) {
      alert("Ha ocurrido el siguiente eror "+e)
    }
  }


 const  removeValue = async (item) => {
    try {
      await AsyncStorage.removeItem("@"+item)
      console.log("Se ha borrado el valor "+"@"+item)
      setisStored(false)
    } catch(e) {
      alert("Ha ocurrido el siguiente eror "+e)
    }
  
    console.log('Done.')
  }
  const getData = async (item) => {
    try {
      const value = await AsyncStorage.getItem("@"+item)
      if(value !== null) {
        setisStored(true)
      }
    } catch(e) {
      alert("Ha ocurrido el siguiente eror "+e)
      setisStored(false)
    }
  }

const _download = async (url, filename)=>{
  setDownloading(true)
  Linking.openURL(url);
  setDownloading(false)
}


  
const download = async (link, filename) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  setDownloading(true)
//permission for camera_roll
  if (status === "granted") {
//store the cached file
    const file = await FileSystem.downloadAsync(
      link,
      FileSystem.documentDirectory + "MusicWave_"+filename+".mp4"
    );

//save the image in the galery using the link of the cached file
    const assetLink = await MediaLibrary.createAssetAsync(file.uri);
    setDownloading(false)
    console.log("Archivo "+file+"descargado en "+assetLink);
  }
};
    
  
     

    




useKeepAwake();

  const changeTime = async (seconds) => {
    setLoading(true)
    let seektime = (seconds / 100) * status.durationMillis;
    setTimeElapsed(seektime)
    console.log("El cambio de tiempo es" + seektime)
    await video.current.playFromPositionAsync(seektime).then(async () => { setLoading(false); })
  };

  function updateTime(seconds) {
    let seektime = (status.durationMillis / 1000) + seconds;
    setTimeElapsed(seektime)
    console.log("El cambio de tiempo es" + seektime)
    video.current.playFromPositionAsync(seektime)
  }

  function play() {
    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
    status.isPlaying ? setisAlreadyPlay(false) : setisAlreadyPlay(true)
  }

  const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" :
      "") + seconds);
  }




  React.useEffect(() => {
    MusicService.getVideo( id )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => { setLoading(false);  play(); });
  }, [id]);
  React.useEffect(() => {
    getData(data.id)
  }, [data]);


  const onStartPress = async (e) => {
    play()
    setisAlreadyPlay(true);
    setInprogress(true);
  };

  const onPausePress = async (e) => {
    setisAlreadyPlay(false);
    play()
  };

 const  getNexSong = async (data)  =>  {
    MusicService.getAll('5', slugify(data ? data : 'top' , '-'), i18n.t('region') , i18n.t('lenguaje'))
      .then((response) => response.json())
      .then((json) => setData1(json.result))
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)});
  }

  const callBack = (id) => {
    console.log(id+' from parent')
    video.current.stopAsync()
    setData([])
    navigation.setParams({ id :id })
    actionSheetRef.current?.setModalVisible(false);
    setisAlreadyPlay(true)
}

  function updateStatus(e) {
    setStatus(e)
    setDuration(millisToMinutesAndSeconds(e.durationMillis));
    let percent = Math.round((Math.floor(e.positionMillis) / Math.floor(e.durationMillis)) * 100)
    setTimeElapsed(millisToMinutesAndSeconds(e.positionMillis))
    setPercent(percent);
      if (e.didJustFinish){
        console.log(data.id)
        console.log("El video a terminado")
        console.log("El author es "+data.author)
       getNexSong(data.author)
       
        // The player has just finished playing and will stop.
        data1.map((item, index) => {
          console.log(index+" item id "+item.id)
          //And make condition here, for exemple the first element
          if(index == 3){
              //DO what u want 
              callBack(item.id)
            }
          })
        
    
    }
   
  }


 



  return (
    <SafeAreaView style={styles.container}>
    <View style={{ alignItems: 'center' }}>
      <View style={styles.titleContainer}>
        <Text style={[styles.textLight, { fontSize: 12 }]}>{i18n.t('app_name')}</Text>
        <Text style={styles.text}> {data.author}</Text>
        <AntDesign name="back" size={30} color="black" style={styles.back} onPress={() => navigation.goBack()} />
        <Foundation name="list-bullet" size={24} color="black" style={styles.list} onPress={() => navigation.navigate('PlayList', {
                  author: data.author
                })}  />
      </View>
      <ActionSheet ref={actionSheetRef} gestureEnabled={true} initialOffsetFromBottom={10}  elevation={0} headerAlwaysVisible={true} >
        <PlayListScreen parentCallback={callBack} query={data.author} />
      </ActionSheet>

      <Switch
        trackColor={{ false: '#767577', true: colors.terciary }}
        thumbColor={isPress ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
      />



      <View style={styles.coverContainer}>
        {isLoading ? <ActivityIndicator size="large" color={colors.terciary} style={{ marginTop: '20%', fontSize: 200 }} /> : (

          isEnabled ? (<></>
          ) : (<Image
            source={{
              uri: data.thumbnail_url
            }}
            style={styles.cover}
          />))}


      </View>
      <Video
        ref={video}
        source={{
          uri: data.videodirecturl,
        }}
        useNativeControls
        resizeMode="cover"
        {...videoProps}
        onLoad={() => {
          Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
        posterSourceThe={data.thumbnail_url}
        onPlaybackStatusUpdate={status => updateStatus(status)}

      />
      <View style={styles.trackname}>
        <Text style={[styles.textDark, { fontSize: 15, fontWeight: '200', margin: 5 }]}>
          {data.title}
        </Text>
      </View>
    </View>
    <View style={styles.seekbar}>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={percent}
        minimumTrackTintColor={colors.terciary}
        maximumTrackTintColor={colors.primary}
        onValueChange={(seconds) => { changeTime(seconds); }}
      />
      <View style={styles.inprogress}>
        <Text style={[styles.textLight, styles.timeStamp]}>
          {timeElapsed}
        </Text>
        <Text style={[styles.textLight, styles.timeStamp]}>
          {duration}
        </Text>
      </View>
    </View>
   <View style={{display: "flex", flexDirection: 'row',}}>
    <Pressable onPress={()=> {downloading ? Alert.alert("La descarga a comenzado") : download(data.videodirecturl, data.title)}} style={{marginLeft: 75}}>
    { downloading ?  <ActivityIndicator size="large" color={colors.terciary}  /> :  <AntDesign name="download" size={32} color={ downloading ? colors.secundary : colors.terciary}   />}
    </Pressable>
    <Pressable onPress={()=> {isStored ? removeValue(data.id) : storeData(data.id)}} style={{marginLeft: 175}}>
    { isStored ?   <AntDesign name="heart" size={30} color={colors.terciary}   /> : <AntDesign name="hearto" size={30} color={colors.terciary}  />}
    </Pressable>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity >
       <FontAwesome name="backward" size={32} color={colors.terciary} onPress={() => changeTime(percent - 1)} />
      </TouchableOpacity>


      {!isAlreadyPlay ? (
        <PlayButton onPress={isLoading ? console.log("nada") : onStartPress} state='play' />
      ) : (
        <PlayButton onPress={isLoading ? console.log("nada") : onPausePress} state='pause' />
      )}
      <TouchableOpacity >
        <FontAwesome name="forward" size={32} color={colors.terciary} onPress={() => changeTime(percent + 1)} />
      </TouchableOpacity>
    </View>
   
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  none: {
    display: 'none',
    height: 0,
    width: 0,
  },
  video: {
    width: 350,
    height: 250,
    marginTop: -250,
    borderRadius: 25,

  },
  backgroundVideo: {
    height: 1200,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },

  container: {
    flex: 1,
    backgroundColor: '#EAEAEC',
    paddingTop: 50,

  },
  textLight: {
    color: '#B6B7BF',
  },
  text: {
    color: '#8E97A6',
  },
  titleContainer: { alignItems: 'center', marginTop: 24 },
  textDark: {
    color: '#3D425C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  coverContainer: {
    marginTop: 32,
    width: 250,
    height: 250,
    shadowColor: '#5D3F6A',
    shadowOffset: { height: 15 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#3D425C',
  },
  timeStamp: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
  },
  seekbar: { margin: 32 },
  inprogress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackname: { alignItems: 'center', marginTop: 32 },
  back: { position: 'absolute', left: -90, top: 2 },
  list: { position: 'absolute', right: -90, top: 2 }
});