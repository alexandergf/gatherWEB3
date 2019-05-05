import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import MapView from 'react-native-maps';
import Camera from 'react-native-camera';
import { RNCamera } from 'react-native-camera';
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
          
          <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        
        </View>
    )
  }
  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
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