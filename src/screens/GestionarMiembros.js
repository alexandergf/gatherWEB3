import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from '../config';
let itemsRef = db.ref('/Users');
export default class GestionarMiembros extends Component {
    constructor(props){
      super(props);
      this.state = {
        items: [],
        idGrupo: this.props.navigation.getParam('group', 'NO_GRUP'),
        email: this.props.navigation.getParam('email', 'NO_EMAIL'),
        admin: this.props.navigation.getParam('admin', 'NO_ADMIN'),
      }
    }
    componentDidMount() {
      itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      });
    }

    exit = () => {
      if(this.state.admin == false){
        db.ref('/Users').on('value', snapshot => {
          let data = snapshot.val();
          Object.keys(data).forEach(key => {
            if(data[key].grupo == this.state.idGrupo && this.state.email == data[key].email){
              db.ref('/Users/'+key).update({
                active: false,
                grupo:null,
              });
              this.props.navigation.replace('HomeLogIn');
            }
          });
        });
      }else{
        alert('Para dejar el grupo primero deja de ser administrador.');
      }
      
    }
    render() {
        return (
          <View style={styles.container}>
          <View style={styles.listaMiembros}>
            <Text style={styles.title}>GESTIONAR MIEMBROS</Text>
            <View style={styles.list}>
            {this.state.items.length > 0 ? (
                <ItemComponent items={this.state.items} grupo={this.state.idGrupo} name={this.state.email} admin={this.state.admin} />
              ) : (
                <Text>No items</Text>
              )}
            </View>
          </View>
            <View style={styles.cGrup}>
              <TouchableHighlight style={styles.cTouch} onPress={()=>this.props.navigation.navigate('invitaFriends',{group: this.state.idGrupo})}>
                <Text style={styles.cText}>INVITAR AMIGOS AL GRUPO</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.cTouch} onPress={()=>this.exit()}>
                <Text style={styles.cText}>SALIR DEL GRUPO</Text>
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
          color: 'rgb(255, 41, 57)'
        },
        list: {
          height: '50%',
          width: '80%',
          
        },
        cGrup: {
          width: '70%',
          
        },
        cTouch: {
          marginBottom: 15,
          padding: 20,
          backgroundColor: 'rgb(255, 41, 57)',
          borderRadius: 5,
        },
        cText: {
          textAlign: 'center',
          color: '#ffffff',
        },
      });
