import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      idGroup: this.props.navigation.getParam('g', 'NO_GRUP'),
    }
  }
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
        <View style={styles.bottomMap}>
          <View style={styles.grup}>
            <Text style={styles.grupText}>GRUPO: {this.state.idGroup}</Text>
            <TouchableHighlight style={styles.gTouch} onPress={()=>this.props.navigation.navigate('GestionarMiembros',{group: this.state.idGroup})}>
              <Text style={styles.gText}>GESTIONAR GRUPO</Text>
            </TouchableHighlight> 
          </View>
          <View style={styles.savePoint}>
            <TouchableHighlight style={styles.spTouch} onPress={() => this.props.navigation.navigate('PuntoEncuentro')}>
              <Text style={styles.savePointText}>CREAR PUNTO DE ENCUENTRO</Text>
            </TouchableHighlight> 
          </View>
        </View>
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
    bottomMap: {
      
    },
    grup: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    grupText: {
      marginRight: 15,
      color: '#fff',
    },
    gTouch: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      paddingHorizontal: 12,
      paddingVertical: 7

    },
    gText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 11
    },
    savePoint: {
      marginTop: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    spTouch: {
      paddingVertical: 20,
      paddingHorizontal: 80
    },
    savePointText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 11
    }
   });