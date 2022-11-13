import React from "react";

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

export default PrimeNumbersArray;