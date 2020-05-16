import React, { useState, useEffect } from 'react';
import {
	Alert,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Button,
	Keyboard,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import Input from '../components/Input';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

	const numberInputHandler = inputBodyText => {
		setEnteredValue(inputBodyText.replace(/[^0-9]/g, ''));
	};

	const resetInputHandler = () => {
		setEnteredValue('');
	};

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get('window').width / 4);
		};

		Dimensions.addEventListener('change', updateLayout);

		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert('Invalid number', 'Number has to be beetwen 1 and 99', [{ BodyText: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
			return;
		}
		setSelectedNumber(chosenNumber);
		setConfirmed(true);
		setEnteredValue('');
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.sumaryContainer}>
				<BodyText>You selected</BodyText>
				<NumberContainer number={selectedNumber}></NumberContainer>
				<View>
					<MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
				</View>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
					<View style={styles.screen}>
						<BodyText style={styles.title}>Start a new game</BodyText>
						<Card style={styles.inputContainer}>
							<BodyText>Select a number</BodyText>
							<Input style={styles.input}
								blurOnSubmit
								autoCapitalize='none'
								autoCorrect={false}
								keyboardType='number-pad'
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}>
							</Input>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button title='Reset' color={Colors.accent} onPress={resetInputHandler} ></Button>
								</View>
								<View style={{ width: buttonWidth }}>
									<Button title='Confirm' color={Colors.primary} onPress={confirmInputHandler}></Button>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	inputContainer: {
		minWidth: 300,
		width: '80%',
		maxWidth: '95%',
		alignItems: 'center'
	},
	input: {
		width: 50,
		textAlign: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	sumaryContainer: {
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
		alignItems: 'center'
	}
});

export default StartGameScreen;