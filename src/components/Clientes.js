import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ListView, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { listaClientes } from '../actions/AppActions';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';

class Clientes extends Component {
    componentWillMount() {
        this.props.listaClientes();
        this.preparaDados(this.props.clientesArray);
    }
    componentWillReceiveProps(nextProps) {
        this.preparaDados(nextProps.clientesArray);
    }

    preparaDados (clientesArray) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(clientesArray);
    }

    renderRow(cliente) {        
        return (            
            <TouchableHighlight 
                onPress={() => Actions.clienteChamados({ 
                    title: cliente.val.nome, 
                    clienteNome: cliente.val.nome, 
                    clienteEmail: cliente.val.email
                    })}
                underlayColor="#fff"
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                    <Text style={{ fontSize: 25}}>{cliente.val.nome}</Text>                    
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
    const clientes = _.map(state.ListaClientesReducer, (val, uid) => {
        
        return { val, uid};
    });
    
    const clientesArray = [];
    for (let i=0; i < _.size(clientes); i++) {
        const listaClientes = _.map(clientes[i].val, (val, uid) => {
            return {val, uid};
        });
        clientesArray.push(...listaClientes)
    }
    //console.log(clientesArray);
    
    return { clientesArray }
}
export default connect(mapStateToProps, {listaClientes})(Clientes);