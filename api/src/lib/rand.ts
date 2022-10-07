const CHARSET = {
    UPPERCASE:'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHABET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    NUMBER:'0123456789'
}

function random(length:number, chars:string){
    const result = [];
    const len = chars.length;
    for (let i = length; i > 0 ; --i){
       result[i] = chars[Math.floor(Math.random()*len)];
    }

    return result.join('');
}

const uppercase = (length = 8) => random(length, CHARSET.UPPERCASE);
const alphabet = (length = 8) => random(length, CHARSET.ALPHABET);
const number = (length = 8) => random(length, CHARSET.NUMBER);

export default {
    uppercase, alphabet, number
}