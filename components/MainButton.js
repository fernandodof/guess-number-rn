import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from './../constants/colors';

const MainButton = props => {
	return <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
		<View style={styles.button}>
			<Text style={styles.buttontext}>{props.children}</Text>
		</View>
	</TouchableOpacity>
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25
	},
	buttontext: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18,
		textAlign: 'center'
	}
});

export default MainButton;