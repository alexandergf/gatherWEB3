/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from './src/screens/Home';
import AddUser from './src/screens/AddUser';
import LogIn from './src/screens/LogIn';
import HomeLogIn from './src/screens/HomeLogIn';
import CrearGrupo from './src/screens/CrearGrupo';
import UnirseGrupo from './src/screens/UnirseGrupo';
import Mapa from './src/screens/Mapa';
import PuntoEncuentro from './src/screens/PuntoEncuentro';
import GestionarMiembros from './src/screens/GestionarMiembros';
import foto from './src/screens/foto';


const AppNavigator = createStackNavigator(
    {
        Home,
        AddUser,
        LogIn,
        HomeLogIn,
        CrearGrupo,
        UnirseGrupo,
        Mapa,
        PuntoEncuentro,
        GestionarMiembros,
        foto
    },
    {
        initialRouteName: 'AddUser'
    }
);
const app = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appName, () => app);
