import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import firebase from 'firebase';
import { View, Text} from 'react-native';
import Routes from './Routes';
import reducers from './reducers';



class App extends Component {
    componentWillMount() {
      var config = {
        apiKey: "AIzaSyCjxa5xSzDjOabh6NGALYh2qL5a9wCetd8",
        authDomain: "appsolution-18.firebaseapp.com",
        databaseURL: "https://appsolution-18.firebaseio.com",
        projectId: "appsolution-18",
        storageBucket: "",
        messagingSenderId: "823197720625"
      };
      firebase.initializeApp(config);
    }
    render () {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }    
}
export default App;