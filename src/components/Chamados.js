import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TextInput,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Separator
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import Swipeout from 'react-native-swipeout';

import { listaChamadosCliente, habilitaAddChamado } from '../actions/AppActions';

class Chamados extends Component {
    componentWillMount() {
        this.props.listaChamadosCliente();
        this.preparaDados(this.props.chamados);
    }
componentWillReceiveProps(nextProps) {
    this.preparaDados(nextProps.chamados);
}
preparaDados(chamados) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dataSource = ds.cloneWithRows(chamados);
}

_deleteChamado(){
    Alert.alert('Excluir:', 'Você confirma a exclusão do chamado?',
        [
            { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Sim', onPress: () => console.log('ok Pressed') },
        ],
        { cancelable: false })
}

renderRow(chamado) {
    let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        //onPress: () => this._deleteChamado()
    }];
    return (
        <Swipeout right={swipeBtns}
            autoClose = {true}
            backgroundColor = 'transparent'
            onPress = {() => this._deleteChamado()}
        >
            <TouchableHighlight
                onPress={() => Actions.detalheChamado({title: chamado.titulo, chamadoDados: chamado})}
                underlayColor="#fff">
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        borderBottomWidth: 1,
                        borderColor: "#ccc"
                    }}>
                    <Text style={{ fontSize:20}} >{chamado.titulo}  - Prioridade: {chamado.prioridade}</Text>
                </View>
                
            </TouchableHighlight>
        </Swipeout>
        
    )
}
    render() {

        console.log('chamados' + this.props.chamados)
        if (this.props.chamados.length == 0)
        {
            
            return(
                <View style={{ flex: 1,justifyContent:'center', backgroundColor: '#f3f3f3' }}>

                    <Text style={{ fontSize: 29, textAlign: 'center'}}>Crie um novo chamado</Text>
                    <ActionButton
                        buttonColor="rgba(19, 15, 103, 1)"
                        onPress={() => { Actions.add(); this.props.habilitaAddChamado() }} />
                </View>
            ) 
        }
        return (

            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                
                    <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    />    
                
                 <ActionButton
                    buttonColor="rgba(19, 15, 103, 1)"
                    onPress={() => { Actions.add(); this.props.habilitaAddChamado()}}/>
            </View>
            
                
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});

mapStateToProps = state => {  
    //carrega_chamados: state.ListaClienteChamadosReducer.carrega_chamados  
    const chamados = _.map(state.ListaClienteChamadosReducer, (val, uid) => {
    return {
        ...val,
        uid
    };
})
return {chamados}
}
export default connect(mapStateToProps, {listaChamadosCliente, habilitaAddChamado})(Chamados);