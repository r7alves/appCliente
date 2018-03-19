import { LISTA_CLIENTES} from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {    
    switch(action.type) {
        case LISTA_CLIENTES: return action.payload
        
        default: return state;
    }
}