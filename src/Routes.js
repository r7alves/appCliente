import React from 'react';
import { Router, Scene} from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import Principal from './components/Principal';
import Chamados from './components/Chamados';
import ClienteChamados from './components/ClienteChamados';
import DetalheChamado from './components/DetalheChamado';
import AddChamado from './components/AddChamado';


export default props => (
    <Router navigationBarStyle={{ 
        backgroundColor: '#2b4b99'}}
        titleStyle={{ color: '#FFF'}}
    >
        <Scene key="root">
            <Scene key='formLogin' component={FormLogin} title="Login" initial hideNavBar={true}  initial/>
            <Scene key='principal' component={Principal} title="Tela Principal" hideNavBar={true}  />
            <Scene key='clienteChamados' component={ClienteChamados} title="Tela Principal" hideNavBar={false}  />
            <Scene key='detalheChamado' component={DetalheChamado} title="Detalhes do Chamado" hideNavBar={false}  />
            <Scene key='add' component={AddChamado} title="Novo Chamado" hideNavBar={false}  />
            
        </Scene>
    </Router>
);


