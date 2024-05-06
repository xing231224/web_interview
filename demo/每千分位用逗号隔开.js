function dd(a) {
    let str = a.toString()
    let temp = ''
    if (str.indexOf('.') > -1) {
        temp = "." + str.split('.')[1]  //小数部分
        str = str.split('.')[0]       //整数部分
    }
    let len = str.length
    if (len <= 3) {
        return str + temp
    } else {
        let n = len % 3
        if (n == 0) {
            return str.match(/\d{3}/g).join(',') + temp
        } else {
            return str.slice(0, n) + ',' + str.slice(n).match(/\d{3}/g).join(',') + temp
        }
    }
}

console.log(dd(633))