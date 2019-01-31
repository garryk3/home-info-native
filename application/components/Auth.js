import React from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';

import Colors from './../constants/Colors';

export default class Auth extends React.Component {

	state = {
		inputName: '',
		inputPassword: ''
	};

	onPressLogin = () => {
		this.props.onAuth({
			name: this.state.inputName,
			password: this.state.inputPassword
		})
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Text style={styles.text}>Для продолжения работы необходимо авторизоваться</Text>
					<TextInput
						style={styles.input}
						onChangeText={(text) => this.setState({inputName: text})}
						value={this.state.inputName}
					/>
					<TextInput
						style={styles.input}
						onChangeText={(text) => this.setState({inputPassword: text})}
						value={this.state.inputPassword}
					/>
					<Button
						onPress={this.onPressLogin}
						title="Авторизоваться"
						disabled={!this.state.inputPassword || !this.state.inputName}
						color={Colors.btnBackground}
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 15,
		backgroundColor: Colors.authBackground,
	},
	innerContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		marginBottom: 24,
		textAlign: 'center'
	},
	input: {
		width: 200,
		height: 40,
		backgroundColor: Colors.inputBackground,
		borderWidth: 1,
		padding: 10,
		marginBottom: 24
	}
});