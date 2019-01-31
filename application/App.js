import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Auth from './components/Auth';

import transport from './config/axios-client';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isAuth: false
  };

  _onAuth = async (params) => {
    await this._saveStorageUserData(params);

    this._setTransportAuthConfig(params);

    await this._loadDomoticzInfo();

    this.setState({
      isAuth: true
    });
  };

  _setTransportAuthConfig = (params) => {
    transport.defaults.auth = {
      username: params.name,
      password: params.password
    };
  };

  _saveStorageUserData = (data) => {
    try {
      AsyncStorage.setItem('user', data)
    } catch (err) {
      console.error(err);
    }
  };

  _loadResourcesAsync = async () => {
    // transport.get('http://localhost:9000/api/v1/system/getVersion').then((res) => {
    //   console.log('response', res)
    // }).catch(console.error)

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

  _loadDomoticzInfo = () => {
    return transport.get('/system/getVersion').then((res) => {
      console.log('response', res)
    }).catch(console.error)
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isAuth) {
      return <Auth onAuth={this._onAuth} />
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
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
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
