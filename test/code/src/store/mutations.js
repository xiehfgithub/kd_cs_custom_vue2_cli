/*
 * @Author: haifeng_xie haifeng_xie@kingdee.com
 * @Date: 2023-09-12 10:52:02
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-13 09:47:35
 * @FilePath: \code\src\store\mutations.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as utils from "@/utils/ganttUnit.js";
import CONSTNAME from "@/ConstName.js";
const mutation = {
  set_demo(state, demo) {
    state.demo = demo;
  },
  set_uuid(state, id = "default") {
    state.uuid = id;
  },
  // 主题色
  set_theme(state, color = "#5582f3") {
    state.themeColor = color;
  },
  setWidth(state, width) {
    state.width = width;
  },
  setHeight(state, height) {
    state.height = height;
  },
  // 控件初始化·数据加载态
  set_dataLoadingStatus(state, status = false) {
    state.dataLoadingStatus = status;
  },
  init(state, res) {
    state.data = res;
    console.log("初始化数据", res, state);
  },

};
export default mutation;
