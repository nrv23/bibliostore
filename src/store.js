import {createStore, combineReducers, compose } from 'redux';
import {reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
//custom reducers
import buscarUsuarioReducer from './reducer/buscarUsuarioReducer';



//configurar firestore

const firebaseConfig = {
    // todos estos keys y tokens y urls firebase las genera automaticamente para poder configurarlos en la aplicacion
    apiKey: "AIzaSyAOWpoOz9tPykCFJEs8zwmS9xNInXLyvZ0",
    authDomain: "bibliostore-9000e.firebaseapp.com",
    databaseURL: "https://bibliostore-9000e.firebaseio.com",
    projectId: "bibliostore-9000e",
    storageBucket: "bibliostore-9000e.appspot.com",
    messagingSenderId: "679384627490",
    appId: "1:679384627490:web:92895b4d833ee3eb"
}

//inicializar firebase

firebase.initializeApp(firebaseConfig); // para inicializar firebase se usa la funcion initializeApp y se le pasa como parametro el
// objeto de configuracion que trae toda la informacion generada por firebase


// configurar react-redux

const reactRduxConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // habilitar la opcion para usar firestore en react-redux
}
// crear el enlace con compose de redux y firestore

const createStoreWithFirebase = compose ( // esta configuracion es requerida para integrar firestore en un proyecto con react
   reactReduxFirebase(firebase,reactRduxConfig),
   reduxFirestore(firebase)
)(createStore);


// crear los reducers

const rootReducer = combineReducers({ // el rootReducer carga los reducer de firebase y firestore
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    usuario: buscarUsuarioReducer
})

// crear el state inicial
const initialState ={}; // se van a cargar listas de libros, listas de suscriptores y prestamos de libros

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    // pasarle los parametros para usar las herramientas de desarrollo de redux

    window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;