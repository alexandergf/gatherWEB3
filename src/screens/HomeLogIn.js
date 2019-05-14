import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import firebase from 'firebase';  
import { db } from '../config';
import navigation from 'react-navigation';
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: []
    }
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    //alert(this.state.currentUser.uid);
    //alert(this.state.currentUser)
    //<Text>Hi! {this.state.currentUser.uid}</Text>
  }
  signoutFunc = () => {
    firebase.auth().signOut().then(
     //alert('Sign out succesfully.')
      this.signOutSuccess()
    ).catch(function(error) {
      alert(error);
    });  
  }
  signOutSuccess = () => {
    alert('Sign out succesfully.')
    this.props.navigation.replace('Loading')
  }
    render() {
        return (
          <ImageBackground source={require('../images/fondo.png')} style={styles.container}>
            <View style={styles.cGrup}>
              <TouchableHighlight style={styles.cTouch} onPress={() => this.props.navigation.navigate('CrearGrupo')}>
                <Text style={styles.cText}>CREAR GRUPO</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.uGrup}>
              <TouchableHighlight style={styles.uTouch} onPress={() => this.props.navigation.navigate('UnirseGrupo')}>
                <Text style={styles.uText}>UNIRSE A GRUPO</Text>
              </TouchableHighlight>
            </View>
            <Button onPress={this.signoutFunc} title="Sign Out" />
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
