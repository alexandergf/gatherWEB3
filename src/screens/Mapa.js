import React, { Component } from 'react';
import { Alert,View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
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
      admin: false,
      flag: this.props.navigation.getParam('flag', 'NO_FLAG'),
      user: this.props.navigation.getParam('user', 'NO_USER'),
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
                    firebase.auth().signOut().then(
                      () =>alert('Sesión cerrada correctamente.'),
                      navigation.replace('Home')
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

  infoUser = () => {
    db.ref('/Users').on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      items.map((item, index) => {
        if(item.admin == true && item.email == this.state.user){
          this.setState({admin: true});
        }
     })
    });
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
    this.setState({ currentUser });
    this.infoUser();
    db.ref('/Users').on('child_changed', snapshot => {
      var changedPost = snapshot.val();

      this.infoUser();
    })
  }

  markers = () => {
    let markers = [];
      this.state.items.map((item, index) => {
        if(item.active == true && item.email != this.state.currentUser.email && item.grupo == this.state.idGroup){
          markers.push(<Marker coordinate= {this.markerFriends(item)} title={item.email} key={item.email+index} icon={require('../images/user.png')} /*pinColor={'violet'}*/ />);
        }
     })
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
    },(error) => alert(error.message),{enableHightAccuracy: true, timeout: 2000});
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
    });
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
  adminbtn = () => {
    return(
      <TouchableHighlight style={styles.gTouch} onPress={()=>this.props.navigation.navigate('GestionarMiembros',{group: this.state.idGroup, email: this.state.currentUser.email, admin: this.state.admin})}>
        <Text style={styles.gText}>GESTIONAR GRUPO</Text>
      </TouchableHighlight>
    );
  }
  render = () => {
    if(this.state.flag == true && this.state.flag != 'NO_FLAG'){
      this.setState({
        admin: false,
      });
    }
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
            {this.adminbtn()}
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
      backgroundColor: '#FFF',
      alignItems: 'center',
    },
    map: {
      //flex: 1,
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
      color: 'rgb(255, 41, 57)',
      fontFamily: 'Proxima-Net'
    },
    gTouch: {
      backgroundColor: 'rgb(255, 41, 57)',
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 5,
    },
    gText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 11,
      fontFamily: 'Proxima-Net'
    },
    savePoint: {
      marginTop: 20,
      backgroundColor: 'rgb(255, 41, 57)',
      borderRadius: 5,
    },
    spTouch: {
      paddingVertical: 20,
      paddingHorizontal: 80,
    },
    savePointText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 11,
      fontFamily: 'Proxima-Net'
    },
    ImageIconStyle: {
      width: 30,
      height: 30,
      marginLeft: 10,
    }
   });