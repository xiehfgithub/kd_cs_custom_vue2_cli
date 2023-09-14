/*
 * @Author: hfxie
 * @Date: 2023-09-12 16:13:20
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 14:30:45
 * @Description: 项目工程入口
 */
import Vue from "vue";
import App from "./App.vue";
// 常量
import OutConst from "./customEventOutConst.js";
import InConst from "./customEventInConst.js";
import CONSTNAME from "@/ConstName.js";
Vue.prototype.$outConst = OutConst;
Vue.prototype.$inConst = InConst;
Vue.prototype.$const = CONSTNAME;

// 全局·组件 + 过滤器
import "element-ui/lib/theme-chalk/index.css";
import components from "./global/components";
Vue.use(components);
import filters from "./global/filters";
Vue.use(filters);
// Mock
import "./mock/mock.js";
import axios from "axios";
Vue.prototype.$axios = axios;
// Vuex
import createStore from "./store/index.js";
// 全局·工具方法
import * as utils from "@/utils/ganttUnit.js";
Vue.prototype.$utils = utils;
import chaining from "@/utils/chaining";
Vue.use(chaining);
// 懒加载图片
import VueLazyload from "vue-lazyload";
const errorimage = require("./assets/images/avatar_error.png");
Vue.use(VueLazyload, {
  error: errorimage,
  attempt: 1,
});


import { name, version, description, iteration, author, lastTime } from "../package.json";
console.log(
  `名称: %c${name}`,
  "color:red;font-weight:bold;",
  `\n版本: ${version}\n功能: ${description}\n迭代: ${iteration}\n开发: ${author}\n环境: ${process.env.NODE_ENV}\n时间: ${lastTime}`,
);

/**
 * Vue实例在setHtml方法中声明，初始化执行init的时候就能够创建
 * 声明Vue实例对象时，在其挂载完毕的生命周期里声明一个订阅，用于订阅update方法中发布的消息，从而更新实例数据
 * update方法中，发布一个消息，让Vue实例接收消息，更新数据
 * 在Vue实例的destroyed中，结束订阅
 * 注意loadFile中index.css的引入路径，因为webpack打包后将其放在了css文件夹里，所以路径是./css/index.css
 */
