
    export const generateRandonNumber = (numberOfDigit) => {
        let digit;
        if (!numberOfDigit || isNaN(numberOfDigit)) {
            digit = 6;
        } else {
            digit = parseInt(Math.abs(numberOfDigit));
        }
        return Math.floor(Math.pow(10, digit - 1) + Math.random() * (Math.pow(10, digit) - Math.pow(10, digit - 1) - 1));
    }


