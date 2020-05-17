import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

import Colors from './../constants/colors';
import PlatformConstant from './../constants/platformConstant';

const MainButton = props => {
	const ButtonComponent = Platform.OS === PlatformConstant.ANDROID && Platform.Version >= 21
		? TouchableNativeFeedback
		: TouchableOpacity;

	return (
		<View style={styles.buttonContainer}>
			<ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
				<View style={styles.button}>
					<Text style={styles.buttontext}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	)
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 25,
		overflow: 'hidden'
	},
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