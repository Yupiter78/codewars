class SmallestIntegerFinder {
    findSmallestInt(args) {
        return Math.min(...args);
    }
}

let sif = new SmallestIntegerFinder();

console.log(sif.findSmallestInt([78, 56,232,12,8]));

class SmallestIntegerFinder_2 {
    findSmallestInt(args) {
        return args.reduce((prev, cur) => prev < cur ? prev : cur);
    }
}

let sif_2 = new SmallestIntegerFinder_2();
console.log(sif_2.findSmallestInt([78, 56,232,12,8]));