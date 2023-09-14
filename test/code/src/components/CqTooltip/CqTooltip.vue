<!--
 * @Author: sakurastone haifeng_xie
 * @Date: 2023-09-12 14:43:06
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 18:03:39
 * @FilePath: \code\src\components\Tooltip\Tooltip.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <el-tooltip :content="content" :disabled="disabled">
      <slot name="referer"></slot>
  </el-tooltip>
</template>

<script>
const getPadding = (el) => {
  const style = window.getComputedStyle(el, null);
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
  return {
    pLeft: paddingLeft,
    pRight: paddingRight,
    pTop: paddingTop,
    pBottom: paddingBottom,
  };
};
const checkEllipsis = (box) => {
  const range = document.createRange();
  range.setStart(box, 0);
  range.setEnd(box, box.childNodes.length);
  // console.log(range);
  const rangeWidth = range.getBoundingClientRect().width;
  // console.log("rangeWidth===>", rangeWidth);
  const contentWidth = rangeWidth - Math.floor(rangeWidth);

  const { pLeft, pRight, pTop, pBottom } = getPadding(box);
  const horizontalPadding = pLeft + pRight;
  // console.log("horizontalPadding===>", horizontalPadding);
  // console.log("box.clientWidth===>", box.clientWidth);

  const verticalPadding = pTop + pBottom;

  if (rangeWidth + horizontalPadding > box.clientWidth) {
    return false;
    console.log("存在省略号");
  } else {
    return true;
    console.log("容器宽度足够，没有省略号了");
  }
};
export default {
  name: "CqTooltip",
  props: {
    content: String,
  },
  components: { // 组件的引用

  },
  data() {
    return {
      disabled: false,
    };
  },
  created() { // 实例被创建之后执行代码

  },
  computed: { // 计算属性

  },
  methods: { // 方法

  },
  mounted() { // 页面进入时加载内容
    // console.log(this.$slots.referer[0], this.$el);
    // const el = this.$slots.referer[0].children[0];
    const el = this.$el;
    if (el) {
      try {

        const observer = new ResizeObserver(() => {
          // console.log("执行了吗");
          this.disabled = checkEllipsis(el);
        });
        observer.observe(el);
        // console.log(el);
      } catch (error) {
        console.log(error);
      }
    }

  },
  watch: { // 监测变化

  },
};
</script>
<style lang='less' scoped>

</style>
