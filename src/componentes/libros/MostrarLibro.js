import React, { Component } from 'react'
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const MostrarLibro = ({libro,firestore, history}) => {


       
         if(!libro) return <Spinner/>

         let btnPrestamo=null;
         if(libro.existencia - libro.prestado.length > 0) {
             btnPrestamo = <Link to={`/libro/prestamo/${libro.id}`} className="btn btn-success">Solicitar Prestamo </Link>
         }
       
       
        const devolverLibro = (codigo) =>{

            const libroSolicitado = {...libro};

            const prestados = libro.prestado.filter(fila => fila.codigo !== codigo);

            libroSolicitado.prestado= prestados;


            firestore.update({
                collection: 'libros',
                doc: libroSolicitado.id }, libroSolicitado)
                .then(() => history.push('/'))
                .catch(err => console.error(err));
        }


        return (
            <div className="row">
            <div className="col-md-6 mb-4">
                 <Link to='/' className="btn btn-primary">
                     <i className="fas fa-arrow-circle-left"></i>
                     {' '}Volver al listado 
                 </Link>
             </div> 
             <div className="col-md-6">
              <Link to ={`/libro/editar/${libro.id}`} className="btn btn-primary float-right">
                  <i className="fas fa-pencil-alt"></i>{' '}
                  Editar Libro
               </Link>              
             </div>   
             <hr className="mx-5 w-100"/> 
             <div className="col-12">
                 <h2>
                     {libro.titulo}
                 </h2>
                 <p>
                     <span className="font-weight-bold">
                         ISBN:
                     </span>{' '}
                     {libro.ISBN}
                 </p>
                 <p>
                     <span className="font-weight-bold">
                         Editorial:
                     </span>{' '}
                     {libro.editorial}
                 </p>
                 <p>
                    <span className="font-weight-bold">
                         Existencia:
                     </span>{' '}
                     {libro.existencia}
                 </p>
                 <p>
                    <span className="font-weight-bold">
                         Disponibles:
                     </span>{' '}
                     {libro.existencia - libro.prestado.length}
                 </p>
                 {btnPrestamo}

                <h3 className="my-4">Alumnos con prestamos del libro</h3>
                 {/* Muestra las personas que tienen los libros*/
                   libro.prestado.map(prestado =>(  
                        
                         <div key={prestado.codigo} className="card-header">
                                <div className="card-boy">
                                        <h4 className="card-header mb-4">{prestado.nombre} {prestado.apellido}</h4>
                                        <p>
                                        <span className="font-weight-bold">Codigo:</span> {prestado.codigo}
                                        </p>
                                        <p>
                                        <span className="font-weight-bold">Carrera:</span> {prestado.carrera}
                                        </p>
                                        <p>
                                        <span className="font-weight-bold">Fecha de solicitud:</span> {prestado.fecha_solicitud}
                                        </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success font-weight-bold" 
                                    onClick={() =>{
                                        devolverLibro(prestado.codigo)
                                    }}
                                    >Procesar devolucion</button>        
                                </div>
                        </div>
                   ))
                }
                
             </div>
             
         </div>
        )
}

MostrarLibro.propTypes ={
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props =>[{
             // hacer la busqueda de un suscriptor por el id que le estoy pasando via url
   
             collection: 'libros',
             storeAs: 'libro', // esto para que no reescriba el state de libros
             doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({ // haciendo destructuring de la propiedad ordered del props de firestore
       libro: ordered.libro && ordered.libro[0]
    }))
)(MostrarLibro);