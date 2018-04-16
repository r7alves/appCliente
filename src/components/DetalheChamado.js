import React, { Component } from 'react';
import { 
    View, Text, SectionList, 
    StyleSheet, Dimensions, 
    Button, Picker, Modal, TextInput
} from 'react-native';
import { atenderChamado } from '../actions/AppActions';
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
        chamadoStatus: this.props.chamadoDados.status
    };
    openModal() {
        this.setState({modalVisible:true});
    }
    closeModal() {
        this.setState({modalVisible:false});
    }
    renderBtnAtenderChamado() {
        console.log(this.props.chamadoDados.status)
        if (this.props.chamadoDados.status == 'aberto') {
            return (
                <Button title="Editar Chamado" color='#1E90FF' onPress={() =>this.openModal()}  />                
            )
        }
        
    }
    renderDate() {
        console.log(this.props.chamadoDados.status)
        if (this.props.chamadoDados.status == 'aberto') {
            return (
                <Text style={{ fontSize:20, height: 45}} >Criado em: {this.props.chamadoDados.createdAt}</Text> 
            )
        }
        <Text style={{ fontSize:20, height: 45}} >Atualizado em: {this.props.chamadoDados.updateAt}</Text>                
        
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>                                
                    <MapView style={styles.map} region={{
                            latitude: this.props.chamadoDados.latitude,
                            longitude: this.props.chamadoDados.longitude,
                            longitudeDelta: 0.1,
                            latitudeDelta:0.1
                        }} 
                        showsUserLocation
                        showsMyLocationButton
                        toolbarEnabled
                    >
                        <MapView.Marker 
                            coordinate={{ latitude: this.props.chamadoDados.latitude, longitude: this.props.chamadoDados.longitude }} 
                            title={this.props.chamadoDados.cliente} 
                            description={this.props.chamadoDados.titulo}
                            showCallout                        
                        />          
                    </MapView>                                
                </View>
                <View style={{flex:1, padding:10}}>
                    <Text style={{ fontSize:20, height: 45}} >Descrição: {this.props.chamadoDados.descricao}</Text>
                    <Text style={{ fontSize:20, height: 45}} >Prioridade: {this.props.chamadoDados.prioridade}</Text>
                    <Text style={{ fontSize:20, height: 45}} >Status do Chamado: {this.props.chamadoDados.status}</Text>             
                    {this.renderDate()} 
                    
                </View>
                
                <View style={{padding: 10}}>
                    {this.renderBtnAtenderChamado()}           
                </View>
                <View>
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={()=> this.closeModal()}
                    >
                    
                        <View style={{flex:1, padding:10}}>
                            <Text>{this.props.chamadoDados.titulo}</Text>
                            <Text>{this.props.chamadoDados.descricao}</Text>
                            <Text>{this.props.chamadoDados.prioridade}</Text>
                                         
                             
                            <Text>{this.props.uid}</Text> 
                        </View>
                        <View style={{ 
                            flex: 1,
                            justifyContent: 'center',                            
                        }}>
                        
                            <TextInput placeholder="Diagnostico do Problema" multiline style={{fontSize:14}}/>
                            <TextInput placeholder="Atividades Realizadas" multiline style={{fontSize:14}}/>                            
                            <Picker mode={'dropdown'}
                                selectedValue={this.state.chamadoStatus}
                                onValueChange={(itemValue, itemIndex) => this.setState({chamadoStatus: itemValue})}
                            >
                                <Picker.Item label="Aberto" value="aberto" />
                                <Picker.Item label="Em Atendimento" value="atendimento"/>
                                <Picker.Item label="Em Estudo" value="estudo" />
                                <Picker.Item label="Resolvido" value="resolvido" />
                                <Picker.Item label="Sem Solução" value="sem-solução" />
                                <Picker.Item label="Fechado" value="fechado" />
                            </Picker>
                        </View>      
                        <View>
                            <Button title="Enviar" color='#115E54' onPress={() =>                     
                            atenderChamado(this.props.chamadoDados.email, this.props.uid)}  />            
                        </View>
                    </Modal>
                </View>
                
            </View>            
            
        )
    }
}
mapStateToProps = state => {
}
export default connect(null, {atenderChamado})(DetalheChamado);

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