import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';
import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    LOADING_LOGIN,
    LOGIN_SUCESSO,
    LOGIN_ERRO,
} from './types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}
export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}


export const autenticarUsuario = ({ email, senha}) => {
    return dispatch => {
        dispatch({ type: LOADING_LOGIN});

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginSucesso(dispatch))
            .catch(erro => loginErro(erro, dispatch));
    }
}

const loginSucesso = (dispatch) => {
    dispatch ({ type: LOGIN_SUCESSO}); 
    Actions.principal();
}

const loginErro = (erro, dispatch) => {
    dispatch ({ type: LOGIN_ERRO, payload: erro.message });
}