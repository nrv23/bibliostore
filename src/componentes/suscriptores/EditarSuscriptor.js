import React, { Component } from 'react'
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditarSuscriptor extends Component {
  
    nombreRef = React.createRef();
    apellidoRef = React.createRef(); 
    carreraRef = React.createRef();
    codigoRef = React.createRef();


    editarSuscriptor = (e) =>{
        e.preventDefault();

       const obj ={
           nombre : this.nombreRef.current.value,
           apellido: this.apellidoRef.current.value,
           carrera: this.carreraRef.current.value,
           codigo: this.codigoRef.current.value
       }

       const {suscriptor, firestore, history} = this.props;

       firestore.update({
           collection: 'suscriptores',
           doc: suscriptor.id
       }, obj)
       .then(()=> history.push('/suscriptores'))
       .catch(err => console.error(err));
    }
    

    render() { // esta funcion es obligatoria en los class component

        const {suscriptor} = this.props;
    
        if(!suscriptor) return <Spinner/>;

        
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
                    <i className="fas fa-user"></i>{' '}
                    Editar Suscriptor
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
                                    defaultValue = {suscriptor.nombre}
                                    ref={this.nombreRef}
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
                                    defaultValue = {suscriptor.apellido}
                                    ref={this.apellidoRef}
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
                                    defaultValue = {suscriptor.carrera}
                                    ref={this.carreraRef}
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
                                    defaultValue = {suscriptor.codigo}
                                    ref={this.codigoRef}
                                />
                            </div>

                            <input
                                type="submit"
                                className="btn btn-success"
                                value="Editar Suscriptor"
                               onClick={this.editarSuscriptor}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

EditarSuscriptor.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props =>[{
             // hacer la busqueda de un suscriptor por el id que le estoy pasando via url
   
             collection: 'suscriptores',
             storeAs: 'suscriptor', // esto para que no reescriba el state de suscriptores
             doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({ // haciendo destructuring de la propiedad ordered del props de firestore
       suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
   )(EditarSuscriptor);