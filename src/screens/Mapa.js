import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'firebase';  
import { db } from '../config';
import { Marker } from 'react-native-maps';
import {API_KEY_MAPS} from 'react-native-dotenv';
const LATITUD_DELTA = 0.0922;
const LONGITUD_DELTA = 0.0922;
let pEncRef = db.ref('/pEncuentro');
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      idGroup: this.props.navigation.getParam('g', 'NO_GRUP'),
      initialPosition: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      },
      markerPosition: {
        latitude: null,
        longitude: null,
      },
      currentUser: [],
      items: [],
    }
  }
  componentDidMount = () => {
    pEncRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      items.map((item, index) => {
        if (item.grupo == this.state.idGroup){
          this.setState({
            markerPosition: {
              latitude: item.lat,
              longitude: item.lon,
            }
          })
        } 
      })
    });
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    
    db.ref('/Users').on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
           
    });

  }
  markers = () => {
    let markers = [];
    for (let i = 0;i<this.state.items.length; i++){
      this.state.items.map((item, index) => {
        if(item.active == true && item.email != this.state.currentUser.email && item.grupo == this.state.idGroup){
          markers.push(<Marker coordinate= {this.markerFriends(item)} />);
        }
     })
    } 
    return markers;
  }
  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        initialPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUD_DELTA,
          longitudeDelta: LONGITUD_DELTA
        }
      })
    },(error) => alert(error.message),{enableHightAccuracy: true, timeout: 2000})
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUD_DELTA,
        longitudeDelta: LONGITUD_DELTA
      }
      this.setState({initialPosition: newRegion})
      db.ref('/Users/'+this.state.currentUser.uid).update({
        lat: newRegion.latitude,
        lon: newRegion.longitude,
      })
    })
  }

  marker = () => {
    return {
      latitude: this.state.markerPosition.latitude,
      longitude: this.state.markerPosition.longitude,
    }
  }
  markerFriends = (item) => {
    return {
      latitude: item.lat,
      longitude: item.lon,
    }
  }
  origin = () => {
    return {
      latitude: this.state.initialPosition.latitude,
      longitude: this.state.initialPosition.longitude,
    }
  }

  render = () => {
    return (
        <View style={styles.container}>
        {this.state.initialPosition.latitude ? <MapView
        style={styles.map}
        region={this.state.initialPosition}
        showsUserLocation={true}
        followsUserLocation={true}
        >
        {this.markers()}
        {this.state.markerPosition.longitude ? 
        <MapViewDirections
          origin={this.origin()}
          destination={this.marker()}
          apikey={API_KEY_MAPS}
          strokeWidth={3}
          strokeColor="hotpink"
          />: null }
          {this.state.markerPosition.longitude ? <Marker coordinate= {this.marker()} /> : null} 
        </MapView> : null }
        
        <View style={styles.bottomMap}>
          <View style={styles.grup}>
            <Text style={styles.grupText}>GRUPO: {this.state.idGroup}</Text>
            <TouchableHighlight style={styles.gTouch} onPress={()=>this.props.navigation.navigate('GestionarMiembros',{group: this.state.idGroup})}>
              <Text style={styles.gText}>GESTIONAR GRUPO</Text>
            </TouchableHighlight> 
          </View>
          <View style={styles.savePoint}>
            <TouchableHighlight style={styles.spTouch} onPress={() => this.props.navigation.navigate('PuntoEncuentro',{g: this.state.idGroup})}>
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
      flex: 1,
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