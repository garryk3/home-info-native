import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    button: {
        marginBottom: 18,
        paddingLeft: 18,
        paddingRight: 18
    }
});

const buttons = [{
    title: 'Бойлер',
    event: 'boiler'
},
{
    title: 'Свет',
    event: 'light'
},
{
    title: 'Розетки',
    event: 'plug'
},
{
    title: 'Режим',
    event: 'state'
}];

const Home = ({ onPressBtn }) => (
    <React.Fragment>
        {buttons.map(button => (
            <View
                key={button.title}
                style={styles.button}
            >
                <Button
                    title={button.title}
                    onPress={onPressBtn.bind(null, button.event)}
                />
            </View>
        ))}
    </React.Fragment>
);

Home.propTypes = { onPressBtn: PropTypes.func.isRequired };

export default Home;
