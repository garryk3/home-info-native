import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text} from 'react-native';

class Heading extends React.PureComponent {

	static propTypes = {
		children: PropTypes.string
	};

	render() {
		return <Text style={styles.container}>{this.props.children}</Text>
	}
}

const styles = StyleSheet.create({
	container: {
		fontSize: 24
	},
});

export default Heading;