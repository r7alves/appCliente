import {CADASTRO_TECNICO_SUCESSO, CADASTRO_TECNICO_ERRO, LOADING_CADASTRO} from '../actions/types';

const INITIAL_STATE = {
    erroCadastro: '',
    loading_cadastro: false,
    add_tecnico_nome: 'vanessa',
    add_tecnico_email: 'vanessa@gmail.com',
    add_tecnico_senha: '123456',
    add_cliente_nome: 'Oficina do Pelado',
    add_cliente_email: 'pelado@gmail.com',
    add_cliente_senha: '123456',
    
}

export default (state = INITIAL_STATE, action) => {
    //console.log(action)
    switch(action.type) {
        case CADASTRO_TECNICO_SUCESSO: return { ...state, nome: '', senha: '', loading_cadastro: false}
        case CADASTRO_TECNICO_ERRO: return { ...state, erroCadastro: action.payload, loading_cadastro: false}        
        case LOADING_CADASTRO: return { ...state, loading_cadastro: true}        
        
        default: return state;
    }
}