const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 匹配到的分组是一个标签名 <xxx
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配的是</xxxx> 最终匹配到的分组就是结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;



// vue3 采用的不是使用正则
// 对模板进行编译处理
export function parseHTML(html) {
    const ELEMENT_TYPE = 1, TEXT_TYPE = 3;
    const stack = [];  // 用于存放元素的
    let currentParent, root; // 指向的是栈中的最后一个
    // 最终需要转化成一棵抽象语法树
    function createASTElement(tag, attrs) {
        return {
            tag,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        }
    }
    // 利用栈型结构 来构造一棵树
    function start(tag, attrs) {
        let node = createASTElement(tag, attrs); //创造一个ast节点
        if (!root) {  // 看下是否是空树
            root = node // 如果为空则当前是树的根节点
        }
        if (currentParent) {
            node.parent = currentParent
            currentParent.children.push(node)
        }
        stack.push(node);
        currentParent = node  // currentParent为栈中的最后一个
    }
    function chars(text) { //文本直接放到当前指向的节点中
        text = text.replace(/\s/g, '')
        text && currentParent.children.push({
            type: TEXT_TYPE,
            text,
            parent: currentParent
        });
    }
    function end(tag) {
        let node = stack.pop(); // 弹出最后一个，校验是否合法
        currentParent = stack[stack.length - 1]
    }
    function advance(n) {
        html = html.substring(n);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1], // 标签名
                attrs: []
            }
            advance(start[0].length);
            // 如果不是开始标签的结束 就一直匹配下去
            let attr, end;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] || true })
            }

            if (end) {
                advance(end[0].length);
            }
            return match
        }
        return false; //不是开始标签
    }
    // html 最开始肯定是个 <
    while (html) {
        // 如果textEnd 为0 说明是一个开始标签或者结束标签
        // 如果textEnd >0  说明就是文本的结束位置
        let textEnd = html.indexOf("<") // 如果indexOf中的索引是0 则说明是个标签
        if (textEnd === 0) {
            const startTagMatch = parseStartTag();
            if (startTagMatch) {  // 解析到的开始标签
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                end(startTagMatch.tagName)
                continue
            }
        }
        if (textEnd > 0) {
            let text = html.substring(0, textEnd); // 文本内容
            if (text) {
                advance(text.length)
                chars(text);
            }
        }
    }
    return root
}
