import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import base64 from 'base-64';

import AppNavigator from './navigation/AppNavigator';

import Auth from './components/Auth';

import { DefaultContext } from './context/default';

import Transport from './transport';

export default class App extends React.Component {
  constructor() {
    super(...arguments);

    this.transport = new Transport();

    this.domoticzInfo = null;
  }

  state = {
    isLoadingComplete: false,
    isAuth: false,
    isCheckSavedUser: false
  };


  async componentDidMount() {
    const user = await AsyncStorage.getItem('user')
    
    this._onAuth(JSON.parse(user), true);
    this.setState({isCheckSavedUser: true})
  }

  _onAuth = async (user, withoutSaveToStorage) => {
    try {
      if(user && user.name && user.password) {
        !withoutSaveToStorage && await this._saveStorageUserData(user);
        this.transport.setAuthHeader(user);

        this.setState({
          isAuth: true
        });
      }
    } catch (err) {
        console.error(err);
    }
  };

  _saveStorageUserData = async (data) => {
    try {
      await AsyncStorage.removeItem('user');

      return AsyncStorage.setItem('user', JSON.stringify(data))
    } catch (err) {
      console.error(err);
    }
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isAuth && this.state.isCheckSavedUser) {
      return <Auth onAuth={this._onAuth} transport={this.transport} />
    } else if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
          />
      );
    } else {
      return (
          <DefaultContext.Provider value={{
            transport: this.transport,
          }}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </DefaultContext.Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
