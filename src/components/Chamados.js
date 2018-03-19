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
    TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';

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
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(chamados);
}

renderRow(chamado) {
    
    return (
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
                <Text>{chamado.descricao}  - Aberto por: {chamado.usuarioChamado}</Text>
            </View>
        </TouchableHighlight>
        
    )
}

    render() {
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
const chamados = _.map(state.ListaClienteChamadosReducer, (val, uid) => {
    return {
        ...val,
        uid
    };
})
return {chamados}
}
export default connect(mapStateToProps, {listaChamadosCliente, habilitaAddChamado})(Chamados);