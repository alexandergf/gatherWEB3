import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import MapView from 'react-native-maps';


export default class PuntoEncuentro extends Component {
  
  render() {
    return (
        <View style={styles.container}>
        <MapView
        style={styles.map}
        region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        >
        </MapView>
        
          <Image style={styles.camera} source={require ('../images/camera-logo.png')} />
          
        
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#FF5C4F',
      alignItems: 'center',
    },
    map: {
      height: '65%',
      width: '95%',
      margin: 2,
      marginTop: 5,
      backgroundColor: '#999'
    },
    camera: {
      flex: 1,
      width: 100,
      height: 100,
      resizeMode: 'contain'
    }
   });