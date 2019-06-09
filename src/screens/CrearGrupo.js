import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ImageBackground,TouchableHighlight} from 'react-native';
import { db } from '../config';
import firebase from 'firebase';  
import { YellowBox } from 'react-native'; 

let addGrup = (state) => {  
    db.ref('/Group').push({
      name: state.name,
      id: state.id,
    });
};
let addPoint = (state) => {
  db.ref('/pEncuentro').push({
    grupo: state.id,
    lat: null,
    lon: null
  });
};
let groupRef = db.ref('/Group');

let modifyUser = (state) => {
    db.ref('/Users/'+state.currentUser.uid).update({
      active: true,
      admin: true,
      grupo: state.id
    })
}
YellowBox.ignoreWarnings(['warningWithoutStack']);
export default class CrearGrupo extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      id: 0,
      items: [],
      user: [],
      currentUser: [],
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
      addPoint(this.state);
      modifyUser(this.state);
      alert('Grupo Registrado correctamente');
      this.props.navigation.replace('Mapa',{g: this.state.id,user: this.state.name});
    }
  };

  componentDidUpdate = () => {
    if(this.state.items.length > 0){
      this.state.items.map((item, index) => {
        if (item.id > this.state.id){
          this.setState({
            id: item.id+1
          });
        } 
      })
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>Nombre del grupo:</Text>
          <TextInput style={styles.Textinput1}
            onChange={this.handleChange} />
          <Text style={styles.inputText}>Id del grupo:</Text>
          <TextInput style={styles.Textinput}
            value={this.state.id.toString()}  editable={false} />
        </View>
        <View style={styles.cBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submit}>
            <Text style={styles.cText}>CREAR GRUPO</Text>
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
      backgroundColor: '#FFF'
    },
    input: {
      textAlign: 'left',
      width: '80%',
    },
    inputText: {
      color: 'rgb(255, 41, 57)',
      opacity: 0.8,
      marginTop: 5,
      marginBottom: 5,
    },
    Textinput: {
      padding: 3,
      backgroundColor: '#ffffff',
      color: 'grey',
      textAlign: 'center',
      borderWidth: 0.5,
      borderColor: 'rgb(255, 41, 57)',
    },
    Textinput1: {
      padding: 3,
      backgroundColor: '#ffffff',
      color: 'grey',
      textAlign: 'left',
      borderWidth: 0.5,
      borderColor: 'rgb(255, 41, 57)',
    },
    cBut: {
      margin: 20,
      width: '60%',
      backgroundColor: 'rgb(255, 41, 57)',
      borderRadius: 5,
    },
    cText: {
      textAlign: 'center',
      color: '#ffffff',
    },
    touch: {
      padding: 20,
    },
  });