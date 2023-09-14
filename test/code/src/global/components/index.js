/*
 * @Author: hfxie
 * @Date: 2021-01-01 14:52:54
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 15:01:40
 * @Description: file content
 */
/**
 *
 * 全局组件
 */

import { Icon, Button, Select, Option, Message, MessageBox, Input, Tooltip } from "element-ui";

const obj = {
  Icon,
  Button,
  Select,
  Option,
  Message,
  MessageBox,
  "el-input": Input,
  "el-tooltip": Tooltip,
};

const components = {};
components.install = function(Vue, options) {
  for (const name in obj) {
    if (name && obj[name]) {
      Vue.component(name, obj[name]);
      if (["Message", "Modal"].includes(name)) {
        Vue.prototype[`$${name}`] = obj[name];
      }
    }
  }
  Vue.prototype.$MessageBox = MessageBox;
};

export default components;
