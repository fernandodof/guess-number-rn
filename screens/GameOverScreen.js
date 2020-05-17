import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import Colors from './../constants/colors';

import MainButton from './../components/MainButton';

const DIMENSIONS = Dimensions.get('window');

const GameOverScreen = props => {
	return (
		<ScrollView>
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
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15
	},
	gameOver: {
		fontSize: 22
	},
	imageContainer: {
		width: DIMENSIONS.width * 0.4,
		height: DIMENSIONS.width * 0.4,
		borderRadius: DIMENSIONS.width * 0.4 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: DIMENSIONS.height / 40
	},
	image: {
		width: '100%',
		height: '100%'
	},
	resultContainer: {
		width: '80%',
		marginBottom: DIMENSIONS.height / 60
	},
	resultText: {
		textAlign: 'center',
		fontSize: DIMENSIONS.height <= 480 ? 16 : 20
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	}
});

export default GameOverScreen;