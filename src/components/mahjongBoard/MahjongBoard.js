import React, { useState, useEffect }  from "react";
import MahjongItem from "../mahjongItem/MahjongItem";
import PrimeNumbersArray from "../../helpers/utils";
import style from "./mahjongBoard.scss";
import classNames from "classnames";

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