import React, { useState, useEffect, useRef }  from "react";
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

	const clickCount = useRef(0);
	const recentClickNumber = useRef(null);
	const recentClickId = useRef(null);

	useEffect(() => {
		recentClickNumber.current = null;
		recentClickId.current = null;
		clickCount.current = 0;
		setTimeout(() => {
			setBoardState(stateHidden);
		}, 5000);
	}, []);

	const handleClick = (number, isRevealed, id, tempStatus) => {
		if ( tempStatus == 'in-progress' || tempStatus == 'completed' ) {
			return;
		}
		clickCount.current = clickCount.current + 1;

		// first click
		if ( clickCount.current < 2 ) {
			recentClickNumber.current = number;
			recentClickId.current = id;

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
			if ( number == recentClickNumber.current ) {
				boardState[id] = {
					id: id,
					key: number,
					status: 'visible',
					tempStatus: 'completed',
				};
				boardState[parseInt( recentClickId.current )] = {
					id: parseInt( recentClickId.current ),
					key: parseInt( recentClickNumber.current ),
					status: 'visible',
					tempStatus: 'completed',
				};
				const updatedState = structuredClone(boardState);
				setBoardState(updatedState);

				recentClickNumber.current = null;
				recentClickId.current = null;
				clickCount.current = 0;

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
				boardState[parseInt( recentClickId.current )] = {
					id: parseInt( recentClickId.current ),
					key: parseInt( recentClickNumber.current ),
					status: 'hidden',
					tempStatus: '',
				};
				const updatedStateHidden = structuredClone(boardState);

				recentClickNumber.current = null;
				recentClickId.current = null;
				clickCount.current = 0;

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
						key={item.id}
					/>
				))
			}
		</div>
	);
}

export default MahjongBoard;