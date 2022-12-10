/*ROT13 is a simple letter substitution cipher that replaces a letter
with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.

Create a function that takes a string and returns the string ciphered with Rot13.
If there are numbers or special characters included in the string,
they should be returned as they are. Only letters from the latin/english alphabet
should be shifted, like in the original Rot13 "implementation".*/

function rot13(message){
    return message.split("").map((item, i) => {
        let code = item.codePointAt(0),
            a = 97, z = 122, A = 65, Z = 90;
        if (code>= A && code <= Z || code >= a && code <= z) {
            let range = code >= a && code <= z ? 122 : 90;
            code = code + 13 > range ? code - 13 : code + 13;
            return String.fromCodePoint(code);
        } else {
            return item;
        }
    }).join("");
}

console.log("test", "/ grfg", rot13("test"));
console.log("Test", "/ Grfg", rot13("Test"));
console.log("az", "/ ", rot13("az"));
console.log("AZ", "/ ", rot13("AZ"));


const rot13_2 = str => str.replace(/[a-z]/gi, letter =>
    String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13: -13)));


console.log("test", "/ grfg", rot13_2("test"));
console.log("Test", "/ Grfg", rot13_2("Test"));


function rot13_3(message){
    const codeA = 'A'.charCodeAt(0),
        codeZ = 'Z'.charCodeAt(0),
        codea = 'a'.charCodeAt(0),
        codez = 'z'.charCodeAt(0);
    return message.split('').map(function(char) {
        let code = char.charCodeAt(0);
        if(codeA <= code && code <= codeZ){
            return String.fromCharCode(((code - codeA) + 13) % 26 + codeA);
        } else if(codea <= code && code <= codez){
            return String.fromCharCode(((code - codea) + 13) % 26 + codea);
        }
        return char;
    }).join('');
}

console.log("test", "/ grfg", rot13_3("test"));
console.log("Test", "/ Grfg", rot13_3("Test"));