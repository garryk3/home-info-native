import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Colors from '../constants/Colors';

export default class Switcher extends React.Component {

    state = {
        show: this.props.isDefaultHidden || false
    }

    onPressBtn = () => {
        if(this.props.onPress && !this.state.show) {
            this.props.onPress()
        }
        this.setState({ show: !this.state.show })
    }

    get renderContent() {
        if(this.state.show) {
            return (
                <View styles={styles.container}>
                    {this.props.renderContent}
                </View>
            )
        }
    }

    render() {
        return (
            <View styles={styles.wrapper}>
                <Button
                    onPress={this.onPressBtn}
                    styles={styles.button}
                    title={this.props.btnText}
                    color={Colors.btnBackground}
                />
                {this.renderContent}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    wrapper: {
        marginBottom: 18,
        marginTop: 10,
    }
})