import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';  
import { db } from '../config';
import vision from "react-cloud-vision-api";
import {API_KEY_MAPS} from 'react-native-dotenv';
vision.init({ auth: API_KEY_MAPS});

const LATITUD_DELTA = 0.0922;
const LONGITUD_DELTA = 0.0922;
const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Utilizar camara',
  chooseFromLibraryButtonTitle: 'Escoger foto de la libreria'  
};
export default class PuntoEncuentro extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialPosition: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      secondPosition : {
          latitude: null,
          longitude: null,
      },
      idGroup: this.props.navigation.getParam('g', 'NO_GRUP'),
      avatarSource: null,
      googleResponse: null,
    }
  }

  submitToGoogle = async () => {
    try {
      let body = JSON.stringify({
        "requests": [
          {
            "image": {
              "content": this.state.avatarSource
            },
            "features": [
              {
                "type": "LANDMARK_DETECTION",
                "maxResults": 1
              }
            ]
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          API_KEY_MAPS,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      
      console.log(responseJson);

      this.setState({
        googleResponse: responseJson,
      });
      
      this.state.googleResponse.responses.map((res,index) => {
        res.landmarkAnnotations.map((rep,index) => {
          rep.locations.map((dir,index)=> {
            console.log(dir.latLng.latitude);
            console.log(dir.latLng.longitude);
            this.setState({
              secondPosition: {
                latitude: dir.latLng.latitude,
                longitude: dir.latLng.longitude,
              }
            })
          })
        })
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    })
  }
  imagePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
         //const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: response.data,
        });
        this.submitToGoogle();
      }
    });
  }
  getMarkerPosition = (e) => {
    this.setState({
      secondPosition: {
        latitude: e.latitude,
        longitude: e.longitude,
      }
    })
  }
  confirmPos = () => {
    if(this.state.secondPosition.latitude != null && this.state.secondPosition.longitude != null){
      db.ref('/pEncuentro').on('value', snapshot => {
        let data = snapshot.val();
        Object.keys(data).forEach(key => {
          if(data[key].grupo == this.state.idGroup){
            db.ref('/pEncuentro/'+key).update({
              lat: this.state.secondPosition.latitude,
              lon: this.state.secondPosition.longitude,
            })
          }
        });
      });
      this.props.navigation.replace('Mapa', {g: this.state.idGroup});
    } else {
      alert("Error de posición");
    }
  }
  render() {
    var origin={latitude: this.state.initialPosition.latitude,longitude: this.state.initialPosition.longitude}
    return (
        <View style={styles.container}>
            {this.state.initialPosition.latitude ? <MapView
            style={styles.map}
            region={this.state.initialPosition}
            showsUserLocation={true}
            followsUserLocation={true}
            >
              <Marker draggable
                coordinate={origin}
                onDragEnd={(e) => this.getMarkerPosition(e.nativeEvent.coordinate)}
              />
            </MapView> : null }
            <TouchableOpacity style={styles.touch} activeOpacity={0} onPress={() => this.imagePhoto()}>
              <Image style={styles.camera} source={require ('../images/camera-logo.png')} />
            </TouchableOpacity>
            <View style={styles.confirm}>
              <TouchableHighlight style={styles.coTouch} onPress={()=>this.confirmPos()}>
                <Text style={styles.confirmarText}>CONFIRMAR</Text>
              </TouchableHighlight> 
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
      height: '65%',
      width: '95%',
      margin: 2,
      marginTop: 5,
      backgroundColor: '#999'
    },
    camera: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    touch: {
      width: 100,
      height: 100,
    },
    confirm: {
      backgroundColor: 'rgb(255, 41, 57)',
      borderRadius: 5,
    },
    coTouch: {
      paddingVertical: 20,
      paddingHorizontal: 80,
    }, 
    confirmarText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 11
    },
   });