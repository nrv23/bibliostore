import React, { Component } from 'react'
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

 class EditarLibro extends Component {

    titulo= React.createRef();
    ISBN = React.createRef();
    editorial = React.createRef();
    existencia = React.createRef();

    editarLibro = (e) =>{
        e.preventDefault();

        const obj = {
            titulo: this.titulo.current.value,
            ISBN: this.ISBN.current.value,
            editorial: this.editorial.current.value,
            existencia: this.existencia.current.value
        }

        const {libro, firestore, history} = this.props;
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, obj)
        .then(()=> history.push('/'))
        .catch(err => console.error(err));
    }

    render() {
        
        const {libro} = this.props;

        if(!libro) return <Spinner/>;
        
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
                    <i className="fas fa-user"></i>{' '}
                    Editar Libro
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
                                    defaultValue = {libro.titulo}
                                    ref={this.titulo}
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
                                    defaultValue = {libro.ISBN}
                                    ref={this.ISBN}
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
                                    defaultValue = {libro.editorial}
                                    ref={this.editorial}
                                />
                            </div>
                            <div className="form-group">
                                <label>Existencia:</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    name="existencia"
                                    required
                                    placeholder="Cantidad de existencia"
                                    defaultValue = {libro.existencia}
                                    ref={this.existencia}
                                />
                            </div>

                            <input
                                type="submit"
                                className="btn btn-success"
                                value="Editar Libro"
                               onClick={this.editarLibro}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
EditarLibro.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props =>[{
             // hacer la busqueda de un suscriptor por el id que le estoy pasando via url
   
             collection: 'libros',
             storeAs: 'libro', // esto para que no reescriba el state de suscriptores
             doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({ // haciendo destructuring de la propiedad ordered del props de firestore
       libro: ordered.libro && ordered.libro[0]
    }))
)(EditarLibro);