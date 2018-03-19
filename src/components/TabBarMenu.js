import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight} from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const TabBarMenu = props => (
    <View style={{ backgroundColor:"#2b4b99", elevation: 4, marginBottom:6 }}>
        <StatusBar backgroundColor="#2b4b99"/>

        {/* Tab Menu */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{ height: 50, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{ color: "#fff", fontSize: 20, textAlign: 'center'}}>Solutions Service</Text>
            </View>                                
        </View>
        <TabBar {...props} style={{ backgroundColor: "#2b4b99", elevation: 0}}/>        
    </View>
);

export default connect(null)(TabBarMenu);