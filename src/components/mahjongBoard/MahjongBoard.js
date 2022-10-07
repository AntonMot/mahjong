import React, { useState, useEffect }  from "react";
import MahjongItem from "../mahjongItem/MahjongItem";
import style from "./mahjongBoard.scss";
import classNames from "classnames";

const PrimeNumbersArray = () => {
	const primeNumbersArray = [];

	// get array of prime numbers in range 160
	for (let i = 1; i <= 160; i++) {
		let flag = 0;
		for (let j = 2; j < i; j++) {
			if (0 === i % j) {
				flag = 1;
				break;
			}
		}
		if (i > 1 && 0 === flag) {
			primeNumbersArray.push(i);
		}
	}

	// create random modifier to slice array of length 16
	let randomModifier = Math.floor(Math.random() * 10);

	// slice array to have length 16 with random modifier, duplicate values to have length 32 and sort random
	return primeNumbersArray.slice(randomModifier, +randomModifier + 16).flatMap( i => [i,i]);
};

const MahjongBoard = () => {

	const numbersArray = PrimeNumbersArray();
	numbersArray.sort(function(a, b){return 0.5 - Math.random()});

	const classes = classNames(
		style.link,
		'mahjong-board'
	);

	const initialState = [];
	for (let i = 0; i < numbersArray.length; i++) {
		initialState.push({
			id: i,
			key: numbersArray[i],
			status: 'visible',
			tempStatus: '',
		})
	}
	const stateHidden = initialState.map(e => ({...e, status: 'hidden'}));

	const [boardState, setBoardState] = useState(initialState);

	useEffect(() => {
		localStorage.setItem('clickCount', 0);
		localStorage.setItem('recentClickNumber', null);
		localStorage.setItem('recentClickId', null);
		setTimeout(() => {
			setBoardState(stateHidden);
		}, 5000);
	}, []);

	const handleClick = (newValue) => {
		setBoardState(newValue);
	};

	return (
		<div className={classes}>
			{
				boardState.map((item) => (
					<MahjongItem
						number={item.key}
						isRevealed={item.status}
						id={item.id}
						handleClick={handleClick}
						boardState={boardState}
						tempStatus={item.tempStatus}
					/>
				))
			}
		</div>
	);
}

export default MahjongBoard;