/*
 * @Author: hfxie
 * @Date: 2022-03-30 16:46:32
 * @LastEditors: hfxie
 * @LastEditTime: 2022-03-30 16:48:40
 * @Description: vue模板template中也使用可选链操作符
 *  使用方式: {{ $chaining(obj, 'first', 'second') }}
 */
const chaining = {
  install(vue) {
    const optionalChaining = (obj, ...rest) => {
      let tmp = obj;
      for (const key in rest) {
        const name = rest[key];
        tmp = tmp?.[name];
      }
      return tmp || "";
    };
    // 添加实例方法
    vue.prototype.$chaining = optionalChaining;
  },
};

export default chaining;
