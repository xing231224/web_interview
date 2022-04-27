Promise.prototype.finally = function (callback) {
    return this.then((data) => {
      return Promise.resolve(callback()).then(() => data); // data 上一个promise的成功态
    }, err => {
      return Promise.resolve(callback()).then(() => {
        throw err; // 把之前的失败的err，抛出去
      });
    })
  }