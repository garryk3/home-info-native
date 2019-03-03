import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Home from './Home';

class Main extends React.PureComponent {

    state = {
        view: 'home'
    }

    changeView = (view) => {
        this.setState({ view })
    }

    renderContent = (view) => {
        switch(this.state.view) {
            case 'home': {
                return <Home onPressBtn = {this.changeView} />
                break;
            }
            default: {
                return null
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Выберите элемент для управления</Text>
                {this.renderContent(this.state.view)}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24
    }
})

export default Main;