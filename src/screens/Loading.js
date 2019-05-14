import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'firebase';  
import { db } from '../config';
import { Navigation } from 'react-navigation';
let userRef = db.ref('/Users');
export default class Loading extends Component {  
  constructor(){
    super();
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    
    firebase.auth().onAuthStateChanged(user => {
      //this.props.navigation.replace(user==null ? 'Home' : 'HomeLogIn')
      if(user == null){
        this.props.navigation.replace('Home')
      } else {
        userRef.on('value', snapshot => {
          let data = snapshot.val();
          let items = Object.values(data);
          var look = false;
          items.map((item, index) => {
            if (user.email == item.email && item.active == true){
              look=true;
              this.props.navigation.replace('Mapa');
            } 
          })
          if (look == false){
            this.props.navigation.replace('HomeLogIn');
          }
        });
      }
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