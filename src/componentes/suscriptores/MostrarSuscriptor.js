import React from 'react';
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const MostrarSuscriptor = ({suscriptor}) => {

    if(!suscriptor) return <Spinner/>;
    
    return (
        <div className="row">
           <div className="col-md-6 mb-4">
                <Link to='/suscriptores' className="btn btn-primary">
                    <i className="fas fa-arrow-circle-left"></i>
                    {' '}Volver al listado 
                </Link>
            </div> 
            <div className="col-md-6">
             <Link to ={`/suscriptor/editar/${suscriptor.id}`} className="btn btn-primary float-right">
                 <i className="fas fa-pencil-alt"></i>{' '}
                 Editar Suscriptor
              </Link>              
            </div>   
            <hr className="mx-5 w-100"/> 
            <div className="col-12">
                <h2>
                    {suscriptor.nombre} {suscriptor.apellido}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        Carrera:
                    </span>{' '}
                    {suscriptor.carrera}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Codigo:
                    </span>{' '}
                    {suscriptor.codigo}
                </p>
            </div>
        </div>
    );
};
MostrarSuscriptor.propTypes ={
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
)(MostrarSuscriptor);