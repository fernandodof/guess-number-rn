import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartgameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return <AppLoading startAsync={fetchFonts}
			onFinish={() => { setDataLoaded(true) }}
			onError={(err) => console.log(err)}></AppLoading>
	}

	const configureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};

	const gameOverHandler = numbberOfRounds => {
		setGuessRounds(numbberOfRounds);
	};

	let content = <StartGameScreen onStartGame={startGameHandler}></StartGameScreen>;

	if (userNumber && guessRounds <= 0) {
		content = <GameScreen choice={userNumber} onGameOver={gameOverHandler}></GameScreen>;
	} else if (guessRounds > 0) {
		content = <GameOverScreen numberOfRounds={guessRounds} number={userNumber} onRestart={configureNewGameHandler}></GameOverScreen>;
	}

	return (
		<View style={styles.screen}>
			<Header title='Guess a number'></Header>
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
