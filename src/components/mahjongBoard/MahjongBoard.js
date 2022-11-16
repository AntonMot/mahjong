import React, { useState, useEffect, useRef }  from "react";
import MahjongItem from "../mahjongItem/MahjongItem";
import PrimeNumbersArray from "../../helpers/utils";
import style from "./mahjongBoard.scss";
import classNames from "classnames";

const MahjongBoard = () => {

	const classes = classNames(
		style.link,
		'mahjong-board'
	);

	const cardsNumber = 32;
	const initialState0 = [];
	for (let i = 0; i < cardsNumber; i++) {
		initialState0.push({
			id: i,
			key: i,
			status: 'visible',
			tempStatus: '',
		})
	}

	const [boardState, setBoardState] = useState(initialState0);

	const clickCount = useRef(0);
	const recentClickNumber = useRef(null);
	const recentClickId = useRef(null);

	useEffect(() => {
		recentClickNumber.current = null;
		recentClickId.current = null;
		clickCount.current = 0;
		const numbersArray = PrimeNumbersArray(55);
		numbersArray.sort((a, b) => {return 0.5 - Math.random()});
		const initialState = [];
		for (let i = 0; i < numbersArray.length; i++) {
			initialState.push({
				id: i,
				key: numbersArray[i],
				status: 'visible',
				tempStatus: 'initial',
			})
		}
		setBoardState(initialState);
		const stateHidden = initialState.map(e => ({...e, status: 'hidden', tempStatus: ''}));

		setTimeout(() => {
			setBoardState(stateHidden);
		}, 5000);
	}, []);

	const handleClick = (number, isRevealed, id, tempStatus) => {
		if ( tempStatus == 'in-progress' || tempStatus == 'completed' || tempStatus == 'initial' ) {
			return;
		}
		clickCount.current = clickCount.current + 1;

		// first click
		if ( clickCount.current < 2 ) {
			firstClickHandle(number, id);

		// second click
		} else {
			// correct card
			if ( number == recentClickNumber.current ) {
				secondCorrectClickHandle(number, id);
			// incorrect card
			} else {
				secondIncorrectClickHandle(number, id);
			}
		}
	};

	const firstClickHandle = (number, id) => {
		updateClickData(clickCount.current, number, id);

		boardState[id] = {
			id: id,
			key: number,
			status: 'visible',
			tempStatus: 'in-progress',
		};
		const updatedState = structuredClone(boardState);
		setBoardState(updatedState);
	};

	const secondCorrectClickHandle = (number, id) => {
		boardState[id] = {
			id: id,
			key: number,
			status: 'visible',
			tempStatus: 'completed',
		};
		boardState[recentClickId.current] = {
			id: recentClickId.current,
			key: recentClickNumber.current,
			status: 'visible',
			tempStatus: 'completed',
		};
		const updatedState = structuredClone(boardState);
		setBoardState(updatedState);

		updateClickData();
	};

	const secondIncorrectClickHandle = (number, id) => {
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
		boardState[recentClickId.current] = {
			id: recentClickId.current,
			key: recentClickNumber.current,
			status: 'hidden',
			tempStatus: '',
		};
		const updatedStateHidden = structuredClone(boardState);

		updateClickData();

		setTimeout(() => {
			setBoardState(updatedStateHidden);
		}, 500);
	};

	const updateClickData = (count = 0, number = null, id = null) => {
		recentClickNumber.current = number;
		recentClickId.current = id;
		clickCount.current = count;
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
						key={item.id}
					/>
				))
			}
		</div>
	);
}

export default MahjongBoard;