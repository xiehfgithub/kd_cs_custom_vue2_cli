<!--
 * @Author: hfxie
 * @Date: 2021-01-01 17:10:10
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 11:12:29
 * @Description: 主组件入口
-->

<template>
  <div
    class="component-box"
    :data-page-id="uuid"
    :id="uuid"
  >
    <CqLoading v-if="$store.state.dataLoadingStatus === true" />

    <Demo v-else />

  </div>
</template>

<script>
import CqLoading from "./components/CqLoading/CqLoading.vue";
import Demo from "./components/Demo/Demo";
export default {
  name: "App",
  data() {
    return {

    };
  },
  created() {},
  mounted() {},

  methods: {

  },
  components: {
    CqLoading,
    Demo,

  },
  computed: {
    uuid() {
      return this.$store.state.uuid;
    },
  },
};
</script>

<style lang="less" scoped>
.component-box {
  color: #000;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  user-select: none;
  font-family: "Microsoft YaHei", PingFangSC-Regular, "Helvetica Neue",
    Helvetica, Arial, "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  .hide {
    display: none !important;
  }
  .box-content {
    border: 1px dashed #e1453e;
    margin-bottom: 20px;
  }
  .gantt-opts {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100000;
    background-color: rgba(0,0,0,0.3);
    height: 40px;
    color: red;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 14px;
    ::v-deep el-select{
      height: 20px;
    }
  }

  .panel{
    position: absolute;
    z-index: 1005;
    background-color: rgba(0,0,0,0.1);
    top: 0;
    width: 25px;
    height: 100%;
    &.panel-pre{
      left: 0;
    }
    &.panel-next{
      right: 0;
    }
  }
}
</style>
