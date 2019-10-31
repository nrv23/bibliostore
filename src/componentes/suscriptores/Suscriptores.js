import React from 'react';
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Suscriptores = ({suscriptores, firestore}) => {
    //firestore el props firestore es un props que tiene muchas funciones
    // funciones para poder manipular la informacion de las collecciones
    
    // mostrar mensaje para saber si esta cargando 
    if(!suscriptores) return <Spinner/>;

    const eliminarSuscriptor = (id) =>{
       //eliminar el registro

       firestore.delete({
           //toma diferentes parametros
           // 1- la colleccion que guarda el registro
           // 2- el documento a borrar, en este caso se pasa el id de ese docuemento
           collection: 'suscriptores',
           doc: id
       })
    }
    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                {/*Mostrar enlace para crear nuevos suscriptores*/}

                <Link to={'/suscriptor/insertar'}
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i>
                    {' '}Nuevo Suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        suscriptores.map(suscriptor =>(
                            <tr key={suscriptor.id}>
                                <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                                <td>{suscriptor.carrera}</td>
                                <td>
                                    <Link
                                        to ={`/suscriptor/${suscriptor.id}`}
                                    className="btn btn-success btn-block">
                                        <i className="fas fa-angle-double-right"></i>{' '}
                                        Mas informacion
                                    </Link>
                                    <button type="button" className="btn btn-danger btn-block" onClick={() =>{
                                        eliminarSuscriptor(suscriptor.id)
                                    }}>
                                        <i className="fas fa-trash-alt"></i>{' '}
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};


Suscriptores.propTypes ={
    firestore: PropTypes.object.isRequired,
    suscriptores: PropTypes.array
}
export default compose(
    firestoreConnect([{collection: 'suscriptores'}]), // de esta manera se conecta y se consulta a la coleccion suscriptores 
    // de la bd en firebase
    connect((state, props) => ({ // va llevar dos parametros, el state y el props
        // crear el state inicial con los datos de firebase
        suscriptores: state.firestore.ordered.suscriptores
      // el state de suscriptores lo puedo ver en el props de este componente
    })) // conecta un componente con el store de redux
)(Suscriptores); // exportar por default implicito