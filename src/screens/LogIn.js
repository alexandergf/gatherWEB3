import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ImageBackground } from 'react-native';
import firebase from 'firebase';  
import { db } from '../config';
let addItem = state => {  
  db.ref('/Users').push({
    email: state.email,
    grupo: '',
    active: false,
    admin: false,
  });    
};

export default class LogIn extends Component {  
      constructor(){
        super();
        this.state = {
          email: '',
          pass: '',
        }
      }
      static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: `Login`,
        };
      };
      onChangeEmail = (text) => {
        this.setState({ email: text});
      }
      onChangePass = (text) => {
        this.setState({ pass: text});
      }
      submitReg = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass)
        .then(this.onRegSuccess())
        .catch((error) => {
          this.onLoginFailure(error);
        });
      }
      submitIni = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(this.onLoginSuccess())
        .catch((error) => {
          this.onLoginFailure(error);
        });        
      }
      onLoginSuccess = () => {
        this.props.navigation.replace('HomeLogIn')
      }
      onRegSuccess = () => {
        addItem(this.state);
        this.props.navigation.replace('HomeLogIn')
      }
      onLoginFailure = (errorMessage) => {
        alert(errorMessage);
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
    resizeMode: 'cover',
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