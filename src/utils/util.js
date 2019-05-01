
const utils = {
  generateRandonNumber: (numberOfDigit) => {
    let digit;
    if (!numberOfDigit || Number.isNaN(numberOfDigit)) {
      digit = 6;
    } else {
      digit = parseInt(Math.abs(numberOfDigit), 10);
    }

    return Math.floor((10 ** (digit - 1))
            + (Math.random() * (((10 ** digit) - (10 ** (digit - 1)) - 1))));
  },
};

export default utils;
