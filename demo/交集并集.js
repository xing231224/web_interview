//交集
function dd(arr1, arr2) {
    return arr1.filter(item => {
        return arr2.indexOf(item) > -1
    })
}
const a = [1, 2, 2, 1];
const b = [2, 3, 2];
console.log(dd(a, b)); // [2, 2]

//并集
function dd1(arr1, arr2) {
    let set = new Set()
    arr1.forEach(item => {
        set.add(item)
    })
    arr2.forEach(item => {
        set.add(item)
    })
    return set
}
console.log(dd1(a, b))