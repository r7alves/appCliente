import React, { Component } from 'react'
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { listaChamadosCliente } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';



class ClienteChamados extends Component {
    componentWillMount = () => {
        //console.log(this.props.clienteEmail);
        this.props.listaChamadosCliente(this.props.clienteEmail)
        this.preparaDados(this.props.chamados);
    }

    componentWillReceiveProps(nextProps) {
        this.preparaDados(nextProps.chamados);
    }
    preparaDados(chamados) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2})
            this.dataSource = ds.cloneWithRows(chamados);
    }

    renderRow(chamado) {   
        console.log(chamado)     
        return(
            <TouchableHighlight
                
                onPress={() => Actions.detalheChamado({ 
                    title: chamado.descricao, 
                    chamadoDados: chamado,
                })}
                underlayColor="#fff"
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                   <Text>{chamado.descricao}</Text>
                </View>
            </TouchableHighlight>
        )
    }


    render() {
    return (
        <ListView 
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
        />
    )    
  }
}
mapStateToProps = state => {
   
    const chamados = _.map(state.ListaClienteChamadosReducer, (val, uid) => {
        return { ...val, uid};
    })   
    return {chamados}
}
export default connect(mapStateToProps, {listaChamadosCliente})(ClienteChamados);