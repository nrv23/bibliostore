import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import {Provider } from 'react-redux';
import Libros from './componentes/libros/Libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import PrestamosLibro from './componentes/libros/PestamosLibro';
import Suscriptores from './componentes/suscriptores/Suscriptores';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import Login from './componentes/auth/Login';
import Navbar from './componentes/layout/Navbar';
import {UserIsAuthenticated,UserIsNotAuthenticated} from './helpers/auth';
// UserIsAuthenticated con esta funcion se protegen las rutas de que si no hay un inicio de session
// se redirecciona automaticamente al login
// UserIsNotAuthenticated se usa para mostrar un componente cuando no hay autenticacion
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
          <div className="container">
            <Switch>
                <Route exact path='/' component={UserIsAuthenticated(Libros)}/>
                <Route exact path='/libro/insertar' component={UserIsAuthenticated(NuevoLibro)}/>
                <Route exact path='/libro/editar/:id' component={UserIsAuthenticated(EditarLibro)}/>
                <Route exacth path='/libro/prestamo/:id' component={UserIsAuthenticated(PrestamosLibro)}/>
                <Route exact path='/libro/:id' component={UserIsAuthenticated(MostrarLibro)}/>
                <Route exact path='/suscriptores' component={UserIsAuthenticated(Suscriptores)}/>
                <Route exact path='/suscriptor/insertar' component={UserIsAuthenticated(NuevoSuscriptor)}/>
                <Route exact path='/suscriptor/editar/:id' component={UserIsAuthenticated(EditarSuscriptor)}/>
                <Route exact path='/suscriptor/:id' component={UserIsAuthenticated(MostrarSuscriptor)}/>
                <Route exact path='/login' component={UserIsNotAuthenticated(Login)}/>
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
