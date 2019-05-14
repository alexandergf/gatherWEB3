import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class PuntoEncuentro extends Component {
  imagePhoto = () => {
    ImagePicker.launchCamera(options, (response) => {
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
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        });
      }
    });
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
          <TouchableOpacity style={styles.touch} activeOpacity={.5} onPress={() => this.imagePhoto()}>
            <Image style={styles.camera} source={require ('../images/camera-logo.png')} />
          </TouchableOpacity>    
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
    },
    touch: {
      width: 100,
      height: 100,
      flex: 1,
    }
   });