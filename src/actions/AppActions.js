import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';
import _ from 'lodash';
import moment from 'moment';
import { 
    LOADING_CADASTRO, 
    CADASTRO_TECNICO_SUCESSO, 
    CADASTRO_TECNICO_ERRO,
    LISTA_CHAMADOS_ABERTOS,
    LISTA_CLIENTES,
    LISTA_CHAMADOS_CLIENTES,
    LISTA_TECNICOS,
    //teste para chamados
    CADASTRO_CHAMADO_SUCESSO, 
    CADASTRO_CHAMADO_ERRO, 
    MODIFICA_ADD_CHAMADO_CLIENTE_NOME,
    MODIFICA_ADD_CHAMADO_CLIENTE_EMAIL,
    MODIFICA_ADD_CHAMADO_TITULO,
    MODIFICA_ADD_CHAMADO_DESCRICAO,
    MODIFICA_ADD_CHAMADO_PRIORIDADE,
    MODIFICA_ADD_CHAMADO_COLABORADOR,
    CARREGA_CHAMADOS
} from './types';

export const cadastroTeste = (nome) => {
    console.log(nome);
}

export const criaChamados = () => {
    
    const { currentUser } = firebase.auth();
    const empresaEmail = currentUser.email;
    
    return dispatch => {
        const empresaEmailB64 = Base64.encode(empresaEmail);
    
        // Busca dados do usuario    
        firebase.database().ref('/clientes/'+empresaEmailB64)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()) {                    
                    const dadosCliente = _.first(_.values(snapshot.val()));                                                            
                    firebase.database().ref('/chamados_clientes/'+ empresaEmailB64)
                        .push({ cliente: dadosCliente.nome, descricao:'testeChamado Alencar', status:'aberto', prioridade:'alta'})                                        
                        .then(() => {
                            // console.log("chamados_cluentes"); 
                            // console.log('Clunete'+ dadosCliente.nome + ': Email: '+ empresaEmail)                                                   
                            // firebase.database().ref('/chamados_clientes/'+ empresaEmailB64)
                            //     .push({cliente: dadosCliente.nome, email: empresaEmail})                                
                        }) 
                } else {
                    console.log('erro localizar chamado');
                    dispatch({
                        
                        type: CADASTRO_TECNICO_ERRO, payload: 'Erro ao localizar cliente'
                    })
                }
            })        
    }
}

export const cadastraUsuarioCliente = (nome, email, senha) => {
    console.log(email);
    return dispatch => {
        dispatch({ type: LOADING_CADASTRO});
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = Base64.encode(email);
                firebase.database().ref('/clientes/'+emailB64)
                    .push({ nome })
                    .then(value => cadastraUsuarioTecnicoSucesso(dispatch))
            })
            .catch(erro => cadastraUsuarioTecnicoErro(erro, dispatch));
    }
}

export const cadastraUsuarioTecnico = (nome, email, senha) => {
    console.log(email);    
    return dispatch => {
        dispatch({ type: LOADING_CADASTRO });
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = Base64.encode(email);
                firebase.database().ref('/tecnicos/'+emailB64)
                    .push({ nome })
                    .then(value => cadastraUsuarioTecnicoSucesso(dispatch))
            })
            .catch(erro => cadastraUsuarioTecnicoErro(erro, dispatch));
    }
}

const cadastraUsuarioTecnicoSucesso = (dispatch) => {
    console.log('sucesso');
    dispatch({ type: CADASTRO_TECNICO_SUCESSO });
}

const cadastraUsuarioTecnicoErro = (erro, dispatch) => {
    console.log('erro cadastro');
    dispatch({ type: CADASTRO_TECNICO_ERRO, payload: erro.message });
}

export const listaChamadosAbertos = () => {
    //const { currentUser } = firebase.auth();
    
    return dispatch => {
        //let usuarioEmailB64 = Base64.encode(currentUser.email);
        firebase.database().ref('/chamados_clientes/')
            .on("value", snapshot => {
                dispatch({ type: LISTA_CHAMADOS_ABERTOS, payload:(_.values(snapshot.val()))})
            })
    }
}

export const listaClientes = () => {
    return dispatch => {
        firebase.database().ref('/clientes/')
            .once("value")
                .then(snapshot => {
                    // Converte json em array                                
                    dispatch({ type: LISTA_CLIENTES, payload:(snapshot.val())})
            })
    }
}

export const listaChamadosCliente = () => {
    const {currentUser} = firebase.auth();
    
    console.log('actions: '+ currentUser.email);
    
    let clienteEmailB64 = Base64.encode(currentUser.email);
    return dispatch => {
        dispatch({ type: CARREGA_CHAMADOS});
        firebase.database().ref('chamados_clientes/'+ clienteEmailB64)        
            .on("value", snapshot => {                
                dispatch({ type: LISTA_CHAMADOS_CLIENTES, payload:snapshot.val()})
            })
    }
}

export const listaTecnicos = () => {    
    return dispatch => {
        console.log('f')
        firebase.database().ref('/tecnicos/')
            .once("value")
                .then(snapshot => {
                    dispatch({ type: LISTA_TECNICOS, payload: (_.values(snapshot.val()))})
                })
    }
}

