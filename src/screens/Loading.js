import React, { Component } from 'react';  
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';  
import { db } from '../config';
import { navigation } from 'react-navigation';
let userRef = db.ref('/Users');
export default class Loading extends Component {  
  constructor(props){
    super(props);
    this.state = {
      items: [],
      comprueba: this.props.navigation.getParam('user', 'NO_USER'),
    }
  }
  static navigationOptions = () => {
    return{
    headerTitleStyle: { 
      alignSelf:'center', 
      color: '#FFF',
      textAlign:'center',
      marginLeft: 151,
      //justifyContent: 'space-between',
    },
  }
  }
  componentWillMount() {
    if(this.state.comprueba == 'NO_USER'){
      firebase.auth().onAuthStateChanged(user => {
        if(user == null){
          this.props.navigation.replace('Home')
        } else {
          this.check(user.email);
        }
      })
    } else {
      this.check(this.state.comprueba);
    }
  }   

  check = (user) => {
    userRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      var look = false;
      items.map((item, index) => {
        if (user == item.email && item.active == true){
          look=true;
          this.props.navigation.replace('Mapa',{g: item.grupo});
        } 
      })
      if (look == false){
        this.props.navigation.replace('HomeLogIn');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadText} >Loading</Text>
        <ActivityIndicator size="large" color="rgb(255, 41, 57)" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#FFF',
  },
  loadText: {
    color: 'rgb(255, 41, 57)'
  }
});