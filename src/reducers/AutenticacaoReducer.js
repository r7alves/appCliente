import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    LOGIN_ERRO,
    LOGIN_SUCESSO,
    LOADING_LOGIN,
    LOADING_CADASTRO,
    LOGOUT_USER

} from '../actions/types';

const INITICAL_STATE = {
    email: 'guanabara@gmail.com',
    senha:'123456',
    loading_login: false,  
    erroLogin: '',    
}

export default ( state = INITICAL_STATE, action) => {

    switch(action.type) {
        case MODIFICA_EMAIL: return { ...state, email: action.payload}
        case MODIFICA_SENHA: return { ...state, senha: action.payload}
        case LOGIN_ERRO: return { ...state, loading_login: false, erroLogin: action.payload}
        case LOGIN_SUCESSO: return { ...state}
        case LOADING_LOGIN: return { ...state, loading_login: true}        
        case LOGOUT_USER: return { ...state, loading_login: action.payload}        

        default: return state;
    }
}