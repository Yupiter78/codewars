/*For this exercise you will be strengthening your page-fu mastery.
You will complete the PaginationHelper class, which is a utility
class helpful for querying paging information related to an array.

The class is designed to take in an array of values and an integer
indicating how many items will be allowed per each page.
The types of values contained within the collection/array are not relevant.

The following are some examples of how this class is used:

var helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
helper.pageCount(); //should == 2
helper.itemCount(); //should == 6
helper.pageItemCount(0); //should == 4
helper.pageItemCount(1); // last page - should == 2
helper.pageItemCount(2); // should == -1 since the page is invalid

// pageIndex takes an item index and returns the page that it belongs on
helper.pageIndex(5); //should == 1 (zero based index)
helper.pageIndex(2); //should == 0
helper.pageIndex(20); //should == -1
helper.pageIndex(-10); //should == -1
*/

class PaginationHelper {
    constructor(collection, itemsPerPage) {
        // The constructor takes in an array of items and an integer indicating how many
        // items fit within a single page
        this.collection = collection;
        this.itemsPerPage = itemsPerPage;
    }
    itemCount() {

        // returns the number of items within the entire collection
        return this.collection.length;
    }
    pageCount() {
        // returns the number of pages
        return Math.ceil(this.itemCount() / this.itemsPerPage);
    }
    pageItemCount(pageIndex) {
        // returns the number of items on the current page. page_index is zero based.
        // this method should return -1 for pageIndex values that are out of range
        if (pageIndex >= 0 && pageIndex < this.pageCount() - 1) {
            return this.itemsPerPage;
        } else if (pageIndex >= 0 && pageIndex === this.pageCount()  - 1) {
            return this.itemCount() % this.itemsPerPage === 0 ?
                this.itemsPerPage : this.itemCount() % this.itemsPerPage;
        } else {
            return -1;
        }
    }
    pageIndex(itemIndex) {
        // determines what page an item is on. Zero based indexes
        // this method should return -1 for itemIndex values that are out of range
        return itemIndex >= 0 && itemIndex <= this.itemCount() - 1 ?
            Math.floor(itemIndex / this.itemsPerPage) : -1;
    }
}


        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        const helper = new PaginationHelper(collection, 10)

        console.log(helper.pageCount(), "/ 3");
        console.log(helper.itemCount(), "/ 24");

        console.log(helper.pageItemCount(2), "/ 4");
        console.log(helper.pageIndex(22), "/ 2");

const collection_2 = [1, 2, 3, 4, 5, 6, 7, 8];
const helper_2 = new PaginationHelper(collection_2, 2);


console.log(helper_2.pageItemCount(3), "/ helper_2:  2");

const collection_3 = [];
const helper_3 = new PaginationHelper(collection_3, 1);

console.log(helper_3.pageItemCount(-1), "/ helper_3:  -1")

class PaginationHelper_2 {
    constructor(collection, itemsPerPage) {
        Object.assign(this, {collection, itemsPerPage});
    }

    itemCount() {
        return this.collection.length;
    }

    pageCount() {
        return Math.ceil(this.collection.length / this.itemsPerPage);
    }

    pageItemCount(pageIndex) {
        return pageIndex < 0 || pageIndex >= this.pageCount() ?
            -1 : pageIndex < this.pageCount() - 1 ?
                this.itemsPerPage : this.itemCount() % this.itemsPerPage;
    }

    pageIndex(itemIndex) {
        return itemIndex < 0 || itemIndex >= this.itemCount() ?
            -1 : itemIndex / this.itemsPerPage ^ 0;
    }
}

const helper_4 = new PaginationHelper_2(collection, 10)

console.log(helper_4.pageCount(), "/ 3");
console.log(helper_4.itemCount(), "/ 24");

console.log(helper_4.pageItemCount(2), "/ 4");
console.log(helper_4.pageIndex(22), "/ 2");


const helper_5 = new PaginationHelper_2(collection_2, 2);


console.log(helper_5.pageItemCount(3), "/ helper_5:  2");


const helper_6 = new PaginationHelper_2(collection_3, 1);

console.log(helper_6.pageItemCount(-1), "/ helper_6:  -1")

class PaginationHelper_3 {
    constructor(collection, itemsPerPage){
        this.collection = collection;
        this.itemsPerPage = itemsPerPage;
    }
    format(tempArray = []) {
        for (let i = 0, j = collection.length; i < j; i += this.itemsPerPage)
            tempArray.push(this.collection.slice(i, i + this.itemsPerPage));
        return tempArray;
    }
    pageCount () {
        return this.format().length;
    }

    pageItemCount (pageIndex = 0) {
        try {
            return this.format()[pageIndex].length
        } catch(e) {
            return -1;
        }
    }

    pageIndex (itemIndex) {
        if (itemIndex >= this.collection.length || itemIndex < 0) return -1;
        return ~~(itemIndex / this.itemsPerPage);
    }
    itemCount = function() {
        return this.collection.length;
    }
}

// PaginationHelper.prototype.itemCount = function() {
//     return this.collection.length;
// }

const helper_7 = new PaginationHelper_3(collection, 10)

console.log(helper_7.pageCount(), "/ 3");
console.log(helper_7.itemCount(), "/ 24");
console.log(helper_7.pageItemCount(2), "/ 4");
console.log(helper_7.pageIndex(22), "/ 2");


const helper_8 = new PaginationHelper_3(collection_2, 2);

console.log(helper_8.pageItemCount(3), "/ helper_8:  2");


const helper_9 = new PaginationHelper_3(collection_3, 1);

console.log(helper_9.pageItemCount(-1), "/ helper_9:  -1");

class PaginationHelper_4 {
    constructor(collection, itemsPerPage) {
        this.collection = collection;
        this.ipp = itemsPerPage;
        this.len = this.collection.length;
    }
    itemCount() {return this.len;}
    pageCount() {return Math.ceil(this.len / this.ipp);}
    pageItemCount(pageIndex) {
        let pc = this.pageCount();
        return pc <= pageIndex || pageIndex < 0 ? -1 : pc - 1 === pageIndex && this.len % this.ipp !== 0 ? this.len % this.ipp : this.ipp;
    }
    pageIndex(itemIndex) {
        return this.len <= itemIndex || itemIndex < 0 ? -1 : Math.floor(itemIndex / this.ipp);
    }
}


const helper_10 = new PaginationHelper_4(collection, 10)

console.log(helper_10.pageCount(), "/ 3");
console.log(helper_10.itemCount(), "/ 24");
console.log(helper_10.pageItemCount(2), "/ 4");
console.log(helper_10.pageIndex(22), "/ 2");


const helper_11 = new PaginationHelper_4(collection_2, 2);

console.log(helper_11.pageItemCount(3), "/ helper_8:  2");


const helper_12 = new PaginationHelper_4(collection_3, 1);

console.log(helper_12.pageItemCount(-1), "/ helper_9:  -1");