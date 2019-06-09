import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { db } from '../config';
let itemsRef = db.ref('/Users');
export default class GestionarMiembros extends Component {
    constructor(props){
      super(props);
      this.state = {
        items: [],
        name: null,
        idGrupo: this.props.navigation.getParam('group', 'NO_GRUP'),
      }
    }
    componentDidMount() {
      itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      });
    }
    onChangeName = (text) => {
      this.setState({ name: text});
    }
    submit = () => {
      let boo = true;
      this.state.items.map((item,index) => {
        if(this.state.name == item.email && item.active == false && item.grupo == ''){
          boo=false;
          db.ref('/Users').on('value', snapshot => {
            let data = snapshot.val();
            Object.keys(data).forEach(key => {
              if(data[key].email == this.state.name){
                db.ref('/Users/'+key).update({
                  grupo: this.state.idGrupo,
                })
              }
            });
            
          });
          this.props.navigation.replace('GestionarMiembros',{group: this.state.idGrupo});
        }
        if(index == (this.state.items.length -1 ) && boo == true){
          alert('Usuario no encontrado');
        }
      })
    }
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.listaMiembros}>
              <Text style={styles.title}>Invitar amigos</Text>
            </View>
            <View style={styles.cGrup}>
              <Text style={styles.inputText}>Amigo</Text>
              <TextInput style={styles.Textinput}
                onChangeText={this.onChangeName} />
              <TouchableHighlight style={styles.cTouch} onPress={()=>this.submit()}>
                <Text style={styles.cText}>INVITAR AMIGOS AL GRUPO</Text>
              </TouchableHighlight>
            </View>
          </View>
          );
        }
      }
      
      const styles = StyleSheet.create({
        container: {
          alignItems: 'center',
          //justifyContent: 'center',
          height: '100%',
          backgroundColor: '#FFF',
        },
        title: {
          marginTop: 20,
          marginBottom: 25,
          fontSize: 22,
          fontWeight: 'bold',
          color: 'rgb(255, 41, 57)',
          fontFamily: 'Proxima-Net'
        },
        list: {
          height: '50%',
          
        },
        cGrup: {
          width: '80%',
          
        },
        cTouch: {
          padding: 20,
          backgroundColor: 'rgb(255, 41, 57)',
          borderRadius: 5,
        },
        cText: {
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'Proxima-Net'
        },
        inputText: {
          color: 'rgb(255, 41, 57)',
          fontFamily: 'Proxima-Net'
        },
        Textinput: {
          padding: 3,
          backgroundColor: '#ffffff',
          borderColor: 'rgb(255, 41, 57)',
          borderWidth: 0.5,
          marginBottom: 20,
          fontFamily: 'Proxima-Net'
        },
      });
