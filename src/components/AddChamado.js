import React, {Component} from 'react';
import {View, Text, TextInput, Button, Picker, Alert} from 'react-native';
import {connect} from 'react-redux';

import {adicionaChamado, modificaAddChamadoTitulo, modificaAddChamadoDescricao, modificaAddChamadoPrioridade, modificaAddChamadoColaborador} from '../actions/AppActions';

class AddChamado extends Component {

    state = {
        prioridade: this.props.prioridade

    };

    _adicionaChamado()
    {
        console.log(this.state.prioridade);
        if(this.props.titulo && this.props.descricao && this.props.colaborador )
        {
            this.props.adicionaChamado(this.props.titulo, this.props.descricao, this.state.prioridade, this.props.colaborador)
        }else if(!this.props.titulo){
            Alert.alert('Erro:',"Preencha o campo de Título")
        }
        else if(!this.props.descricao){
            Alert.alert( 'Erro:','Preencha o campo de Descrição')
        }else {
            Alert.alert('Erro:',"Preencha o campo de Quem será atendimento")
        }
        
        //const {titulo, descricao, prioridade, colaborador} = this.props;
    }

    renderAddContato()
    {
        if (!this.props.is_registered) {
            return (
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TextInput placeholder='Título' style={{fontSize: 20, height: 45}}
                            onChangeText={(texto) => this.props.modificaAddChamadoTitulo(texto)}
                            value={this.props.titulo}
                            require={true}/>

                        <TextInput placeholder='Descrição'
                            multiline={true}
                            numberOfLines={5}
                            style={{fontSize: 20, height: 120}}
                            onChangeText={(texto) => this.props.modificaAddChamadoDescricao(texto)}
                            value={this.props.descricao}/>

                        <Text style={{fontSize: 20}}>Prioridade:</Text>

                        <Picker
                            selectedValue={this.state.prioridade}
                            onValueChange={(itemValue, itemIndex) => this.setState({prioridade: itemValue})}>
                            {this
                                .items
                                .map((i, index) => (<Picker.Item key={index} label={i.label} value={i.value}/>))}
                        </Picker>

                        <TextInput
                            placeholder='Quem será atendido?'
                            style={{
                            fontSize: 20,
                            height: 45
                        }}
                            onChangeText={(texto) => this.props.modificaAddChamadoColaborador(texto)}
                            value={this.props.colaborador}/>
                        <Text
                            style={{
                            color: '#ff0000',
                            fontSize: 18
                        }}>{this.props.erroChamado}</Text>

                        <View style={{flex: 1}}>
                            <Button
                                title="Adicionar"
                                color="#2b4b99"
                                onPress={() => this._adicionaChamado()}/>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View
                    style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                        fontSize: 20,
                        textAlign: 'center'
                    }}>
                        Chamado cadastrado com sucesso!
                    </Text>
                </View>
            )
        }
    }

    render()
    {
        return (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20
            }}>
                {this.renderAddContato()}
            </View>
        );
    }

    items = [
        {
            label: 'Normal',
            value: 'Normal'
        }, {
            label: 'Alta',
            value: 'Alta'
        }, {
            label: 'Baixa',
            value: 'Baixa'
        }
    ];

}

const mapStateToProps = state => ({
    titulo: state.ChamadoReducer.add_chamado_titulo,
    descricao: state.ChamadoReducer.add_chamado_descricao,
    prioridade: state.ChamadoReducer.add_chamado_prioridade,
    colaborador: state.ChamadoReducer.add_chamado_colaborador,
    is_registered: state.ChamadoReducer.is_registered,
    erroChamado: state.ChamadoReducer.erroChamado
})
export default connect(mapStateToProps, {adicionaChamado, modificaAddChamadoTitulo, modificaAddChamadoDescricao, modificaAddChamadoPrioridade, modificaAddChamadoColaborador})(AddChamado);
