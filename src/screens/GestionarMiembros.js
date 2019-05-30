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
      }
    }
    componentDidMount() {
      itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      });
    }
    render() {
        return (
          <View style={styles.container}>
          <View style={styles.listaMiembros}>
            <Text style={styles.title}>GESTIONAR MIEMBROS</Text>
            <View style={styles.list}>
            {this.state.items.length > 0 ? (
                <ItemComponent items={this.state.items} grupo={this.state.idGrupo} name={this.state.email}/>
              ) : (
                <Text>No items</Text>
              )}
            </View>
          </View>
            <View style={styles.cGrup}>
              <TouchableHighlight style={styles.cTouch} onPress={()=>this.props.navigation.navigate('invitaFriends',{group: this.state.idGrupo})}>
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
          backgroundColor: '#FF5C4F',
        },
        title: {
          marginTop: 20,
          marginBottom: 25,
          fontSize: 22,
          fontWeight: 'bold',
          color: '#fff'
        },
        list: {
          height: '50%',
          
        },
        cGrup: {
          width: '60%',
          
        },
        cTouch: {
          padding: 20,
          backgroundColor: 'rgba(255,255,255,0.3)',
        },
        cText: {
          textAlign: 'center',
          color: '#ffffff',
        },
      });
