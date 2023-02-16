export function createElementVNode(vm, tag, data, ...children) {
    if (data == null) {
        data = {}
    }
    let key = data.key
    if (key) {
        delete data.key
    }
    return vnode(vm, tag, key, data, children)
}

export function createTextVNode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}
//  ast一样吗？ ast做的是语法层面的转化 他描述的是语法本身
// 我们的 虚拟dom 是描述的dom元素 ，可以添加一些自定义属性
export function vnode(vm, tag, key, data, children, text) {
    return {
        vm, tag, key, data, children, text
    }
}

function createElm(vnode) {
    let { tag, data, children, text } = vnode
    if (typeof tag === 'string') { //标签
        vnode.el = document.createElement(tag); // 这里将真实节点和虚拟节点对应起来
        patchProps(vnode.el, data);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child))
        });
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}

function patchProps(el, props) {
    for (const key in props) {
        if (key === 'style') {
            for (const styleName in props.style) {
                el.style[styleName] = props.style[styleName]
            }
        } else {
            el.setAttribute(key, props[key])
        }
    }
}

export function patch(oldVNode, vnode) {
    // 写的是初渲染流程
    const isRealElement = oldVNode.nodeType;
    if (isRealElement) {
        const elm = oldVNode; // 获取真实元素
        const parentElm = elm.parentNode // 拿到父元素
        const newElm = createElm(vnode);
        parentElm.insertBefore(newElm, elm.nextSibing)
        parentElm.removeChild(elm);
        return newElm
    } else {
        // diff算法
    }
}