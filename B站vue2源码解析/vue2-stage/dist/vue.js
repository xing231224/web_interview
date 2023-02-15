(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function compileToFunction(template) {
      // 1.将template 转化成ast语法树

      // 2.生成render方法 （render方法执行后的结果就是虚拟DOM）
      console.log(template);
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    // 重写数组中的方法
    var oldArrayProto = Array.prototype; // 获取数组的原型

    var newArrayProto = Object.create(oldArrayProto);
    var methods = [
    // 找到所有的变异方法
    "push", "pop", "shift", "unshift", "reverse", "sort", "splice"]; // concat slice  都不会改变原数组

    methods.forEach(function (method) {
      newArrayProto[method] = function () {
        var _oldArrayProto$method;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        // 重写了数组的方法
        var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args)); // 内部调用原来的方法，函数的劫持 切片编程
        // 需要对新增的数据再次进行劫持
        var inserted;
        var ob = this.__ob__;
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
            break;
        }
        if (inserted) {
          //对新增的内容再次进行观测 
          ob.observeArray(inserted);
        }
        return result;
      };
    });

    var Observer = /*#__PURE__*/function () {
      function Observer(data) {
        _classCallCheck(this, Observer);
        // Object.defineProperty 只能劫持已经存在的属性 （vue里面会为此单独写一些api）
        Object.defineProperty(data, '__ob__', {
          value: this,
          enumerable: false // 将__ob__变成不可枚举（循环的时候无法获取到）
        });
        // data.__ob__ = 11;  // 给数据加了一个标识 如果数据上有__ob__ 则说明这个属性被观测过
        if (Array.isArray(data)) {
          // 这里我们可以重写数组中的方法 7个变异方法 是可以修改数组本身的
          data.__proto__ = newArrayProto; // 需要保留数组原有的特性，并且可以重写部分方法
          this.observeArray(data); // 如果数组中放的是对象 可以监控到对象变化
        } else {
          this.walk(data);
        }
      }
      _createClass(Observer, [{
        key: "walk",
        value: function walk(data) {
          // 循环对象  对属性依次劫持
          // 重新定义 属性
          Object.keys(data).forEach(function (key) {
            defineReactive(data, key, data[key]);
          });
        }
      }, {
        key: "observeArray",
        value: function observeArray(data) {
          data.forEach(function (item) {
            return observe(item);
          });
        }
      }]);
      return Observer;
    }();
    function defineReactive(target, key, value) {
      // 闭包 属性劫持
      observe(value);
      Object.defineProperty(target, key, {
        get: function get() {
          // 取值的时候 会执行get
          console.log('用户取值====>', value);
          return value;
        },
        set: function set(newValue) {
          // 修改的时候 会执行set 
          console.log('用户设置值====>', newValue);
          if (newValue === value) return;
          observe(newValue);
          value = newValue;
        }
      });
    }
    function observe(data) {
      //  对这个对象进行劫持 
      if (_typeof(data) !== 'object' || data == null) {
        return; //只对对象进行劫持
      }

      if (data.__ob__ instanceof Observer) {
        return data.__ob__;
      }
      // 如果一个对象被劫持过了，那就不需要再劫持了（要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过）
      return new Observer(data);
    }

    function initState(vm) {
      var opts = vm.$options; //获取所有的选项
      if (opts.data) {
        initData(vm);
      }
    }
    function proxy(vm, target, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[target][key];
        },
        set: function set(newValue) {
          vm[target][key] = newValue;
        }
      });
    }
    function initData(vm) {
      var data = vm.$options.data;
      data = typeof data === 'function' ? data.call(vm) : data;
      vm._data = data;
      // 对数据进行劫持  vue2采用了一个api defineProperty
      observe(data);
      // 将vm._data 用vm来代理
      for (var key in data) {
        proxy(vm, '_data', key);
      }
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        // 用于初始化操作
        // vue  vm.$options 获取用户的配置
        var vm = this;
        vm.$options = options; // 将用户的配置挂载在实例上
        // 初始化状态
        initState(vm);
        if (options.el) {
          vm.$mount(options.el); //实现数据挂载
        }
      };

      Vue.prototype.$mount = function (el) {
        var vm = this;
        el = document.querySelector(el);
        var ops = vm.$options;
        if (!ops.render) {
          var template;
          if (!ops.template && el) {
            //没有写模板 但是写了el
            template = el.outerHTML;
          } else {
            if (el) {
              template = ops.template;
            }
          }
          // 写了template 就优先使用template
          if (template) {
            // 需要对模板进行编译
            var render = compileToFunction(template);
            ops.render = render;
          }
          console.log(template);
        }

        // script 标签引用的vue.global.js 这个编译过程是在浏览器运行的
        // 
      };
    }

    function Vue(options) {
      this._init(options);
    }
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