// eslint-disable-next-line no-unexpected-multiline
(function(KDApi) {
  function MyComponent(model, props) {
    this._setModel(model);
  }
  /*
    交互响应
    入参 props:
    {
      configItems: undefined,
      data: {
        success: true,  // 状态
        methodName: "init", // 接口名称
        data： {···}, // 数据
      }
      gridRowData: undefined,
      lang: "en_US",
      lock: false,
      themeColor: "HAECO Teal Blue",
      themeNum： "#00778b",
    }
  */
  const callBack = function(model, props, _store) {
    _store.state.dataLoadingStatus && _store.commit("set_dataLoadingStatus", false); // 关闭数据加载态
    _store.commit("set_theme", props.themeNum); // 主题色
    const paramsMap = props.data;
    if (!paramsMap && typeof paramsMap != "object" || paramsMap == null) return;
    if (!paramsMap.success) return;
    const action = paramsMap.methodName;
    console.log("苍穹参数:", paramsMap);
    const _uuid = model.pageId + "_" + model.key;
    const _vm = window[_uuid];
    if (action == InConst.DATA_LOADING) { // 初始化·主动发起数据加载
      _store.commit("set_dataLoadingStatus", true);
      _store.dispatch(OutConst.CUSTOM_INIT);
    } else if (action == InConst.INIT_APP) { // 初始化·刷新数据
      _store.commit("init", paramsMap.data);
    }

  };

  /* 监听容器 */
  function addResizeObserve(element, callback) {
    const handleResize = (entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const hide = width === 0 && height === 0;
      const rect = { hide, width, height };
      // console.log("entry.target", entry.target);
      // console.log("size", entry.contentRect, rect);
      callback && callback(rect);
    };
    let watcher = new ResizeObserver(handleResize);
    watcher.observe(element);
    return {
      removeResizeObserve: function() {
        watcher.disconnect(element);
        watcher = null;
      },
    };
  }
  if (KDApi) {
    const setHtml = (model) => {
      const { dom } = model;
      const _uuid = model.pageId + "_" + model.key;

      window[_uuid] = new Vue({
        el: dom,
        data: {
          resizeObj: null,
        },
        created() {
          this.$store.commit("set_uuid", _uuid);
        },
        components: { App },
        template: `<App />`,
        methods: {
          resizeCb(info) {
            console.log(info);
            if (
              info.hide === true ||
              (
                info.width == this.$store.state.width &&
                info.height == this.$store.state.height
              )
            ) {
              return console.log("Fit ignore", info.hide === true, info.width == this.$store.state.width, this.$store.state.height);
            }
            const { width, height } = info;
            this.$store.commit("setWidth", width);
            this.$store.commit("setHeight", height);
          },
        },
        store: window["_store_" + _uuid],
        mounted() {
          // console.log("初始化容器宽");
          this.resizeObj = addResizeObserve(this.$el.parentNode, this.resizeCb);
        },
        beforeDestroy() {
          if (this.resizeObj && this.resizeObj.removeResizeObserve) {
            this.resizeObj.removeResizeObserve();
            this.resizeObj = null;
            console.log("重置容器尺寸监听");
          }
        },
      });
    };
    const toolsInfoStyle1 = "color:#fadfa3;font-weight:bold;background:#030307;padding:5px;";
    const toolsInfoStyle2 = "color:#FFFFFF;font-weight:bold;background:green;padding:5px;";
    const toolsInfoStyle3 = "color:#0000ff;font-weight:bold;background:pink;padding:5px;";
    MyComponent.prototype = {
      _setModel: function(model) {
        this.model = model;

        const _storeKey = "_store_" + model.pageId + "_" + model.key;
        window[_storeKey] = createStore();
        this.store = window[_storeKey];
        window[_storeKey]._invoke = function() {
          return model.invoke(arguments[0], arguments[1]);
        };
      },
      init: function(props) {
        console.log(`init:%c${name}%c${description}`, toolsInfoStyle1, toolsInfoStyle3, this.model, props, Date.now());
        const paramsMap = props.data;
        if (!paramsMap && typeof paramsMap != "object") return;
        KDApi.loadFile(["src/css/app.css"], this.model, () => {
          const model = this.model;
          setHtml(model);
        });
      },
      update: function(props) {
        console.log(`update:%c${name}%c${version}%c${lastTime}`, toolsInfoStyle1, toolsInfoStyle2, toolsInfoStyle3, this.model, props, Date.now());
        callBack(this.model, props, this.store);
      },
      destoryed: function() {
        console.log(`destoryed:%c${name}`, toolsInfoStyle1, this.model);
        const _uuid = this.model.pageId + "_" + this.model.key;
        window[_uuid] = null;
        window["_store_" + _uuid] = null;
        this.store = null;
      },
    };

    // 注册自定义组件
    KDApi.register(name, MyComponent, {
      isMulLang: false,
    });
  } else {
    const store = createStore();
    const _now = Date.now();
    const model = {
      timestamp: _now,
      pageId: "mockPageId-" + _now,
      key: "customctl",
      dom: "#app",
      desc: "mock model " + _now,
    };
    const _uuid = model.pageId + "_" + model.key;
    // 添加本地实现平台内效果特殊处理方案
    const invoke = function(event, arg, exArg, _store) {
      console.log(`苍穹调用:\n方法名: ${event} \n参数: ${(typeof arg === "object" ? JSON.stringify(arg) : arg + "").substring(0, 900)}`);
      if (event == OutConst.DEMO) {
        console.log("本地·DEMO", arg, exArg, _store);

      }
    };
    store._invoke = invoke;

    // 实例化
    const { dom } = model;
    window.kd = window[_uuid] = new Vue({
      el: dom,
      data: {
        resizeObj: null,
      },
      created() {
        const _self = this;
        _self.$axios({
          method: "post",
          url: "/api/init",
          data: {},
        })
          .then((res) => {
            if (res.data.success === true) {
              console.log("Mock:", res);
              _self.$store.commit("set_uuid", _uuid);
              _self.$store.commit("init", res.data.data);

            }
          });
      },
      components: { App },
      template: `<App />`,
      methods: {
        resizeCb(info) {
          // console.log(info);
          if (
            info.hide === true ||
            (
              info.width == this.$store.state.width &&
              info.height == this.$store.state.height
            )
          ) {
            return console.log("Fit ignore", info.hide === true, info.width == this.$store.state.width, this.$store.state.height);
          }
          const { width, height } = info;
          this.$store.commit("setWidth", width);
          this.$store.commit("setHeight", height);
        },
      },
      store,
      mounted() {
        // console.log("初始化容器宽");
        this.resizeObj = addResizeObserve(this.$el.parentNode, this.resizeCb);
      },
      beforeDestroy() {
        if (this.resizeObj && this.resizeObj.removeResizeObserve) {
          this.resizeObj.removeResizeObserve();
          this.resizeObj = null;
          console.log("重置容器尺寸监听");
        }
      },

    });

  }

})(window.KDApi);
