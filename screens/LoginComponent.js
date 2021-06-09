import React from 'react';
import { Text , View,ImageBackground} from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AntDesign } from '@expo/vector-icons';
import colors from '../consts/styles.json'
import  i18n  from '../consts/traslations';



export default class AuthScreen extends React.Component {

 
  
  state = { user: null };
  
  componentDidMount() {
    this.initAsync();
  }

   initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
     // clientId: '<YOUR_IOS_CLIENT_ID>',
    });
    _syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return (
      
         <Text onPress={this.onPress} style={{color: 'white', fontSize: 25, textAlign: 'center'}}> <AntDesign  onPress={this.onPress} name="google" style={{textAlign:'center'}}size={54} color={colors.terciary} /> {i18n.t('signin')}</Text>
 
      
   
    )
  }
}