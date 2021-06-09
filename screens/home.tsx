import React from 'react';
import {  Text, View,Image,ScrollView } from 'react-native';
import styles from "./styles.js";
import  i18n  from '../consts/traslations';
import colors from '../consts/styles.json'
import CarouselScreen from './carrousel'
import * as GoogleSignIn from 'expo-google-sign-in';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//compoennts
import ListComponent from './list'


export default function  HomeScreen (){

  const user = GoogleSignIn.getCurrentUser()

 return  (
      <View >
        <View style={styles.home_container}>
        <Text style={styles.app_name}>{i18n.t('welcome')}{user ? user.firstName: 'Anonimo'}  <MaterialCommunityIcons name="music" size={30} color={colors.secundary} /></Text>
        <Image 
        style={styles.home_profile}
        source={{
          uri: `${ user ? user.photoURL : 'https://www.pngkey.com/png/detail/121-1219160_small-facebook-no-profile-picture-girl.png'}`,
        }} />
        </View>
        <ScrollView  > 
        <CarouselScreen/>
        <ScrollView style={{marginBottom: 150}}>
        <ListComponent title={i18n.t('populares')} cantidad='20' busqueda={i18n.t('populares')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('most')} cantidad='20' busqueda={i18n.t('most_slug')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('last')} cantidad='20' busqueda={i18n.t('last_slug')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('trendign')} cantidad='20' busqueda={i18n.t('trending_slug')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('recomendado')} cantidad='20' busqueda={i18n.t('recomendado_slug')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        </ScrollView>
        </ScrollView>
      </View>
    );
  
}