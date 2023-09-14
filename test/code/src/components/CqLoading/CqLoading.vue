<!--
 * @Author: haifeng_xie haifeng_xie@kingdee.com
 * @Date: 2023-09-07 15:40:39
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-07 16:10:33
 * @FilePath: \code\src\components\CqLoading\Loadding.vue
 * @Description: 平台loading样式
-->
<template>
    <div class="kd-loading">
        <div class="kd-spin--page kd-spin--indicator-container">
            <div class="kd-spin-dot-spin">
                <i class="kd-spin-dot-item"></i><i class="kd-spin-dot-item"></i
                ><i class="kd-spin-dot-item"></i
                ><i class="kd-spin-dot-item"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "CqLoading",
  components: {
    // 组件的引用
  },
  data() {
    return {};
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 方法
  },
  mounted() {
    // 页面进入时加载内容
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="less" scoped>
.kd-loading{
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}
.kd-spin--page .kd-spin-dot-spin {
    width: 50px;
    height: 50px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}
.kd-spin--page .kd-spin-dot-item:nth-child(2n + 1) {
    margin-right: 10px;
    animation: pageLoading 1s 0.3s ease-in-out infinite;
}
.kd-spin--page .kd-spin-dot-item:nth-child(2n + 2) {
    background-color: #00ccfe;
    animation: pageLoading 1s 0.2s ease-in-out infinite;
}
.kd-spin--page .kd-spin-dot-item:nth-child(2n + 3) {
    background-color: #05c8c8;
    animation: pageLoading 1s 0.1s ease-in-out infinite;
}
.kd-spin--page .kd-spin-dot-item:nth-child(2n + 4) {
    background-color: #a06eff;
    animation: pageLoading 1s ease-in-out infinite;
}
.kd-spin--page .kd-spin-dot-item {
    width: 15px;
    height: 15px;
    background-color: #2386ee;
    border-radius: 50%;
}
@keyframes pageLoading {
				50% {
					transform: scale(1.3);
				}
				100% {
					transform: scale(1);
				}
			}
</style>
