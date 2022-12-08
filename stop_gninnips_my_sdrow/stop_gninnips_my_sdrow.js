/*Write a function that takes in a string of one or more words,
and returns the same string, but with all five or more letter words reversed
(Just like the name of this Kata). Strings passed in will consist
of only letters and spaces. Spaces will be included only when more than one word is present.

Examples:

spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw"
spinWords( "This is a test") => returns "This is a test"
spinWords( "This is another test" )=> returns "This is rehtona test"*/

function spinWords(string){
    return string.split(" ").map((item) => {
        return item.length > 4 ? item.split("").reverse().join("") : item;
    }).join(" ");
}

console.log(spinWords("Welcome"), "/ emocleW");
console.log(spinWords("Hey fellow warriors"), "/ Hey wollef sroirraw");
console.log(spinWords("This is a test"), "/ This is a test");
console.log(spinWords("This is another test"), "/ This is rehtona test");
console.log(spinWords("You are almost to the last test"), "/ You are tsomla to the last test");
console.log(spinWords("Just kidding there is still one more"), "/ Just gniddik ereht is llits one more");
console.log(spinWords("Seriously this is the last one"), "/ ylsuoireS this is the last one");

function spinWords_2(string){
    return string.replace(/\w{5,}/g, function(w) { return w.split('').reverse().join('') })
}

console.log(spinWords_2("Welcome"), "/ emocleW");
console.log(spinWords_2("Hey fellow warriors"), "/ Hey wollef sroirraw");
console.log(spinWords_2("This is a test"), "/ This is a test");
console.log(spinWords_2("This is another test"), "/ This is rehtona test");
console.log(spinWords_2("You are almost to the last test"), "/ You are tsomla to the last test");
console.log(spinWords_2("Just kidding there is still one more"), "/ Just gniddik ereht is llits one more");
console.log(spinWords_2("Seriously this is the last one"), "/ ylsuoireS this is the last one");

function spinWords_3(str) {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i].length >= 5)
            strArr[i] = strArr[i].split('').reverse().join('');
    }
    return strArr.join(' ');
}

console.log(spinWords_3("Welcome"), "/ emocleW");
console.log(spinWords_3("Hey fellow warriors"), "/ Hey wollef sroirraw");
console.log(spinWords_3("This is a test"), "/ This is a test");
console.log(spinWords_3("This is another test"), "/ This is rehtona test");
console.log(spinWords_3("You are almost to the last test"), "/ You are tsomla to the last test");
console.log(spinWords_3("Just kidding there is still one more"), "/ Just gniddik ereht is llits one more");
console.log(spinWords_3("Seriously this is the last one"), "/ ylsuoireS this is the last one");