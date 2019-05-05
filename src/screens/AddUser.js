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
      <View style={styles.main}>
        <Text style={styles.title}>Add User</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TextInput style={styles.itemInput} onChange={this.handleChange2} secureTextEntry={true} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({  
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
});