import React, { Component } from 'react'
import {firebaseConnect, firebase} from 'react-redux-firebase'; // se utiliza para autenticar usuarios
import PropTypes from 'prop-types';
import Error from '../layout/Error';

class Login extends Component {
   
    state ={

        email: '',
        password: '',
        error: false
    }

    cargarState = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    Login = e =>{

        e.preventDefault();

        const {firebase, history} = this.props;
        const {email, password} = this.state;

        //autenticar usuario con firebase

        firebase.login({
            email,
            password
        })
        .then(data =>{console.log(data)
            this.setState({error: false});
        })
        .catch(err => {
            console.error(err)
            this.setState({error: true});
        });
    }
    render() {

        let error = null;

        if(this.state.error) error = <Error mensaje='El usuario o contraseña incorrectos'/> ;
        else error = null;
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card-mt-5">
                       <div className="card-boy">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i>{' '}
                                Iniciar Sesion
                            </h2>
                            {error}
                            <form>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" name="email" required value ={this.state.email}
                                        onChange={this.cargarState}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña:</label>
                                    <input type="password" className="form-control" name="password" required value ={this.state.password}
                                        onChange={this.cargarState}
                                        placeholder="Contraseña"
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block" 
                                        onClick={this.Login}
                                         value="Iniciar Sesion"
                                />
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
            
        )
    }
}
Login.propTypes ={
    firebase: PropTypes.object.isRequired
}
export default firebaseConnect()(Login); // cargar los metodos de firebaseConnect al componente LOgin