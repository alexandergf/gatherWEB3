import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: props.navigation.getParam('email', 'no em')
    }
  }
  
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.cGrup}>
              <TouchableHighlight style={styles.cTouch} onPress={() => this.props.navigation.navigate('CrearGrupo',{email:this.state.email})}>
                <Text style={styles.cText}>CREAR GRUPO</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.uGrup}>
              <TouchableHighlight style={styles.uTouch} onPress={() => this.props.navigation.navigate('UnirseGrupo',{email:this.state.email})}>
                <Text style={styles.uText}>UNIRSE A GRUPO</Text>
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
        cGrup: {
          width: '50%',
          margin: 10,
        },
        uGrup: {
          width: '50%',
          margin: 10,
        },
        cTouch: {
          padding: 20,
          backgroundColor: 'rgba(255,255,255,0.3)',
        },
        uTouch: {
          padding: 20,
          backgroundColor: 'rgba(255,0,0,1)',
        },
        cText: {
          textAlign: 'center',
          color: '#ffffff',
        },
        uText: {
          textAlign: 'center',
          color: '#ffffff',
        },
      });
