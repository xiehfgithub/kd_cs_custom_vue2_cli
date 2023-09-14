/*
 * @Author: hfxie
 * @Date: 2023-09-12 10:23:53
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 13:57:55
 * @Description: 数据仓库
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters.js";
import CONSTNAME from "@/ConstName.js";

function createStore() {
  const store = new Vuex.Store({
    state: {
      demo: "demo state KV",

      uuid: "",
      themeColor: "5582f3", // 主题色
      width: 1000, // 控件宽
      height: 800, // 控件高
      dataLoadingStatus: false, // 控件数据加载态
      // 接收数据
      data: {

      },
    },
    mutations: mutations,
    actions: actions,
    modules: {},
    getters: getters,
  });
  return store;
}


export default createStore;

