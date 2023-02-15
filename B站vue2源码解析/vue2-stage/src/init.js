import { compileToFunction } from "./compiler";
import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {  // 用于初始化操作
        // vue  vm.$options 获取用户的配置
        const vm = this;
        vm.$options = options // 将用户的配置挂载在实例上
        // 初始化状态
        initState(vm);

        if (options.el) {
            vm.$mount(options.el); //实现数据挂载
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this;
        el = document.querySelector(el);
        const ops = vm.$options
        if (!ops.render) {
            let template;
            if (!ops.template && el) { //没有写模板 但是写了el
                template = el.outerHTML
            } else {
                if (el) {
                    template = ops.template
                }
            }
            // 写了template 就优先使用template
            if (template) {
                // 需要对模板进行编译
                const render = compileToFunction(template);
                ops.render = render
            }
            console.log(template);
        }
        // script 标签引用的vue.global.js 这个编译过程是在浏览器运行的
        // 
    }
}

