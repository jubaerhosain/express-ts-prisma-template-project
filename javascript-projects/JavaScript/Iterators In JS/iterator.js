console.log("Iterator");

function myIterator(array) {
    let nextIndex = 0;
    return {
        next: function () {
            if (nextIndex < array.length) {
                return {
                    value: array[nextIndex++],
                    end: false
                }
            } else {
                return {
                    value: undefined,
                    end: true
                }
            }
        }
    }
}

let array = ['Abc', 'Def', 'Ghi', 'Jkl'];

let it = myIterator(array);
let obj;
while(!(obj = it.next()).end) {
    console.log(obj.value);
}