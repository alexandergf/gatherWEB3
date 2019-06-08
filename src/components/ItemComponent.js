import React, { Component } from 'react';  
import { View, Text, StyleSheet,Button } from 'react-native';  
import PropTypes from 'prop-types';
import { db } from '../config';
import firebase from 'firebase';  
let modifyUser = (id) => {
  const rootRef = db.ref();
  const oneReef = rootRef.child('Users').orderByChild('email').equalTo(id);
  oneReef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    items.map((item, index) => {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        db.ref('/Users/'+key).update({
          active: true,
        })
      });
    })
  });
}
export default class ItemComponent extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired,
    grupo: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  submit = (id) => {
    modifyUser(id);
  }

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          if(item.grupo == this.props.grupo && item.email != this.props.name){
            if(item.active == false){
              return (
                <View key={index}>
                  <Text style={styles.itemtext}>{item.email}</Text> 
                  <Button title="Aceptar" onPress={() => this.submit(item.email)} />
                </View>
              );
            } else {
              return (
                <View key={index}>
                  <Text style={styles.itemtext}>{item.email}</Text>
                </View>
              );
            }
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  itemsList: {
    flex: 1,
    flexDirection: 'column',
  },
  itemtext: {
    fontSize: 16,
    //fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: 'rgb(255, 41, 57)'
  }
});