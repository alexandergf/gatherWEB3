import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

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
            <View style={styles.butt}>
                <TouchableHighlight style={styles.iTouch} onPress={() => this.props.navigation.navigate('LogIn')}>
                    <Text style={styles.iniText}>INICIAR SESIÓN</Text>
                </TouchableHighlight> 
            </View> 
            <View style={styles.butt}>   
                <TouchableHighlight style={styles.rTouch} onPress={() => this.props.navigation.navigate('AddUser')}>
                    <Text style={styles.iniText}>REGISTRARSE</Text>
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
        backgroundColor: '#FF5C4F',
    },
    butt: {
        margin: 20,
        width: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
