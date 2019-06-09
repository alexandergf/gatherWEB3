import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ImageBackground } from 'react-native';
import firebase from 'firebase';  
import { db } from '../config';

export default class LogIn extends Component {  
      constructor(){
        super();
        this.state = {
          email: '',
          pass: '',
        }
      }
      onChangeEmail = (text) => {
        this.setState({ email: text});
      }
      onChangePass = (text) => {
        this.setState({ pass: text});
      }
      submitReg = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass)
        .then((res) => {
          this.onRegSuccess(res.user.uid);
        })
        .catch((error) => {
          this.onLoginFailure(error);
        });
      }
      submitIni = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(()=>this.onLoginSuccess())
        .catch((error) => {
          this.onLoginFailure(error);
        });        
      }
      onLoginSuccess = () => {
        this.props.navigation.replace('Loading',{user: this.state.email});
      }
      onRegSuccess = (id) => {
        db.ref('Users/'+id).set({
          email: this.state.email,
          grupo: '',
          active: false,
          admin: false,
        }); 
        this.props.navigation.replace('HomeLogIn');
      }
      onLoginFailure = (errorMessage) => {
        alert(errorMessage);
      }
  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#fff'
  },
  input: {
    textAlign: 'left',
    width: '80%',
  },
  inputText: {
    color: 'rgb(255, 41, 57)',
    opacity: 80,
  },
  Textinput: {
    padding: 3,
    backgroundColor: '#ffffff',
    borderColor: 'rgb(255, 41, 57)',
    borderWidth: 0.5,
    marginBottom: 15,
  },
  iniBut: {
    borderRadius: 10,
    marginTop: 50,
    width: '80%',
    backgroundColor: 'rgb(255, 41, 57)',
  },
  rBut: {
    marginTop: 10,
    width: '80%',
    backgroundColor: 'rgb(255, 41, 57)',
    borderRadius: 10,
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