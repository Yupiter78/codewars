/*Usually when you buy something, you're asked whether your credit card number,
phone number or answer to your most secret question is still correct.
However, since someone could look over your shoulder, you don't want that shown on your screen.
Instead, we mask it.
Your task is to write a function maskify, which changes all but the last four characters into '#'.*/

/*"4556364607935616" --> "############5616"
     "64607935616" -->      "#######5616"
               "1" -->                "1"
                "" -->                 ""

 "What was the name of your first pet?"

"Skippy" --> "##ippy"

"Nananananananananananananananana Batman!"
-->
"####################################man!"*/

// return masked string
function maskify(cc) {
    return cc.length < 4 ? cc : "#".repeat(cc.length - 4) + cc.slice(-4)
}

const maski = (str) => {
    return str.split("").map((char, i, arr) => i < arr.length - 4 ? "#" : char).join("");
}

const mask = (str) => {
    return str.slice(-4).padStart(str.length, "#");
}

console.log(maskify("1234567890"));
console.log(maski("1234567890"));
console.log(mask("1234567890"));
console.log(maskify("890"));
console.log(maski("890"));
console.log(mask("890"));