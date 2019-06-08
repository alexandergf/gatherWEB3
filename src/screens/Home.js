import React, { Component } from 'react';
import {ImageBackground,View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            header: null,
        };
      };
  render() {
    return (
        <ImageBackground style={styles.container} source={require('../images/background.jpg')}>
            <Image style={styles.logo} source={require ('../images/Logo.png')} />
            <View style={styles.butt}>
                <TouchableHighlight style={styles.iTouch} onPress={() => this.props.navigation.navigate('LogIn')}>
                    <Text style={styles.iniText}>EMPEZAR</Text>
                </TouchableHighlight> 
            </View> 
        </ImageBackground>
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
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 5,
    },
    iniText: {
        textAlign: 'center',
        color: 'rgb(255,0,0)',
    },
    iTouch: {
        padding: 20,
    },
    rTouch: {
        padding: 20,
    },
  });
