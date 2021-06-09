import React from 'react';
import {  Text, View,Image,ScrollView } from 'react-native';
import styles from "./styles.js";
import  i18n  from '../consts/traslations';
import slugify  from 'slugify'; 
//compoennts
import ListComponent from './list'

export default function  DiscoverScreen(){
 return  (
      <View style={styles.container}>
        <Text  style={styles.text1}>{i18n.t('categorias')}</Text>
        <ScrollView  > 
        <ScrollView style={{marginBottom: 150}}>
        <ListComponent title={i18n.t('blues')} cantidad='20' busqueda={slugify(i18n.t('blues'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('bachata')} cantidad='20' busqueda={slugify(i18n.t('bachata'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('clasical')} cantidad='20' busqueda={slugify(i18n.t('clasical'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('country')} cantidad='20' busqueda={slugify(i18n.t('country'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('dance')} cantidad='20' busqueda={slugify(i18n.t('dance'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('electronic')} cantidad='20' busqueda={slugify(i18n.t('electronic'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('flamenco')} cantidad='20' busqueda={slugify(i18n.t('flamenco'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('heavy_metal')} cantidad='20' busqueda={slugify(i18n.t('heavy_metal'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('hip_hop')} cantidad='20' busqueda={slugify(i18n.t('hip_hop'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('house')} cantidad='20' busqueda={slugify(i18n.t('house'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('jaz')} cantidad='20' busqueda={slugify(i18n.t('jaz'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('latin')} cantidad='20' busqueda={slugify(i18n.t('latin'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('merenge')} cantidad='20' busqueda={slugify(i18n.t('merenge'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('pop')} cantidad='20' busqueda={slugify(i18n.t('pop'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('rap')} cantidad='20' busqueda={slugify(i18n.t('rap'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('regaeton')} cantidad='20' busqueda={slugify(i18n.t('regaeton'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('rock')} cantidad='20' busqueda={slugify(i18n.t('rock'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('salsa')} cantidad='20' busqueda={slugify(i18n.t('salsa'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        <ListComponent title={i18n.t('tecno')} cantidad='20' busqueda={slugify(i18n.t('tecno'), '-')} region={i18n.t('region')} lang={i18n.t('lenguaje')}/>
        </ScrollView>
        </ScrollView>
      </View>
    );
  
}