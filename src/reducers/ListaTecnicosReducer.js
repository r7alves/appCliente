import { LISTA_TECNICOS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    //console.log(action)
    switch(action.type) {      
        case LISTA_TECNICOS: return action.payload
        
        default: return state;
    }
}