import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity,Image } from 'react-native';
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
  static navigationOptions = ({navigation}) => {
    return {
        headerLeft: (
          <TouchableOpacity style={styles.ImageIconStyle} activeOpacity={0.5} onPress={() => {
            Alert.alert(
              'Cerrar sesión',
              'Estás seguro de que quieres cerrar la sesión?',
              [
                {
                  text: 'NO',
                  onPress: ()=> console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'SI',
                  onPress: () => {
                    firebase.auth().signOut().then(function() {
                        () =>alert('Sign out succesfully.');
                        navigation.replace('Home')
                      }
                    ).catch(function(error) {
                      alert(error);
                    });
                  }
                },
                {cancelable: false},
              ]
            );
          }}>
              <Image
              source={require('../images/signOut.png')}
              style={styles.ImageIconStyle}
              />
          </TouchableOpacity>
        ),
    };
  };
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }
    render() {
        return (
          <View style={styles.container}>
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
          backgroundColor: 'rgb(255, 41, 57)',
          borderRadius: 10,
        },
        uTouch: {
          padding: 20,
          backgroundColor: 'rgb(255, 41, 57)',
          borderRadius: 10,
        },
        cText: {
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'Proxima-Net'
        },
        uText: {
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'Proxima-Net'
        },
        ImageIconStyle: {
          width: 30,
          height: 30,
          marginLeft: 10
        }
      });
