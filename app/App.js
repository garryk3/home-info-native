// import React from 'react';
// import { StyleSheet, Text, ScrollView, View, StatusBar, ToolbarAndroid, Button, Alert } from 'react-native';

//import Heading from './components/heading';

// export default class App extends React.Component {
//   render() {
//     return (
//         <ScrollView
//             contentContainerStyle={styles.container}
//         >
//             {/*<Heading>Система умного дома Domoticz</Heading>*/}
//             <Text>Выберите интересующий Вас раздел</Text>
//             {/*<View style={styles.content}>*/}
//                 {/*<Button*/}
//                     {/*style={styles.button}*/}
//                     {/*onPress={() => {*/}
//                         {/*Alert.alert('You tapped the button!');*/}
//                     {/*}}*/}
//                     {/*title="О системе"*/}
//                 {/*/>*/}
//                 {/*<Button*/}
//                     {/*style={styles.button}*/}
//                     {/*onPress={() => {*/}
//                         {/*Alert.alert('You tapped the button!');*/}
//                     {/*}}*/}
//                     {/*title="Нагреватель"*/}
//                 {/*/>*/}
//                 {/*<Button*/}
//                     {/*style={styles.button}*/}
//                     {/*onPress={() => {*/}
//                         {/*Alert.alert('You tapped the button!');*/}
//                     {/*}}*/}
//                     {/*title="Нагреватель"*/}
//                 {/*/>*/}
//                 {/*<Button*/}
//                     {/*style={styles.button}*/}
//                     {/*onPress={() => {*/}
//                         {/*Alert.alert('You tapped the button!');*/}
//                     {/*}}*/}
//                     {/*title="Нагреватель"*/}
//                 {/*/>*/}
//                 {/*<Button*/}
//                     {/*style={styles.button}*/}
//                     {/*onPress={() => {*/}
//                         {/*Alert.alert('You tapped the button!');*/}
//                     {/*}}*/}
//                     {/*title="Нагреватель"*/}
//                 {/*/>*/}
//                 {/*<Button*/}
//                     {/*style={styles.button}*/}
//                     {/*onPress={() => {*/}
//                         {/*Alert.alert('You tapped the button!');*/}
//                     {/*}}*/}
//                     {/*title="Нагреватель"*/}
//                 {/*/>*/}
//             {/*</View>*/}
//         </ScrollView>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//       paddingTop: 24,
//       flex: 1,
//       backgroundColor: '#D1EFEA',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//   },
//   content: {
//       marginTop: 24,
//       padding: 8,
//       display: 'flex',
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between'
//   },
//   button: {
//       display: 'flex',
//       width: '50%',
//       marginTop: 16,
//       marginBottom: 16
//     }
// });


import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
    render() {
        return (
            <View>
                <Text>Hello world!</Text>
            </View>
        );
    }
}