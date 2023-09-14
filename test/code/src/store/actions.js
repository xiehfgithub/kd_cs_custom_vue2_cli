/*
 * @Author: hfxie
 * @Date: 2023-09-12 17:23:53
 * @LastEditors: hfxie
 * @LastEditTime: 2023-09-12 17:44:00
 * @Description: file content
 */
import OutConst from "../customEventOutConst.js";
import CONSTNAME from "@/ConstName.js";
import * as utils from "@/utils/ganttUnit.js";
const action = {
  // 选中行
  demo(store, index) {
    console.log("demo action");
  },
  // 加载苍穹测试数据
  loadMockCq(store, index = "") {
    console.log("加载苍穹测试数据", "/api/" + index);
    axios({
      method: "post",
      url: "/api/" + index,
      data: {},
    })
      .then((res) => {
        if (res.data.success === true) {
          console.log("Mock:", res);
          store.commit("init", res.data.data);

        }
      });
  },
  // 初始化·主动发起数据加载
  [OutConst.CUSTOM_INIT](store, obj) {
    this._invoke(OutConst.CUSTOM_INIT, obj);
  },

};

export default action;
