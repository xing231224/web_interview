let arr = [1, [2, [3]]]
//console.log(arr.flat(2))

function dd(arr) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            return result = result.concat(dd(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}
function aa(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log(aa(arr))
