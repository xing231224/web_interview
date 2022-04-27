/*
 * @Author: your name
 * @Date: 2022-04-27 11:17:04
 * @LastEditTime: 2022-04-27 11:22:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\demo\对象扁平化.js
 */
function dd(item, prek = "", res = {}) {
    Object.entries(item).forEach(([key, val]) => {
        if (val && typeof val === "object") {
            dd(val, prek + key + ".", res);
        } else {
            res[prek + key] = val;
        }
    });
    return res;
}
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(dd(source));

function dd(obj = {}, pre = "", res = {}) {
    if (!obj) return;
    Object.entries(obj).forEach(([key, val]) => {
        if (Array.isArray(val)) {
            let temp = Array.isArray(obj) ? `${pre}[${key}]` : `${pre}${key}.`;
            dd(val, temp, res);
        } else if (typeof val === "object") {
            let temp = Array.isArray(obj) ? `${pre}[${key}]` : `${pre}${key}.`;
            dd(val, temp, res);
        } else {
            let temp = Array.isArray(obj) ? `${pre}[${key}]` : `${pre}${key}.`;
            res[temp] = val;
        }
    });
    return res;
}

const input = {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null,
};
console.log(dd(input));
