
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import BodyText from './BodyText';

const NumberContainer = props => {
	return (
		<View style={styles.container}>
			<BodyText style={styles.number}>{props.number}</BodyText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: Colors.primary,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	number: {
		color: Colors.accent,
		fontSize: 25
	}
});

export default NumberContainer;