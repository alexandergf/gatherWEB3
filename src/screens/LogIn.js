import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ImageBackground } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import firebase from 'firebase';  

import { db } from '../config';
//import console = require('console');

let itemsRef = db.ref('/Users');

export default class LogIn extends Component {  
      constructor(){
        super();
        this.state = {
          email: '',
          pass: '',
          items: [],
          key: '',
        }
      }
      static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: `Login`,
        };
      };
      componentDidMount() {
        itemsRef.on('value', snapshot => {
          let data = snapshot.val();
          let items = Object.values(data);
          this.setState({ items });
        });
      }
      onChangeEmail = (text) => {
        this.setState({ email: text});
      }
      onChangePass = (text) => {
        this.setState({ pass: text});
      }
      submitReg = () => {
        if(this.state.pass.length <6){
          alert("La contraseña tiene que tener 6 caracteres.");
          return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass);
      }
      submitIni = () => {
        //firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass);
        alert("Hi");
        try{
          firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass).then(function (user) {
            alert(user)
          })
        }catch (error){
          console.log(error.toString());
        }
      }

  render() {
    return (
      <ImageBackground source={require('../images/fondo.png')} style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.Textinput}
            onChangeText={this.onChangeEmail} />
          <Text style={styles.inputText}>Contraseña</Text>
          <TextInput style={styles.Textinput}
            secureTextEntry={true}
            onChangeText={this.onChangePass} />
        </View>
        <View style={styles.iniBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submitIni}>
            <Text style={styles.iniText}>INICIAR SESIÓN</Text>
          </TouchableHighlight> 
        </View>
        <View style={styles.rBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submitReg}>
            <Text style={styles.iniText}>REGISTRARSE</Text>
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
    backgroundColor: '#FF5C4F',
  },
  input: {
    textAlign: 'left',
    width: '50%',
  },
  inputText: {
    color: '#ffffff',
    opacity: 80,
  },
  Textinput: {
    padding: 3,
    backgroundColor: '#ffffff',
    color: 'grey',
  },
  iniBut: {
    borderRadius: 20,
    marginTop: 20,
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  rBut: {
    marginTop: 10,
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
  iniText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  touch: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});