import {
    BUSCAR_USUARIO,
    BUSCAR_USUARIO_EXITO,
    BUSCAR_USUARIO_ERROR
} from '../actions/types';


const initialState = {

}


export default function(state= initialState, action){
    switch (action.type) {
        case BUSCAR_USUARIO:
            return {
                ...state,
                error: false
            }
        case BUSCAR_USUARIO_EXITO:
                return { // aqui se carga el state de buscar el usuario 
                    ...state,
                    error : false,
                    nombre: action.usuario.nombre,
                    apellido: action.usuario.apellido,
                    carrera: action.usuario.carrera,
                    codigo: action.usuario.codigo
                }
        case BUSCAR_USUARIO_ERROR:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
}



