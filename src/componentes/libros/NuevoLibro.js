import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoLibro extends Component {

    state ={
        titulo: '',
        ISBN: '',
        editorial: '',
        existencia: ''
    }

    cargarState= (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    agregarLibro = e =>{

        e.preventDefault();
        const Libro = this.state;
        Libro.prestado=[];
        const {firestore, history}= this.props;

       firestore.add({collection: 'libros'}, Libro)
       .then(() => history.push('/'))
       .catch(err => console.error(err));

    }
    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to='/' className="btn btn-primary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>{' '}
                        Nuevo Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="titulo"
                                        required
                                        placeholder="Titulo"
                                       onChange={this.cargarState}
                                        
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="ISBN"
                                        required
                                        placeholder="ISBN"
                                        onChange={this.cargarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="editorial"
                                        required
                                        placeholder="Editorial"
                                        onChange={this.cargarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        required
                                        placeholder="Cantidad en existencia"
                                        onChange={this.cargarState}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value="Agregar Libro"
                                    onClick={this.agregarLibro}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
NuevoLibro.propTypes={
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect()(NuevoLibro);