/*
 * @Author: hfxie
 * @Date: 2021-01-20 17:08:58
 * @LastEditors: hfxie
 * @LastEditTime: 2022-03-30 16:51:41
 * @Description: babel配置
 *
 *  1：升级babel7以上版本
 *  npx babel-upgrade --write --install
 *  2：安装依赖
 *  npm install  @babel/plugin-proposal-optional-chaining -S
 *  npm install  @babel/plugin-proposal-nullish-coalescing-operator -S
 *  3：在babel.config.js中  的 plugins中添加
 *  "@babel/plugin-proposal-optional-chaining"
 *  "@babel/plugin-proposal-nullish-coalescing-operator"
 */

module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining", // 可选链 ?.
    "@babel/plugin-proposal-nullish-coalescing-operator", // 空值合并 ??
  ],
};
