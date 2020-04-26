import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import Colors from './../constants/colors';

import MainButton from './../components/MainButton';

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<TitleText style={styles.gameOver}>The game is over!</TitleText>
			<View style={styles.imageContainer}>
				<Image source={require('./../assets/over.png')} style={styles.image} resizeMode='stretch'></Image>
			</View>
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>Your phone needed
				 <Text style={styles.highlight}> {props.numberOfRounds} </Text>
				 rounds to guess the number
				 <Text style={styles.highlight}> {props.number}</Text>
				</BodyText>
			</View>
			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gameOver: {
		fontSize: 22
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 20
	},
	image: {
		width: '100%',
		height: '100%'
	},
	resultContainer: {
		width: '80%',
		marginBottom: 10
	},
	resultText: {
		textAlign: 'center',
		fontSize: 18
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	}
});

export default GameOverScreen;