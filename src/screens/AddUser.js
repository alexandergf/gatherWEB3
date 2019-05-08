import React, { Component } from 'react';  
import { View, Text, TouchableHighlight, StyleSheet, TextInput} from 'react-native';
import { db } from '../config';

let addItem = state => {  
    db.ref('/Users').push({
      email: state.email,
      password: state.password,
    });    
};
let usersRef = db.ref('/Users');

export default class AddUser extends Component {  

    constructor(){
      super();
      this.state = {
        email: '',
        password: '',
        items: []
      }
    }
    
      componentDidMount() {
        usersRef.on('value', snapshot => {
          let data = snapshot.val();
          let items = Object.values(data);
          this.setState({ items });
        });
      }
      handleChange = e => {
        this.setState({
          email: e.nativeEvent.text
        });
      };
      handleChange2 = e => {
        this.setState({
          password: e.nativeEvent.text
        });
      };
      handleSubmit = () => {
        var look = false;
        this.state.items.map((item, index) => {
          if (item.email == this.state.email){
            look=true;
             alert("Usuario ya existente")
          } 
        })
        if(look == false){
          addItem(this.state);
          alert('Usuario Registrado correctamente');
        }
      };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.Textinput}
            //value={"Email"}
            onChangeText={this.handleChange} />
          <Text style={styles.inputText}>Contraseña</Text>
          <TextInput style={styles.Textinput}
            //value={"Password"}
            onChangeText={this.handleChange2} />
        </View>
        <View style={styles.iniBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submit}>
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
    margin: 20,
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  iniText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  touch: {
    padding: 20,
  },
});