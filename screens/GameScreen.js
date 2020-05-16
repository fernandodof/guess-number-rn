
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
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
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
	const currentLow = useRef(LOWER_BOUND);
	const currentHigh = useRef(HIGHER_BOUND);


	// Runs after every render cycle 
	useEffect(() => {
		if (currentGuess === choice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, choice, onGameOver]);

	useEffect(() => {
		const updateLayout = () => setAvailableDeviceHeight(Dimensions.get('window').height);

		Dimensions.addEventListener('change', updateLayout);

		return () => Dimensions.removeEventListener('change', updateLayout);
	});

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

	if (availableDeviceHeight < 500) {
		return (<ScrollView>
			<View style={styles.screen}>
				<BodyText>Oppnent's guess</BodyText>
				<View style={styles.landscapeControls}>
					<MainButton onPress={nextGuessHandler.bind(this, direction.LOWER)}>
						<Ionicons name="md-remove" size={24} color="white"></Ionicons>
					</MainButton>
					<NumberContainer number={currentGuess}></NumberContainer>
					<MainButton onPress={nextGuessHandler.bind(this, direction.GREATER)}>
						<Ionicons name="md-add" size={24} color="white"></Ionicons>
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
					</ScrollView>
				</View>
			</View>
		</ScrollView>);
	}

	return (
		<ScrollView>
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
				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
					</ScrollView>
				</View>
			</View>
		</ScrollView>
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
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		width: 400,
		maxWidth: '90%'
	},
	listContainer: {
		width: Dimensions.get('window').width < 350 ? '80%' : '60%',
		flex: 1,
	},
	list: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	listItem: {
		borderColor: '#ddd',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	landscapeControls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	}
});

export default GameScreen;