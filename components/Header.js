import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
	return (
		<View style={styles.header}>
			<TitleText style={styles.headerTitle}>{props.title}</TitleText>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 90,
		padding: 36,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitle: {
		color: '#f1f1f1',
		fontSize: 18,
	}
})

export default Header;