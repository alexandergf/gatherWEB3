import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'firebase';  
import { db } from '../config';
import { Navigation } from 'react-navigation';
export default class Loading extends Component {  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.replace(user==null ? 'Home' : 'HomeLogIn')
    })
  }   
 
  render() {
    return (
      <ImageBackground source={require('../images/fondo.png')} style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#FF5C4F',
  },
});