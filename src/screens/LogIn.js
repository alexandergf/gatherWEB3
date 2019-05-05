import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../config';

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
      submit = () => {
        if(this.state.items.length > 0){
          var look = true;
          this.state.items.map((item, index) => {
            alert(item.id);
            if (item.email == this.state.email && item.password == this.state.pass){
              look = false;
              this.props.navigation.navigate('HomeLogIn',{email:this.state.email})
            } 
          })
          if (look == true){
            alert("Usuario o contraseña incorrecta")
          }
        } else {
          alert("No items")
        }
      }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.Textinput}
            //value={"Email"}
            onChangeText={this.onChangeEmail} />
          <Text style={styles.inputText}>Contraseña</Text>
          <TextInput style={styles.Textinput}
            //value={"Password"}
            onChangeText={this.onChangePass} />
        </View>
        <View style={styles.iniBut}>
          <TouchableHighlight style={styles.touch} onPress={this.submit}>
            <Text style={styles.iniText}>INICIAR SESIÓN</Text>
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