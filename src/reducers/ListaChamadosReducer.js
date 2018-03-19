import { LISTA_CHAMADOS_ABERTOS} from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LISTA_CHAMADOS_ABERTOS: return action.payload;

        
        default: return state;
    }
}