export const atenderChamado = (emailCliente, chamadoUID) => {
    const { currentUser } = firebase.auth();
    const tecnicoEmail = currentUser.email;
    let tecnicoEmailB64 = Base64.encode(tecnicoEmail);
    firebase.database().ref('/tecnicos/'+ tecnicoEmailB64)
        .once('value')
        .then(snapshot => {
            if(snapshot.val()){                
                const dadosTecnico = _.first(_.values(snapshot.val()));                                        
                let emailClienteB64 = Base64.encode(emailCliente);
                firebase.database().ref('/chamados_clientes/' + emailClienteB64 + '/' + chamadoUID )            
                    .update({            
                        status:'atendimento', 
                        tecnico: dadosTecnico.nome,
                        tecnicoEmail: tecnicoEmail,
                    })
                firebase.database().ref('/tecnico_chamados/' + tecnicoEmailB64 +'/'+chamadoUID)
                    .set({ tecnicoEmail, chamadoUID })
                                            
            } else {
                console.log('nao encontrou')
            }
        });
    
}

export const encerrarChamado = (emailCliente, chamadoUID) => {
    const { currentUser} = firebase.auth();
    const tecnicoEmail = currentUser.email;
    let tecnicoEmailB64 = Base64.encode(tecnicoEmail);
    firebase.database().ref('/tecnicos/' + tecnicoEmailB64)
        .once('value')
        .then(snapshot => {
            if(snapshot.val()){
                const dadosTecnico = _.first(_.values(snapshot.val()));
                let emailClienteB64 = Base64.encode(emailCliente);
                firebase.database().ref('/chamados_clientes/' + emailClienteB64 + '/' + chamadoUID)
                    .update({
                        status: 'resolvido',
                        tecnico: dadosTecnico.nome,
                        tecnicoEmail: tecnicoEmail,
                    })
                    firebase.database().ref('/tecnico_chamados/' + tecnicoEmailB64 +'/'+chamadoUID)
                        .set({ tecnicoEmail, chamadoUID })
                                                
                } else {
                    console.log('nao encontrou')
                }
            });
        
}

//============Metodos para chamados cliente==========================
export const modificaAddChamadoTitulo = (texto) => {
    return {type: MODIFICA_ADD_CHAMADO_TITULO, payload: texto}
}

export const modificaAddChamadoDescricao = (texto) => {
    return {type: MODIFICA_ADD_CHAMADO_DESCRICAO, payload: texto}
}

export const modificaAddChamadoPrioridade = (texto) => {
    return {type: MODIFICA_ADD_CHAMADO_PRIORIDADE, payload: texto}
}

export const modificaAddChamadoColaborador = (texto) => {
    return {type: MODIFICA_ADD_CHAMADO_COLABORADOR, payload: texto}
}

const successAddChamado = (dispatch) => {
    //console.log(dispatch)
    dispatch({type: CADASTRO_CHAMADO_SUCESSO, payload: true})

}

const erroAddChamado = (erro, dispatch) => {
    console.log('chamou o erro add')
    dispatch({type: CADASTRO_CHAMADO_ERRO, payload: erro})
}


export const habilitaAddChamado = () =>(
   
    {
        type: CADASTRO_CHAMADO_SUCESSO,
        payload: false
    }
)


export const adicionaChamado = (titulo, descricao, prioridade, colaborador) => {
    if(prioridade == '')
    {
        prioridade = 'Normal'
    }
    
    const { currentUser } = firebase.auth();
    const clienteChamadoEmail = currentUser.email;

    var createdAt = moment(new Date()).format("DD-MM-YYYY")

    return dispatch => {
        const empresaEmailB64 = Base64.encode(clienteChamadoEmail);
        
        
        // Busca dados do usuario    
        firebase.database().ref('/clientes/'+empresaEmailB64)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()) {                    
                    const dadosCliente = _.first(_.values(snapshot.val()));                                                            
                    var dadosChamado = {
                        cliente: dadosCliente.nome,
                        latitude: dadosCliente.latitude,
                        longitude: dadosCliente.longitude,
                        titulo:titulo,
                        prioridade:prioridade,
                        status:'aberto',
                        createdAt: createdAt,
                    }
                    var chamadoRef = firebase.database().ref().child('/chamados_abertos/').push(dadosChamado);                        
                    var postId = chamadoRef.key;                                          
                    console.log(postId);
                    firebase.database().ref('/chamados_clientes/'+ empresaEmailB64 +'/'+postId)
                        .set({ 
                            cliente: dadosCliente.nome,
                            emailCliente: dadosCliente.email,
                            latitude: dadosCliente.latitude,
                            longitude: dadosCliente.longitude,
                            titulo:titulo,
                            descricao:descricao,
                            prioridade:prioridade,
                            status:'aberto',
                            usuarioChamado: colaborador,
                            createdAt: createdAt,
                        })              
                        .then(() => successAddChamado(dispatch))
                        .catch(erro => erroAddChamado(erro.message, dispatch)) 
                } else {
                    console.log('erro localizar chamado');
                    dispatch({
                        
                        type: CADASTRO_CHAMADO_ERRO, payload: 'Erro ao Cadastro cliente'
                    })
                }
            })        
    }
}

export const atualizaChamado = (chamadoUID, titulo, descricao, prioridade, colaborador) => {
    const {currentUser} = firebase.auth();
    
    const emailClienteB64 = Base64.encode(currentUser.email);

    firebase.database().ref('/chamados_clientes/' + emailClienteB64 + '/' + chamadoUID)
    .update({status: 'atendimento', tecnico: dadosTecnico.nome, tecnicoEmail: tecnicoEmail})
     

}

export const excluirChamado = (chamadoUID) => {
    console.log(chamadoUID)
    const {currentUser} = firebase.auth();
    
    const emailClienteB64 = Base64.encode(currentUser.email);

    return dispatch => 
    {
        firebase.database().ref('/chamados_abertos/' + chamadoUID)
        .remove()
        firebase.database().ref('/chamados_clientes/' + emailClienteB64 + '/' + chamadoUID)
        .remove()
        Actions.principal()
    }
     

}