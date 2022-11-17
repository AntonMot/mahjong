const PrimeNumbersArray = (n) => {
	const primeNumbersArray = [];

	// get array of prime numbers in range n
	for (let i = 1; i <= n; i++) {
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

	// duplicate values to have length 32
	return primeNumbersArray.flatMap( i => [i,i]);
};

export default PrimeNumbersArray;