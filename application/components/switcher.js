import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from './../constants/Colors';

export default class Switcher extends React.Component {

    state = {
        show: this.props.isDefaultHidden || false
    }

    onPressBtn = () => {
        console.log('press', this.state.show)
        this.setState({ show: !this.state.show })
    }

    get renderContent() {
        if(this.state.show) {
            console.log('render', this.props.renderContent)
            return (
                <View styles={styles.container}>
                    {this.props.renderContent}
                    <Text>test</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    onPress={this.onPressBtn}
                    styles={styles.button}
                    title={this.props.btnText}
                    color={Colors.btnBackground}
                />
                {this.renderContent}
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    button: {
        marginBottom: 18,
        marginTop: 10,
    }
})