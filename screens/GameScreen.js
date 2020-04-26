
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const renderListItem = (value, numberOfRounds) => (
	<View key={value} style={styles.listItem}>
		<BodyText>#{numberOfRounds}</BodyText>
		<BodyText>{value}</BodyText>
	</View>);

const direction = {
	LOWER: 'lower',
	GREATER: 'greater'
};

const LOWER_BOUND = 1;
const HIGHER_BOUND = 100;

const GameScreen = props => {
	const { choice, onGameOver } = props;

	const initialGuess = generateRadomNumber(LOWER_BOUND, HIGHER_BOUND, choice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const currentLow = useRef(LOWER_BOUND);
	const currentHigh = useRef(HIGHER_BOUND);


	// Runs after every render cycle 
	useEffect(() => {
		if (currentGuess === choice) {
			onGameOver(pastGuesses.length);
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
			currentLow.current = currentGuess + 1;
		}

		const nextNumber = generateRadomNumber(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(currentPastGueses => [nextNumber, ...currentPastGueses]);
	};

	return (
		<View style={styles.screen}>
			<BodyText>Oppnent's guess</BodyText>
			<NumberContainer number={currentGuess}></NumberContainer>
			<Card style={styles.card}>
				<MainButton onPress={nextGuessHandler.bind(this, direction.LOWER)}>
					<Ionicons name="md-remove" size={24} color="white"></Ionicons>
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, direction.GREATER)}>
					<Ionicons name="md-add" size={24} color="white"></Ionicons>
				</MainButton>
			</Card>
			<View style={styles.list}>
				<ScrollView>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView>
			</View>
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
		width: 300,
		maxWidth: '80%'
	},
	list: {
		width: '80%',
		flex: 1
	},
	listItem: {
		borderColor: '#ddd',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default GameScreen;