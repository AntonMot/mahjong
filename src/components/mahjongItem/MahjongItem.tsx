import style from "./mahjongItem.scss";
import classNames from 'classnames';
import React from "react";

type Props = {
	number: number,
	isRevealed: string,
	id: number,
	handleClick: (number: number, isRevealed: string, id: number, tempStatus: string) => void,
	tempStatus: string,
	key: number,
}

const MahjongItem = (props: Props) => {

	const {number, isRevealed, id, tempStatus} = props;

	const classes = classNames(
		style.link,
		// isRevealed,
		'mahjong-item',
		tempStatus,
	);


	const clickHandler = () => {
		props.handleClick(number, isRevealed, id, tempStatus);
	};

	return (
		<button className={classes} onClick={() => clickHandler()}>
			<span className="item-number">
				{'visible' == isRevealed ? number : ''}
			</span>
		</button>
	);
}

export default MahjongItem;