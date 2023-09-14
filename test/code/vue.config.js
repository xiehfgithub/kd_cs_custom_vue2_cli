/*
 * @Author: hfxie
 * @Date: 2020-01-01 17:08:58
 * @LastEditors: haifeng_xie haifeng_xie@kingdee.com
 * @LastEditTime: 2023-09-12 11:05:01
 * @Description: file content
 */
/**
 *
 * cli 配置文件
 *
 * 文档：https://cli.vuejs.org/zh/config/
 */
const path = require("path");


module.exports = {

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "./src/assets/less/main.less"),
      ],
    },
  },
  // 部署应用包时的基本URL，置空使用相对路径
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  publicPath: "",
  // 打包输出目录
  outputDir: path.resolve(__dirname, "../"),
  assetsDir: "src",
  // 是否在生产环境使用sourcemap
  productionSourceMap: !false,
  css: {
    extract: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // 去掉文件名中的 hash
  filenameHashing: false,
  // 保存时eslint-loader检查
  lintOnSave: true,

  // 删除 HTML 相关的 webpack 插件
  chainWebpack: config => {
    // config.plugins.delete('html')
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
    config.optimization.delete("splitChunks"); // 关闭代码分离，只生成一个js文件和css文件

    if (process.env.use_analyzer) { // 分析
      config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
  configureWebpack: {
    output: {
      filename: "index.js",
      chunkFilename: "[name].js",
    },
    resolve: {
      alias: {
        "vue$": "vue/dist/vue.esm.js",
        // 此resolve通常是外面定义的一个nodejs的函数，用于生成绝对路径
        "@": path.resolve("src"),
        "@public": path.resolve("public"),
        "@assets": path.resolve("src/assets"),
      },
    },
    // devtool: "source-map",
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/be/data": {
        target: "http://172.23.7.138:8080",
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/be/data": "", // 重写接口
        },
      },
    },
  },

};
