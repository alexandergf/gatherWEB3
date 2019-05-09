/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ImageBackground,TouchableHighlight} from 'react-native';
import { db } from '../config';

let addGrup = (state) => {  
    db.ref('/Group').push({
      name: state.name,
      id: state.id,
      admin: state.email,
    });
};
let groupRef = db.ref('/Group');
export default class CrearGrupo extends Component{

  constructor(){
    super();
    this.state = {
      name: '',
      id: 0,
      items: [],
      email: this.props.navigation.getParam(email, 'No email'),
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
      name: e.nativeEvent.text
    });
  };
  submit = () => {
    var look = false;
    this.state.items.map((item, index) => {
      if (item.name == this.state.name && item.id == this.state.id){
        look=true;
         alert("Nombre o id ya existentes")
      } 
    })
    if(look == false){
      addGrup(this.state);
      alert('Grupo Registrado correctamente');
    }
  };
  render() {
    if(this.state.items.length > 0){
      this.state.items.map((item, index) => {
        if (item.id > this.state.id){
          this.setState({
            id: item.id+1
          });
        } 
      })
    }
    return (
      <ImageBackground source={require('../images/fondo.png')}  style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>Nombre del grupo:</Text>
          <TextInput style={styles.Textinput}
            onChange={this.handleChange} />
          <Text style={styles.inputText}>Id del grupo:</Text>
          <TextInput style={styles.Textinput}
            value={this.state.id.toString()} />
        </View>
        <View style={styles.cBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submit}>
            <Text style={styles.cText}>CREAR GRUPO</Text>
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
    cBut: {
      margin: 20,
      width: '40%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    cText: {
      textAlign: 'center',
      color: '#ffffff',
    },
    touch: {
      padding: 20,
    },
  });