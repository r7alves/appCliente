import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ListView} from 'react-native';
import { listaTecnicos } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Tecnicos extends Component {

    componentWillMount() {      
        this.props.listaTecnicos();
        this.preparaDados(this.props.tecnicos);
    }
    componentWillReceiveProps (nextProps) {
        this.preparaDados(nextProps.tecnicos);
    }

    preparaDados(tecnicos) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(tecnicos);
    }
    renderRow(tecnico) {
        return(
            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                    <Text style={{ fontSize: 25}}>{tecnico.val.nome}</Text>
                </View>
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

const mapStateToProps = state => {
    const tecnicosMap = _.map(state.ListaTecnicosReducer, (val, uid) => {
         return { val, uid};
    });

    const tecnicos = [];
    for (let i=0; i < _.size(tecnicosMap); i++) {
        const listaTecnicos = _.map(tecnicosMap[i].val, (val, uid) => {
            return {val, uid};
        });
        tecnicos.push(...listaTecnicos);
    }
    //console.log(tecnicos);
    return { tecnicos};
}

export default connect(mapStateToProps, {listaTecnicos})(Tecnicos)