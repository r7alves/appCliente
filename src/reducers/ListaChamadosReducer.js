import { LISTA_CHAMADOS_ABERTOS, CARREGA_CHAMADOS} from '../actions/types';

const INITIAL_STATE = {
    carrega_chamados: false
}

export default (state = INITIAL_STATE, action) => {
    //console.log(action)
    switch(action.type) {
        case LISTA_CHAMADOS_ABERTOS: return action.payload;
        case CARREGA_CHAMADOS: return {...state, carrega_chamados: true};
        
        default: return state;
    }
}