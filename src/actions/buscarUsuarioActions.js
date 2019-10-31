import {BUSCAR_USUARIO} from './types';
import {BUSCAR_USUARIO_EXITO} from './types';
import {BUSCAR_USUARIO_ERROR} from './types';

export const buscarUsuario = () => {
   return {
    type: BUSCAR_USUARIO
   }
}

export const buscarUsuarioExito=(usuario)=>{
    return {
        type: BUSCAR_USUARIO_EXITO,
        usuario
    }   
}

export const buscarUsuarioError= ()=>{
    return {
        type: BUSCAR_USUARIO_ERROR
    }   
}