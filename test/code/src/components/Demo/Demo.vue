<!--
 * @Author: hfxie
 * @Date: 2021-09-12 10:10:10
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 17:51:12
 * @Description: 示例主体结构页面
-->
<template>
  <div class="demo">
      <h1>我是容器组件</h1>
      <button @click="Add">Add</button>
      <h3>{{count}}</h3>

      loading show
      <div class="loading-box">
        <br />
        <CqLoading />

        <div class="tooltip-box">
          <CqTooltip content="文案超出隐藏并提示tips">
            <template v-slot:referer>
              <div class="demo-tip">
                测试文案超出外层容器尺寸显示省略号隐藏并提示tips
              </div>
            </template>
          </CqTooltip>

          <br />
          <br />

          <CqTooltip content="文案不超出">
            <template v-slot:referer>
              <div class="demo-tip">
                文案不超出
              </div>
            </template>
          </CqTooltip>

        </div>

      </div>
      <br />
      <div
        class="drop-target"
        @dragenter.stop.prevent
        @dragover.stop.prevent
        @dragleave.stop.prevent
        @drop.stop.prevent="DropHandle($event, 'demo drop info')"
      >
        <br />
        可释放容器:
        <br /><br />
        释放信息:
        <br /><br />
        {{dropInfo}}
      </div>
      <br />
      <div
        class="drag-item"
        draggable
        @dragstart="Dragstart('测试控件1拖拽开始', $event)"
        @dragend="DragEnd($event)"
      >可拖拽块</div>


  </div>
</template>

<script>
import CONSTNAME from "@/ConstName.js";
import CqLoading from "../CqLoading/CqLoading.vue";
import CqTooltip from "../CqTooltip/CqTooltip.vue";
export default {
  name: "Demo",
  data() {
    return {
      CONSTNAME: CONSTNAME,
      count: 0,
      dropInfo: "",
    };
  },

  provide: {
    CONSTNAME,
  },
  components: {
    CqLoading,
    CqTooltip,

  },
  mounted() {

  },
  computed: {

  },
  methods: {
    Add() {
      this.count++;
    },


    Dragstart(obj, e) {
      e.dataTransfer.setData("dragInfo", JSON.stringify({ desc: "Test控件拖拽传递信息" }));
    },
    DropHandle(e, item) {
      console.log("1.测试区域释放", e, item);
      if (e.dataTransfer.getData("dragInfo") === "") {
        console.log("不支持的数据拖动");
        return false;
      }
      e.preventDefault();
      e.stopPropagation();
      const _dragInfo = JSON.parse(e.dataTransfer.getData("dragInfo"));
      console.log("2.拖拽投放: ", item, _dragInfo);

      this.dropInfo = _dragInfo;
    },
    DragEnd(e) {
      console.log("3.拖拽结束: ");
    },
  },
};
</script>

<style scoped lang='less'>
@import './Demo.less';

</style>
