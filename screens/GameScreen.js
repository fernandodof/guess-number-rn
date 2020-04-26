
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

const generateRadomNumber = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumer = Math.floor(Math.random() * (max - min)) + min;

	if (randomNumer === exclude) {
		return generateRadomNumber(min, max, exclude);
	}

	return randomNumer;
};

const direction = {
	LOWER: 'lower',
	GREATER: 'greater'
};

const LOWER_BOUND = 1;
const HIGHER_BOUND = 100;

const GameScreen = props => {
	const { choice, onGameOver } = props;

	const [currentGuess, setCurrentGuess] = useState(generateRadomNumber(LOWER_BOUND, HIGHER_BOUND, choice));
	const [numberOfRounds, setNumberofRounds] = useState(0);
	const currentLow = useRef(LOWER_BOUND);
	const currentHigh = useRef(HIGHER_BOUND);


	// Runs after every render cycle 
	useEffect(() => {
		if (currentGuess === choice) {
			onGameOver(numberOfRounds);
		}
	}, [currentGuess, choice, onGameOver]);

	const nextGuessHandler = dir => {
		if ((dir === direction.LOWER && currentGuess < choice) || (dir === direction.GREATER && currentGuess > choice)) {
			Alert.alert('Don\'t try to cheat', 'You know that this is clearly wrong......', [{ text: 'Okay :-(', style: 'cancel' }]);
			return;
		}

		if (dir === direction.LOWER) {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}

		const nextNumber = generateRadomNumber(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setNumberofRounds(currentNumberOfRounds => currentNumberOfRounds + 1);
	};

	return (
		<View style={styles.screen}>
			<BodyText>Oppnent's guess</BodyText>
			<NumberContainer number={currentGuess}></NumberContainer>
			<Card style={styles.card}>
				<MainButton onPress={nextGuessHandler.bind(this, direction.LOWER)}>LOWER</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, direction.GREATER)}>GREATER</MainButton>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	card: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 400,
		maxWidth: '90%'
	}
});

export default GameScreen;