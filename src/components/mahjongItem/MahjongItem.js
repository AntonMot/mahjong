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
		props.handleClick(number, isRevealed, id, tempStatus);
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