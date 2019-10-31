import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

 class NuevoSuscriptor extends Component {
    state= {
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''
    }

    cargarState =(e) =>{
        this.setState({
            //...this.state, // se hace una copia del state porque los datos se leeen por aparte y se deben guardar
            // para agregar la nueva informacion
            [e.target.name]: e.target.value
        })
    }
    agregarNuevoSuscriptor = (e) =>{
        e.preventDefault();

        const nuevoSuscriptor = {...this.state};
        const {history, firestore} = this.props; // los datos vienen en el props del componente

        firestore.add({collection : 'suscriptores'}, nuevoSuscriptor)
            // LA FUNCION ADD RECIBE DOS PARAMETROS, EL PRIMERO LA COLECCION DONDE SE VA INSERTAR
            // EL NUEVO REGISTRO Y EL SEGUNDO ES EL OBJETO QUE CARGA LA INFORMACION A INSERTAR
            .then(()=>history.push('/suscriptores'))
            .catch(err => console.error(err));

    }
    render() {
        return (
            
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to='/suscriptores' className="btn btn-primary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus"></i>{' '}
                        Nuevo Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="nombre"
                                        required
                                        placeholder="Nombre"
                                        value = {this.state.nombre}
                                        onChange={this.cargarState}
                                        
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="apellido"
                                        required
                                        placeholder="Apellido"
                                        value = {this.state.apellido}
                                        onChange={this.cargarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="carrera"
                                        required
                                        placeholder="Carrera"
                                        value = {this.state.carrera}
                                        onChange={this.cargarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Codigo:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="codigo"
                                        required
                                        placeholder="Codigo"
                                        value = {this.state.codigo}
                                        onChange={this.cargarState}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value="Agregar Suscriptor"
                                    onClick={this.agregarNuevoSuscriptor}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NuevoSuscriptor.propTypes={
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect()(NuevoSuscriptor);