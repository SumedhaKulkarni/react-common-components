import util from './util';

it('should generate a random number of 6 digit when parameter passed is 6', () => {
    const num = util.generateRandonNumber(6);
    expect(num.toString().length).toBe(6);
});

it('should generate a random number of 5 digit when parameter passed is -5', () => {
    const num = util.generateRandonNumber(-5);
    expect(num.toString().length).toBe(5);
});

it('should generate a random number of 3 digit when decimal number is passed', () => {
    const num = util.generateRandonNumber(3.23);
    expect(num.toString().length).toBe(3);
});

it('should generate a random number of 6 digit when no parameter passed', () => {
    const num = util.generateRandonNumber();
    expect(num.toString().length).toBe(6);
});

it('should generate a random number of 7 digit when string 7 is passed', () => {
    const num = util.generateRandonNumber("7");
    expect(num.toString().length).toBe(7);
});

it('should generate a random number of 6 digit when invalid number is passed', () => {
    const num = util.generateRandonNumber("abc");
    expect(num.toString().length).toBe(6);
});