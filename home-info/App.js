import React, { Fragment } from 'react';
import { StyleSheet, Text, View, StatusBar, ToolbarAndroid } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <Fragment>
          <StatusBar
              backgroundColor="blue"
              barStyle="light-content"
              currentHeight={500}
          />
          <ToolbarAndroid
              logo={require('./assets/icon.png')}
              title="AwesomeApp"
              actions={[{title: 'Settings', icon: require('./assets/icon.png'), show: 'always'}]}
              onActionSelected={this.onActionSelected} />
          <Text>Open up App.js to start working on your app!</Text>
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
