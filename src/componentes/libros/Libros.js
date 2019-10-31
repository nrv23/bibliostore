import React from 'react';
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Libros = ({libros,firestore}) => {
    
    if (!libros) return <Spinner/>;

    const eliminarLibro = (id) =>{
        //eliminar el registro
 
        firestore.delete({
            //toma diferentes parametros
            // 1- la colleccion que guarda el registro
            // 2- el documento a borrar, en este caso se pasa el id de ese docuemento
            collection: 'libros',
            doc: id
        })
     }
    return (
     <div className="row">

<div className="col-md-12 mb-4">
            <Link to={'/libro/insertar'}
                className="btn btn-success"
            >
                <i className="fas fa-plus"></i>{' '}
                {' '}Nuevo Libro
            </Link>
        </div>
        <div className="col-md-8">
            <h2>
                <i className="fas fa-book"></i>{' '}
                Libros
            </h2>
        </div>
        <table className="table table-striped mt-4">
            <thead className="text-light bg-primary">
                <tr>
                    <th>Titulo</th>
                    <th>ISBN</th>
                    <th>Editorial</th>
                    <th>Existencia</th>
                    <th>Disponibles</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                    {
                        libros.map(libro =>(
                            <tr key={libro.id}>
                                <td>{libro.titulo}</td>
                                <td>{libro.ISBN}</td>
                                <td>{libro.editorial}</td>
                                <td>{libro.existencia}</td>
                                <td>{libro.existencia - libro.prestado.length}</td>
                                <td>
                                    <Link
                                        to ={`/libro/${libro.id}`}
                                    className="btn btn-success btn-block">
                                        <i className="fas fa-angle-double-right"></i>{' '}
                                        Mas informacion
                                    </Link>
                                    <button type="button" className="btn btn-danger btn-block" onClick={() =>{
                                        eliminarLibro(libro.id)
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

Libros.propTypes ={
    firebase: PropTypes.object.isRequired,
    libros: PropTypes.array
}
export default compose(
    firestoreConnect([{collection: 'libros'}]), // de esta manera se conecta y se consulta a la coleccion suscriptores 
    // de la bd en firebase
    connect((state, props) => ({ // va llevar dos parametros, el state y el props
        // crear el state inicial con los datos de firebase
        libros: state.firestore.ordered.libros
      // el state de suscriptores lo puedo ver en el props de este componente
    })) // conecta un componente con el store de redux
)(Libros); // exportar por default implicito