function dd(arr) {
    let y = arr.length   //行
    let x = arr[0].length
    let res = []

    //记录列
    for (let k = 0; k < y; k++) {
        //j是列数，随着k的增加移动
        for (let i = 0, j = k; i < x && j >= 0; i++, j--) {
            res.push(arr[i][j])
        }
    }

    //记录行
    for (let k = 1; k < x; k++) {
        //i是行，随着k的增加，行向下移动
        for (let i = k, j = y - 1; i < x && j >= 0; i++, j--) {
            res.push(arr[i][j])
        }
    }
    return res
}
let arr = [[1, 2, 3], [4, 5, 6]]

console.log(dd(arr))