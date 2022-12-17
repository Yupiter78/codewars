/*Move the first letter of each word to the end of it,
then add "ay" to the end of the word. Leave punctuation marks untouched.

Examples
pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
pigIt('Hello world !');     // elloHay orldway !
*/

function pigIt(str){
    const marks = [".", ",", "-", "!", "?"];
    return str.split(" ")
        .map((word, i) => marks.includes(word) ?
            word : word.slice(1) + word[0] + "ay")
        .join(" ");
}
console.log(pigIt('Pig latin is cool !'),'/ igPay atinlay siay oolcay !');
console.log(pigIt('This is my string'),'/ hisTay siay ymay tringsay');


function pigIt_2(str){
    return str.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3")
}

console.log(pigIt_2('Pig latin is cool !'),'/ igPay atinlay siay oolcay !');
console.log(pigIt_2('This is my string'),'/ hisTay siay ymay tringsay');

function pigIt_3(str){
    return str.replace(/[a-z]+/gi, word => word.slice(1) + word[0] + 'ay' );
}

console.log(pigIt_3('Pig latin is cool !'),'/ igPay atinlay siay oolcay !');
console.log(pigIt_3('This is my string'),'/ hisTay siay ymay tringsay');