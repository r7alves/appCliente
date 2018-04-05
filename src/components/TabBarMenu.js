import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import {habilitaLogin} from '../actions/AutenticacaoActions';

const TabBarMenu = props => (
    <View style={{ backgroundColor:"#2b4b99", elevation: 4, marginBottom:6 }}>
        <StatusBar backgroundColor="#2b4b99"/>

        {/* Tab Menu */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{ height: 50, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{ color: "#fff", fontSize: 20, textAlign: 'center'}}>Solutions Service</Text>
            </View>    
            <View style={{flexDirection: 'row', marginRight: 20}}>
                
                <View style={{justifyContent:'center'}}>
                    <TouchableHighlight onPress={
                        ()=> firebase.auth().signOut().then(()=> {Actions.formLogin(); props.habilitaLogin()} )
                    } underlayColor="#2b4b99">
                        {/* <Text style={{fontSize:20, color: 'white'}}>Sair</Text> */}
                        <Icon name="md-log-out" size={28} color="#fff" />
                    </TouchableHighlight>
                </View>
            </View>                            
        </View>
        <TabBar {...props} style={{ backgroundColor: "#2b4b99", elevation: 0}}/>        
    </View>
);

export default connect(null, {habilitaLogin})(TabBarMenu);