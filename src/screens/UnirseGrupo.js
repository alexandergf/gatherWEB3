/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ImageBackground,TouchableHighlight} from 'react-native';
import firebase from 'firebase'; 
import { db } from '../config';
let modifyUser = (state) => {
  db.ref('/Users/'+state.currentUser.uid).update({
    grupo: state.idGroup
  })
}
let groupRef = db.ref('/Group');
export default class UnirseGrupo extends Component{
  constructor(){
    super();
    this.state = {
      idGroup: '',
      currentUser: [],
      items: []
    }
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    groupRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }
  handleChange = e => {
    this.setState({
      idGroup: e.nativeEvent.text
    });
  };
  submit = () => {
    var look = false;
    this.state.items.map((item, index) => {
      if (item.id == this.state.idGroup){
        look=true;
        modifyUser(this.state);
        alert('Peticion enviada correctamente.');
        this.props.navigation.replace('HomeLogIn');
      } 
    })
    if(look == false){
      alert("Id de grupo no existente")
    }
  };
  render() {
    return (
      <ImageBackground source={require('../images/fondo.png')} style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>Id del grupo:</Text>
          <TextInput style={styles.Textinput}
            onChange={this.handleChange}
             />
        </View>
        <View style={styles.uBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submit}>
            <Text style={styles.uText}>UNIRSE AL GRUPO</Text>
          </TouchableHighlight> 
        </View>
      </ImageBackground>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      resizeMode: 'cover',
    },
    input: {
      textAlign: 'left',
      width: '50%',
    },
    inputText: {
      color: '#ffffff',
      opacity: 0.8,
      marginTop: 5,
      marginBottom: 5,
    },
    Textinput: {
      padding: 3,
      backgroundColor: '#ffffff',
      color: 'grey',
      textAlign: 'center',
    },
    uBut: {
      margin: 20,
      width: '40%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    uText: {
      textAlign: 'center',
      fontSize: 12,
      color: '#ffffff',
    },
    touch: {
      padding: 20,
    },
  });