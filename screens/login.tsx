import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,ImageBackground} from 'react-native';
import  i18n  from '../consts/traslations';
import colors from '../consts/styles';
import LoginComponent from './LoginComponent';




export default function LoginScreen (){
 

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/background.jpg')} style={{flex: 1,
        resizeMode: "cover",
        justifyContent: "center", width: 500}}>
        <Text style={styles.logo}>{i18n.t('app_name')}</Text>
        <LoginComponent/>
        </ImageBackground>
      </View>
    );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"white",
    marginBottom:40,
    textAlign:'center'
  },
  inputView:{
    width:"80%",
    backgroundColor:colors.secundary,
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:colors.secundary,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
})