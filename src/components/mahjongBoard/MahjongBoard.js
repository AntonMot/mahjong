import React, { useState, useEffect }  from "react";
import MahjongItem from "../mahjongItem/MahjongItem";
import PrimeNumbersArray from "../../helpers/utils";
import style from "./mahjongBoard.scss";
import classNames from "classnames";

const MahjongBoard = () => {

	const numbersArray = PrimeNumbersArray(160);
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

	const handleClick = (number, isRevealed, id, tempStatus) => {
		if ( tempStatus == 'in-progress' || tempStatus == 'completed' ) {
			return;
		}
		const clickCount = localStorage.getItem('clickCount');
		localStorage.setItem('clickCount', +clickCount + 1);

		// first click
		if ( localStorage.getItem('clickCount') < 2 ) {
			localStorage.setItem('recentClickNumber', number);
			localStorage.setItem('recentClickId', id);

			boardState[id] = {
				id: id,
				key: number,
				status: 'visible',
				tempStatus: 'in-progress',
			};
			const updatedState = structuredClone(boardState);
			setBoardState(updatedState);

			// second click
		} else {
			// correct card
			if (number == localStorage.getItem('recentClickNumber')) {
				boardState[id] = {
					id: id,
					key: number,
					status: 'visible',
					tempStatus: 'completed',
				};
				boardState[parseInt(localStorage.getItem('recentClickId'))] = {
					id: parseInt(localStorage.getItem('recentClickId')),
					key: parseInt(localStorage.getItem('recentClickNumber')),
					status: 'visible',
					tempStatus: 'completed',
				};
				const updatedState = structuredClone(boardState);
				setBoardState(updatedState);
				localStorage.setItem('recentClickNumber', null);
				localStorage.setItem('recentClickId', null);
				localStorage.setItem('clickCount', 0);

				// incorrect card
			} else {
				boardState[id] = {
					id: id,
					key: number,
					status: 'visible',
					tempStatus: 'in-progress',
				};
				const updatedState = structuredClone(boardState);
				setBoardState(updatedState);

				boardState[id] = {
					id: id,
					key: number,
					status: 'hidden',
					tempStatus: '',
				};
				boardState[parseInt(localStorage.getItem('recentClickId'))] = {
					id: parseInt(localStorage.getItem('recentClickId')),
					key: parseInt(localStorage.getItem('recentClickNumber')),
					status: 'hidden',
					tempStatus: '',
				};
				const updatedStateHidden = structuredClone(boardState);

				localStorage.setItem('recentClickNumber', null);
				localStorage.setItem('clickCount', 0);
				localStorage.setItem('recentClickId', null);
				setTimeout(() => {
					setBoardState(updatedStateHidden);
				}, 500);
			}

		}
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
						tempStatus={item.tempStatus}
					/>
				))
			}
		</div>
	);
}

export default MahjongBoard;