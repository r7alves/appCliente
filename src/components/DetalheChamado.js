import React, { Component } from 'react';
import { 
    View, Text, SectionList, 
    StyleSheet, Dimensions, 
    Button, Picker, Modal, TextInput, Alert} from 'react-native';
import { 
    atualizaChamado,
    excluirChamado,
    } from '../actions/AppActions';
import { connect } from 'react-redux';
import b64 from 'base-64';


class DetalheChamado extends Component{
    
    constructor(props)
    {
        super(props)
        this.state = {
            modalVisible: false,
            language: '',
            status: this.props.chamadoDados.status,
            titulo: this.props.chamadoDados.titulo,
            descricao: this.props.chamadoDados.descricao,
            colaborador: this.props.chamadoDados.usuarioChamado,
            prioridade: this.props.chamadoDados.prioridade,
        }
    }
    
    
    

    _atualizaChamado()
    {
        console.log('chamou atualiza interno' + this.props.chamadoDados.uid + this.state.titulo + this.state.descricao + this.state.prioridade + this.state.colaborador  )

        if (this.state.titulo && this.state.descricao && this.state.colaborador) {
            this.props.atualizaChamado(this.state.titulo, 
                                        this.state.descricao, 
                                        this.state.prioridade, 
                                        this.state.colaborador, 
                                        this.props.chamadoDados.uid,
                                        )
        } else if (!this.state.titulo) {
            Alert.alert('Erro:', "Preencha o campo de Título")
        }
        else if (!this.state.descricao) {
            Alert.alert('Erro:', 'Preencha o campo de Descrição')
        } else {
            Alert.alert('Erro:', "Preencha o campo de Quem será atendimento")
        }
    }
    openModal() {
        this.setState({modalVisible:true});
    }
    closeModal() {
        this.setState({modalVisible:false});
    }

    _excluirChamado()
    {
        this.props.excluirChamado(this.props.chamadoDados.uid)
    }

    //
    renderBtnAlterChamado() {
        if (this.props.chamadoDados.status == 'aberto') {
            return (
                <View>
                    <Button style={{padding: 5,}} title="Editar Chamado" color='#1E90FF' onPress={() =>this.openModal()}  />                
                    <Button title="Excluir Chamado" color='#DC143C' 
                        onPress={() => Alert.alert(
                                        'Confirmar Exclusão!',
                                        'Tem certeza disso?',
                                        [
                                            { text: 'Sim', onPress: () => this._excluirChamado() },
                                            { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        ],
                                        { cancelable: false }
                        )}  
                    />                
                </View>
            )
        }
        
    }
    renderDate() {
        if (this.props.chamadoDados.status == 'aberto') {
            return (
                <Text style={{ fontSize:20, height: 45}} >Criado em: {this.props.chamadoDados.createdAt}</Text> 
            )
        }
        <Text style={{ fontSize:20, height: 45}} >Atualizado em: {this.props.chamadoDados.updateAt}</Text>                
        
        
    }
    renderTec() {
        if (this.props.chamadoDados.tecnico !== null) {
            return (
                <Text style={{ fontSize: 25, height: 45 }} >Tecnico: {this.props.chamadoDados.tecnico}</Text>  
            )
        }
    }
    render() {
        console.log('funciona porraaaaa ' + this.state.titulo )
        return (
            <View style={{flex:1}}>
                
                <View style={{flex:1, padding:20}}>
                    <Text style={{ fontSize:25, height: 45}} >Descrição: {this.props.chamadoDados.descricao}</Text>
                    <Text style={{ fontSize:25, height: 45}} >Prioridade: {this.props.chamadoDados.prioridade}</Text>
                    <Text style={{ fontSize:25, height: 45}} >Status do Chamado: {this.props.chamadoDados.status}</Text>             
                                  
                    {this.renderDate()} 
                    
                </View>
                
                <View style={{padding: 10}}>
                    {this.renderBtnAlterChamado()}           
                </View>
                <View >
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={()=> this.closeModal()}
                    >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, textAlign: 'center', paddingTop: 1 }}>Faça as alterações: </Text>
                           
                            <TextInput placeholder='Título' style={{ fontSize: 20, height: 45 }}
                                onChangeText={(texto) => this.setState({titulo:texto})} value={this.state.titulo}/>
                                
                            <TextInput placeholder='Descrição' style={{ fontSize: 20, height: 45 }}
                                onChangeText={(texto) => this.setState({descricao:texto})} value={this.state.descricao}/>
                            
                            <Picker
                                selectedValue={this.state.prioridade}
                                onValueChange={(itemValue, itemIndex) => this.setState({ prioridade: itemValue })}>
                                {this
                                    .items
                                    .map((i, index) => (<Picker.Item key={index} label={i.label} value={i.value} />))}
                            </Picker>
                            
                            <TextInput placeholder='Quem será atendido?' style={{ fontSize: 20, height: 45 }}
                                onChangeText={(texto) => this.setState({colaborador:texto})} value={this.state.colaborador}/>
                                

                        </View>

                        

                        <View>
                            <Button title="Enviar" color='#1E90FF' onPress={() =>                     
                            this._atualizaChamado()}  />            
                        </View>
                    </Modal>
                </View>
                
            </View>            
            
        )
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

export default connect(null, { 
                                atualizaChamado, 
                                excluirChamado, 
                               
                                })(DetalheChamado);

const styles = StyleSheet.create({    
    container: {     
        height: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 2
      },
      map: {  
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },    
})