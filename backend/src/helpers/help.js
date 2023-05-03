const checkIfArraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

export const uniqueRates = (rates, factor) => {
    let match = true;

    while (match) {
        let arr1 = rates.slice(0, factor);
        let arr2 = rates.slice(factor, factor * 2);
        if (checkIfArraysMatch(arr1, arr2)) {
            rates = rates.slice(factor);
        } else {
            match = false;
        }
    }

    return rates;
}
