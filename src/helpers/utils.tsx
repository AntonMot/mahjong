const PrimeNumbersArray = (n : number) => {
	const primeNumbersArray : number[] = [];

	// get array of prime numbers in range n
	for (let i : number = 1; i <= n; i++) {
		let flag : number = 0;
		for (let j : number = 2; j < i; j++) {
			if (0 === i % j) {
				flag = 1;
				break;
			}
		}
		if (i > 1 && 0 === flag) {
			primeNumbersArray.push(i);
		}
	}

	// duplicate values to have length 32
	return primeNumbersArray.flatMap( i => [i,i]);
};

export default PrimeNumbersArray;