function dd(m, target) {
    let row = 0;
    let col = m[0].length - 1;
    while (row < m.length && col >= 0) {
        if (m[row][col] == target) {
            return true;
        } else if (m[row][col] > target) {
            col--;
        } else {
            row++;
        }
    }
    return false;
}

let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
console.log(dd(arr, 4));
console.log(dd(arr, 10));
