import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import  {compose } from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase'; // para funciones de login
import PropTypes from 'prop-types';

class Navbar extends Component {
    state = { Autenticado: false }


    static getDerivedStateFromProps(props, state) {
        // esta funcion se va ejecutar cuando el componente se cargue, recibe automaticamente los props
        const {auth} = props;      
        
        if(auth.uid){ // en esta parte no es necesario usar el this.setState
            return { Autenticado: true}
        }else{
            return { Autenticado: false}
        }
    }


    cerrarSesion = () =>{
        const {firebase }= this.props;

        firebase.logout();
    }

    render() { 

        const {Autenticado} = this.state;
        //extraer datos de autenticacion
        const {auth}= this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
                <nav className="navbar navbar-light">
                    <span className="navbar-brand mb-0 h1">
                        Administrador de Biblioteca
                    </span>
                </nav>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        
                <div className="collapse navbar-collapse" id="navbarColor01">
                    {Autenticado ? (<ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/suscriptores'} className="nav-link">Suscriptores</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">Libros</Link>
                        </li>
                    </ul>):
                    null}

                    {
                        Autenticado ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="#!" className="nav-link">
                                        {auth.email}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger"
                                        type="button"
                                        onClick={this.cerrarSesion}
                                    >
                                        Cerrar Sesion
                                    </button>
                                </li>
                            </ul>
                        ) :null
                    }
                </div>
            </nav>
        );
    }
}
 
Navbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
export default compose(
    firebaseConnect(),
    connect((state, props) =>({
        auth: state.firebase.auth // esta iunformacon se va pasar de firebase al state para saber si alguien esta logueado o no
    }))
)(Navbar);