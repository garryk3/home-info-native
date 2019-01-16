import React from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, ToolbarAndroid, Button, Alert } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <ScrollView>
            {[1,2,3,4,5,6].map(() => {
                return <Text>Open up App.js to start working on your app!</Text>
            })}
            <StatusBar
                backgroundColor="blue"
                barStyle="light-content"
                currentHeight={500}
            />
            <ToolbarAndroid
                logo={require('./assets/icon.png')}
                title="AwesomeApp"
                actions={[{title: 'Settings', icon: require('./assets/icon.png'), show: 'always'}]}
                onActionSelected={this.onActionSelected}
            />
            <Button
                onPress={() => {
                    Alert.alert('You tapped the button!');
                }}
                title="Press Me"
            />
        </ScrollView>
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
