/*Complete the solution so that it strips all text that
follows any of a set of comment markers passed in.

Any whitespace at the end of the line should also be stripped out.


Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples
The output expected would be:

apples, pears
grapes
bananas
The code would be called like so:

var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"
*/

function solution(input, markers) {
     const arrStart = input.split("\n").reverse();
     const result = [];
     for (let i = arrStart.length; i > 0; i--) {
         let string = arrStart.pop();
         for (let marker of markers) {
             if (!string) continue;
             if (string.includes(marker)) {
                 result.push(string.slice(0, string.indexOf(marker)).trim());
                 string = null;
             }
         }
         if (string) {
             result.push(string.trim());
             string = null;
         }
     }
    return result.join("\n");
}


console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");


function solution_2(input, markers) {
    return input.split('\n').map(
        item => markers.reduce(
            (prev, cur) => {
                console.log("prev:", prev);
                console.log("cur:", cur);
                return prev.split(cur)[0].trim()
            }, item
        )
    ).join('\n')
}

console.log(solution_2("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_2("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");


function solution_3(input, markers){
    return input.replace(new RegExp("\\s?[" + markers.join("") + "].*(\\n)?", "gi"), "$1");
}

console.log(solution_3("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_3("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");


function solution_4(input, markers){
    return input.replace(new RegExp(`\\s*[${markers.join('|')}].+`,'g'),'');
}

console.log(solution_4("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_4("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");

function solution_5(input, markers) {
    let lines = input.split("\n");
    for (let i = 0; i < lines.length; ++i)
        for (let j = 0; j < markers.length; ++j)
            lines[i] = lines[i].split(markers[j])[0].trim();
    return lines.join("\n");
}

console.log(solution_5("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_5("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");

function solution_6(input, markers){
    //`RegExp(..)` has some reasonable utility: to dynamically define the pattern for a regular expression.
    //https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch3.md#object-function-and-regexp
    let pattern = new RegExp("[" +markers.join("")+ "]");

    return input.split("\n").map(function(a){
        return a.split(pattern)[0].trim();
    }).join("\n");
}

console.log(solution_6("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_6("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");

const solution_7 = (input, markers) =>
    input.split('\n')
        .map(str => markers
            .reduce((str, marker) => str.split(marker)[0].trim(), str)).join('\n');

console.log(solution_7("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_7("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");

solution_8 = (s,[x,y]) => s.split`\n`
    .map(e => e.split(x)[0]
        .split(y)[0].trim()).join`\n`;

console.log(solution_8("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "/ apples, plums\npears\noranges")
console.log(solution_8("Q @b\nu\ne -e f g", ["@", "-"]), "/ Q\nu\ne");