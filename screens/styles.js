import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from '../consts/styles.json'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default StyleSheet.create({
  image_playlist:{
    width: 100,
    height: 100,
    borderRadius: 25,
    margin: 5,
  },
 
      app_name:{
        fontWeight: 'bold',
        fontSize: 20,
        position: 'absolute',
        left: 20,
        top:-50
     
      },
      
      home_container:{
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 120,
        backgroundColor: 'white',
        zIndex:1,
      
      },
    
      home_profile:{
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        right: 20,
        top:-50
      },
      container: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
     
      },
      
      item: {
        width: 400,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbf3fa',
      },
      main_scroller:{
        width:400, height:250, borderRadius: 15, margin: 5,
      },
      images:{
        width:200, height:100, borderRadius: 15, margin: 5, 
      },
      
      scroller: {
        marginTop: 50,
      
      },
      text:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
      },
      text1:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
      },
      text2:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 50,
      },
      in:{
        position:'absolute',
        top: 50,
        display: 'flex',
        flexDirection: 'row'

      },
      main1:{
        width: '90%',

      },
      texto:{
        borderColor: colors.terciary,
        borderWidth : 2,
        height: 50,
        width: '90%',
        borderRadius: 10,
        padding: 5,
      },
      play: {
        position: 'absolute',
        top: '25%',
        left: '40%',
        alignItems: 'center',
        zIndex:1,
        opacity: 0.8
      }
     
});