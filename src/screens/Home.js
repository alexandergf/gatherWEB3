import React, { Component } from 'react';
import {ImageBackground, Button, View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

export default class Home extends Component {
    static navigationOptions = () => {
        return {
            //headerTitleStyle: { alignSelf: 'center' },
            headerTitleStyle: { 
                textAlign:"center", 
                flex:1 
            },
            title: 'Gather',
        };
      };
  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require ('../images/Logo.png')} />
            <View style={styles.butt}>
                <TouchableHighlight style={styles.iTouch} onPress={() => this.props.navigation.navigate('LogIn')}>
                    <Text style={styles.iniText}>EMPEZAR</Text>
                </TouchableHighlight> 
            </View> 
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#fff'
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    butt: {
        margin: 20,
        width: '50%',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    },
    iniText: {
        textAlign: 'center',
        color: '#ffffff',
    },
    iTouch: {
        padding: 20,
    },
    rTouch: {
        padding: 20,
    },
  });
