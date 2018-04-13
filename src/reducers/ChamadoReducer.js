import {CADASTRO_CHAMADO_SUCESSO, 
        CADASTRO_CHAMADO_ERRO,
        MODIFICA_ADD_CHAMADO_CLIENTE_NOME,
        MODIFICA_ADD_CHAMADO_CLIENTE_EMAIL,
        MODIFICA_ADD_CHAMADO_TITULO,
        MODIFICA_ADD_CHAMADO_DESCRICAO,
        MODIFICA_ADD_CHAMADO_PRIORIDADE,
        MODIFICA_ADD_CHAMADO_COLABORADOR
    } from '../actions/types';

const INITIAL_STATE = {
    erroChamado: '',
    loading_chamado: false,

    add_chamado_cliente_nome: '',
    add_chamado_cliente_email: '',
    add_chamado_titulo: '',
    add_chamado_descricao: '',
    add_chamado_prioridade: '',
    add_chamado_status: 'Aberto',
    add_chamado_colaborador: '',

    add_chamado_latitude:'2.7985111',
    add_chamado_longitude:'-60.7477355',

    add_chamado_tecnico_nome: 'vanessa',
    add_chamado_tecnico_email: 'vanessa@gmail.com',

    is_registered : false,
    
}

export default (state = INITIAL_STATE, action) => {
    //console.log(action)
    switch(action.type) {
        case CADASTRO_CHAMADO_SUCESSO: 
            //console.log(state)
            return{...state, 
                        is_registered:action.payload, 
                        add_chamado_cliente_nome: '',
                        add_chamado_cliente_email: '',
                        add_chamado_titulo: '',
                        add_chamado_descricao: '',
                        add_chamado_prioridade: '',
                        add_chamado_status: 'Aberto',
                        add_chamado_colaborador: '',

                        add_chamado_latitude:'',
                        add_chamado_longitude:'',

                        add_chamado_tecnico_nome: '',
                        add_chamado_tecnico_email: ''
                    }
        case CADASTRO_CHAMADO_ERRO : 
            return { ...state, erroChamado: action.payload, is_registered: false}    
        case MODIFICA_ADD_CHAMADO_TITULO : 
            return{...state, add_chamado_titulo: action.payload}    
        case MODIFICA_ADD_CHAMADO_DESCRICAO : 
            return{...state, add_chamado_descricao: action.payload}    
        case MODIFICA_ADD_CHAMADO_PRIORIDADE : 
            return{...state, add_chamado_prioridade: action.payload}    
        case MODIFICA_ADD_CHAMADO_COLABORADOR : 
            return{...state, add_chamado_colaborador: action.payload}    
        default: return state;
    }
}