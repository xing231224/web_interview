const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
export function compileToFunction(template) {
    // 1.将template 转化成ast语法树

    // 2.生成render方法 （render方法执行后的结果就是虚拟DOM）
    console.log(template);
}