import React, { useState } from "react";
import style from "./mahjongItem.scss";
import classNames from 'classnames';

const MahjongItem = (props) => {

	const {number, isRevealed, id, tempStatus} = props;

	const classes = classNames(
		style.link,
		// isRevealed,
		'mahjong-item',
		tempStatus,
	);

	const clickHandler = (e) => {
		if ( tempStatus == 'in-progress' || tempStatus == 'completed' ) {
			return;
		}

		const clickCount = localStorage.getItem('clickCount');
		localStorage.setItem('clickCount', +clickCount + 1);

		// first click
		if ( localStorage.getItem('clickCount') < 2 ) {
			localStorage.setItem('recentClickNumber', number);
			localStorage.setItem('recentClickId', id);

			props.boardState[id] = {
				id: id,
				key: number,
				status: 'visible',
				tempStatus: 'in-progress',
			};
			const updatedState = structuredClone(props.boardState);
			props.handleClick(updatedState);

		// second click
		} else {
			// correct card
			if ( number == localStorage.getItem('recentClickNumber' ) ) {
				props.boardState[id] = {
					id: id,
					key: number,
					status: 'visible',
					tempStatus: 'completed',
				};
				props.boardState[parseInt(localStorage.getItem('recentClickId' ))] = {
					id: parseInt(localStorage.getItem('recentClickId' )),
					key: parseInt(localStorage.getItem('recentClickNumber' )),
					status: 'visible',
					tempStatus: 'completed',
				};
				const updatedState = structuredClone(props.boardState);
				props.handleClick(updatedState);
				localStorage.setItem('recentClickNumber', null);
				localStorage.setItem('recentClickId', null);
				localStorage.setItem('clickCount', 0);

			// incorrect card
			} else {
				props.boardState[id] = {
					id: id,
					key: number,
					status: 'visible',
					tempStatus: 'in-progress',
				};
				const updatedState = structuredClone(props.boardState);
				props.handleClick(updatedState);

				props.boardState[id] = {
					id: id,
					key: number,
					status: 'hidden',
					tempStatus: '',
				};
				props.boardState[parseInt(localStorage.getItem('recentClickId' ))] = {
					id: parseInt(localStorage.getItem('recentClickId' )),
					key: parseInt(localStorage.getItem('recentClickNumber' )),
					status: 'hidden',
					tempStatus: '',
				};
				const updatedStateHidden = structuredClone(props.boardState);

				localStorage.setItem('recentClickNumber', null);
				localStorage.setItem('clickCount', 0);
				localStorage.setItem('recentClickId', null);
				setTimeout(() => {
					props.handleClick(updatedStateHidden);
				}, 500);
			}
		}
	}

	return (
		<button className={classes} onClick={(e) => clickHandler(e)} >
			<span className="item-number">
				{'visible' == isRevealed ? number : ''}
			</span>
		</button>
	)
}

export default MahjongItem;