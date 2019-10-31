import React, { Component } from 'react'
import {compose} from 'redux';
import {connect } from 'react-redux'; // conectar componentes con el store
import {firestoreConnect} from 'react-redux-firebase'; // con este metodo se hacen las consultas a firebase
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';
//redux actions
import {buscarUsuario, buscarUsuarioExito } from '../../actions/buscarUsuarioActions';
import Error from '../layout/Error';

class PestamosLibro extends Component {
    state={
        noResultados: false,
        busqueda:'',
    }

    cargarState = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    buscarSuscriptor = (e)=>{
        e.preventDefault();
        
        const codigo = this.state.busqueda;

        const {firestore,buscarUsuario, buscarUsuarioExito} = this.props;
        buscarUsuario();
        // hacer una busqueda manual

        //asigno la coleccion a donde voy a buscar
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo","==", codigo).get(); // el .get es como un select en firebase
        
        consulta.then(data =>{
            if(data.empty){ // si no hay resultados
                //no hay resultados
                buscarUsuarioExito({});
                this.setState({
                    noResultados:true,
                })
            }else{
                const resultados = data.docs[0].data();
                buscarUsuarioExito(resultados);

                this.setState({
                    noResultados: false
                })
            }
        })
            
    }

    solicitarPrestamo = ()=> {
        const {usuario} = this.props;
        
        usuario.fecha_solicitud= new Date().toLocaleDateString();
        //crear una copia del props y hacer un nuevo objeto

        let prestado = [];
        // esta linea, saca una copia del props de array prestado de firebase, e inserta el nuevo usuario que va pedir prestado el libro
        // el array prestado es el que va almacenar los estudiantes que tienen libros prestados
        prestado = [...this.props.libro.prestado, usuario];
        

        // crear una copia del state global del libro a presta r
        const libro =  {...this.props.libro};

        delete libro.prestado; // eliminar un array dentro de un objeto con la palabra delete
        
        libro.prestado= prestado; // pasarle el array con los estudiantes que van a registrar libros prestado
        
        const {firestore, history} = this.props;

        firestore.update({
            collection: 'libros',doc: libro.id}, libro)
            .then(() =>{history.push('/')})
            .catch(err => console.error(err));

    }

    render() {

        const {libro} = this.props;

        if(!libro) return <Spinner/>;

        const { usuario} = this.props;
        let fichaAlumno=null, btnSolicitar=null;

        if(usuario.nombre){ // si el usuario existe
            fichaAlumno= <FichaSuscriptor
                alumno = {usuario}
            />
            btnSolicitar = <button className="btn btn-primary btn-block"
                onClick={this.solicitarPrestamo}
            >
                Solicitar Prestamo
            </button>
        }

        //Mostrar mensaje de error
        let mensaje= null;
        if(this.state.noResultados){
            mensaje = <Error mensaje='No hay resultados...'/>;
        }

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
                        Solicitar Prestamo: {libro.titulo}
                    </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form className="mb-4">
                                <legend className="color-primary text-center"> 
                                    Buscar el suscriptor por codigo    
                                </legend>
                                <div className="form-group">
                                    <input type="text"
                                      name="busqueda"
                                      className="form-control"
                                      onChange={this.cargarState}
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block" value="Buscar"
                                   onClick={this.buscarSuscriptor} 
                                />
                            </form>
                            {mensaje}
                            {/* Mostrar los resultados de la busqueda*/}
                            {fichaAlumno}
                            {btnSolicitar}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PestamosLibro.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props =>[{
             // hacer la busqueda de un suscriptor por el id que le estoy pasando via url
   
             collection: 'libros',
             storeAs: 'libro', // esto para que no reescriba el state de suscriptores
             doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}, usuario}, props) => ({ // haciendo destructuring de la propiedad ordered del props de firestore
       libro: ordered.libro && ordered.libro[0],
       usuario: usuario
    }),{buscarUsuario,buscarUsuarioExito}) // le paso las funciones del actions para que puedan ser utilizables en el componente
)(PestamosLibro);
