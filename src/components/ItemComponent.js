import React, { Component } from 'react';  
import { View, Text, StyleSheet,TouchableHighlight,Alert } from 'react-native';  
import PropTypes from 'prop-types';
import { db } from '../config';
import { withNavigation } from 'react-navigation';
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

class ItemComponent extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired,
    grupo: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired
  };

  submit = (id) => {
    Alert.alert(
      'Aceptar usuario',
      'Quieres aceptar a '+id+' en el grupo?',
      [
        {
          text: 'NO',
          onPress: ()=> console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'SI',
          onPress: () => {
            modifyUser(id);
          }
        },
        {cancelable: false},
      ]
    );
  }

  changeAdmin = (id) => {
    Alert.alert(
      'Cambiar administrador',
      'Quieres hacer a '+id+' administrador?',
      [
        {
          text: 'NO',
          onPress: ()=> console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'SI',
          onPress: () => {
            db.ref('/Users').on('value', snapshot => {
              let data = snapshot.val();
              Object.keys(data).forEach(key => {
                if(data[key].grupo == this.props.grupo && id == data[key].email){
                  db.ref('/Users/'+key).update({
                    admin: true
                  });
                }
                if(data[key].admin == true && id != data[key].email){
                  db.ref('/Users/'+key).update({
                    admin: false
                  });
                }
              });
            });
            this.props.navigation.replace('Loading');
          }
        },
        {cancelable: false},
      ]
    );
  }

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          if(item.grupo == this.props.grupo && item.email != this.props.name && this.props.admin == true){
            if(item.active == false){
              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.itemtext}>{item.email}</Text> 
                  <TouchableHighlight style={styles.cTouch} onPress={()=>this.submit(item.email)}>
                    <Text style={styles.cText}>ACEPTAR</Text>
                  </TouchableHighlight>
                </View>
              );
            } else{
              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.itemtext}>{item.email}</Text>
                  <TouchableHighlight style={styles.cTouch} onPress={()=>this.changeAdmin(item.email)}>
                    <Text style={styles.cText}>ADMIN</Text>
                  </TouchableHighlight>
                </View>
              );
            }
          } else if(item.grupo == this.props.grupo && item.email != this.props.name) {
            return(
            <View key={index} style={styles.row}>
              <Text style={styles.itemtext}>{item.email}</Text>
            </View>
            );
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
  row:{
    flexDirection:'row',
  },
  itemtext: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color: 'rgb(255, 41, 57)',
    fontFamily: 'Proxima-Net'
  },
  cTouch: {
    backgroundColor: 'rgb(255, 41, 57)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 3,
    marginBottom: 10,
  },
  cText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Proxima-Net'
  },
});
export default withNavigation(ItemComponent);