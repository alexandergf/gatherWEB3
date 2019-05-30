/**
 * @format
 */
import {AppRegistry, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';  
import App from './App';
import {name as appName} from './app.json';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from './src/screens/Home';
import LogIn from './src/screens/LogIn';
import HomeLogIn from './src/screens/HomeLogIn';
import CrearGrupo from './src/screens/CrearGrupo';
import UnirseGrupo from './src/screens/UnirseGrupo';
import Mapa from './src/screens/Mapa';
import PuntoEncuentro from './src/screens/PuntoEncuentro';
import GestionarMiembros from './src/screens/GestionarMiembros';
import Loading from './src/screens/Loading';
import invitaFriends from './src/screens/invitaFriends';

const AppNavigator = createStackNavigator(
    {
        Home,
        LogIn,
        HomeLogIn,
        CrearGrupo,
        UnirseGrupo,
        Mapa,
        PuntoEncuentro,
        GestionarMiembros,
        Loading,
        invitaFriends
    },
    {
        initialRouteName: 'Loading',
        defaultNavigationOptions: {
           headerBackground: (
            <ImageBackground
              style={StyleSheet.absoluteFill}
              source={require('./src/images/BannerTop-06.png')}
            />
          ),
        },
    }
);
const app = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appName, () => app);
