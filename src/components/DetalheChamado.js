import React, { Component } from 'react';
import { 
    View, Text, SectionList, 
    StyleSheet, Dimensions, 
    Button, Picker, Modal, TextInput, Alert
} from 'react-native';
import { 
    atenderChamado, 
    excluirChamado,
    modificaAddChamadoTitulo 
    } from '../actions/AppActions';
import { connect } from 'react-redux';
import b64 from 'base-64';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPEC_RADIO = width/height;
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPEC_RADIO;

class DetalheChamado extends Component{
    state = {
            modalVisible: false,
            language: '',
            chamadoStatus: this.props.chamadoDados.status,
            prioridade: this.props.chamadoDados.prioridade,

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
        console.log('chamou esse console aqui caraio' + this.props.title)
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
                <View>
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={()=> this.closeModal()}
                    >
                    
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text>{this.props.chamadoDados.descricao}</Text>
                            <Text>{this.props.chamadoDados.prioridade}</Text>
                            <Text>{this.props.uid}</Text> 
                            <TextInput placeholder='Título' style={{ fontSize: 20, height: 45 }}
                                onChangeText={(texto) => this.props.modificaAddChamadoTitulo(texto)}
                                value={this.props.titulo} 
                                require={true} />


                        </View>

                        

                        <View>
                            <Button title="Enviar" color='#1E90FF' onPress={() =>                     
                            atualizarChamado(this.props.chamadoDados.email, this.props.uid)}  />            
                        </View>
                    </Modal>
                </View>
                
            </View>            
            
        )
    }
}
const mapStateToProps = (state) => (
    
    {
        titulo: state.ChamadoReducer.add_chamado_titulo,
        descricao: state.ChamadoReducer.add_chamado_descricao,
        prioridade: state.ChamadoReducer.add_chamado_prioridade,
        colaborador: state.ChamadoReducer.add_chamado_colaborador,
        
    }
     
)
export default connect(mapStateToProps, { 
                                atualizarChamado, 
                                excluirChamado, 
                                modificaAddChamadoTitulo
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