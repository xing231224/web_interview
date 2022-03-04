/**
 * 一般来说，promise.all 用来处理多个并发请求，
 * 也是为了页面数据构造的方便，将一个页面所用到的在不同接口的数据一起请求过来，
 * 不过，如果其中一个接口失败了，多个请求也就失败了，页面可能啥也出不来，这就看当前页面的耦合程度了
 */
/**
 * @description: 
 * @param {Array} promises
 * @return {*}
 */
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            throw new TypeError(`argument must be a array`)
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length
        var resolvedResult = [];
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(value => {
                resolvedCounter++;
                resolvedResult[i] = value;
                if (resolvedCounter == promiseNum) return resolve(resolvedResult)
            }, error => {
                return reject(error)
            })
        }
    })
}