// import store from "../../store/index.js";
const getAuthor = function(val) {
  return val + "_hfxie";
};
const addZero = function(val) {
  console.log("后补0:", val);
  var value = Math.round(parseFloat(val) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
};
const obj = {
  getAuthor,
  addZero,

};


// export default {
//   addZero,
// };
const filters = {};
filters.install = function(Vue, options) {
  Object.keys(obj).forEach(key => {
    Vue.filter(key, obj[key]);
  });
};
export default filters;


