/*
 * @Author: hfxie
 * @Date: 2021-01-20 17:10:10
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 10:55:24
 * @Description: file content
 */
import Mock from "mockjs";
// const Random = Mock.Random
// console.log(Random)

Mock.setup({
  timeout: "400-600",
});

Mock.mock("/api/init", {
  "success": true,
  "message": "标准化过程测试数",
  "data": {
    "demo": "demo kv",
  },
});
