/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Image,TouchableHighlight} from 'react-native';

import { db } from '../config';
let addGrup = state => {  
  db.ref('/Users/-LdoQkDPwIkKpBU8vFtB').set({
    email: state.email,
    password: state.password,
    grupo: state.id
  });
};
let groupRef = db.ref('/Group');
export default class UnirseGrupo extends Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      id: '',
      items: []
    }
  }
  
  componentDidMount() {
    groupRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }
  handleChange = e => {
    this.setState({
      id: e.nativeEvent.text
    });
  };
  submit = () => {
    var look = false;
    this.state.items.map((item, index) => {
      if (item.id == this.state.id){
        look=true;
      } 
    })
    if(look == true){
      addGrup(this.state);
      alert('Usuario añadido correctamente');
    } else {
      alert('Grupo no existente');
    }
  };
  render() {
    return (
      <View style={styles.container}>
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
      </View>
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