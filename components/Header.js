import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
	return (
		<View style={{
			...styles.headerBase,
			...Platform.select({
				ios: styles.headerIos,
				android: styles.headerAndroid
			})
		}}>
			<TitleText style={styles.headerTitle}>{props.title}</TitleText>
		</View>
	);
};

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
	headerBase: {
		width: '100%',
		height: 90,
		padding: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerAndroid: {
		backgroundColor: Colors.primary
	},
	headerIos: {
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	},
	headerTitle: {
		color: isAndroid ? '#f1f1f1' : Colors.primary,
		fontSize: 18,
	}
})

export default Header;