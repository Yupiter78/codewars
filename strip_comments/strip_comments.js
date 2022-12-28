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