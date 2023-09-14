/*
 * @Author: hfxie
 * @Date: 2021-01-20 17:10:10
 * @LastEditors: hfxie
 * @LastEditTime: 2022-07-18 15:15:34
 * @Description: file content
 */

// 汇总下方四个时间处理--获取时间轴宽度集合 type: hour day week month
export const handleTimesLineSet = ({ start, end }, type, config) => {
  const dataList = [];
  let startTime = 0; let endTime = 0;
  try {
    startTime = start.startOf(type);
    endTime = end.startOf(type);
  } catch (error) {
    return [];
  }
  while (startTime.isSameOrBefore(endTime, type)) {
    let showWords;
    let title;
    switch (type) {
        case "hour":
          showWords = startTime.format("HH");
          title = startTime.format("YYYY-MM-DD");
          break;
        case "day":
          showWords = startTime.format("DD");
          title = startTime.format("YYYY-MM");
          break;
        case "week":
          showWords = ("" + startTime.week()).padStart(2, 0);
          // title = startTime.format("YYYY-MM");
          title = startTime.format("YYYY/MM/DD") + "-" + startTime.add(6, "day").format("YYYY/MM/DD"); // 方案一
          break;
        case "month":
          showWords = startTime.format("MM");
          title = startTime.format("YYYY-MM");
          break;
        default:
          showWords = startTime.format("DD");
          title = startTime.format("YYYY-MM");
          break;
    }
    // 节假日
    let holidayType = 0;
    let holidayColor;
    if (
      type === "day" &&
      config &&
      config.enable
    ) {
      const _formatDay = startTime.day();
      const _formatMD = startTime.format("MM-DD");
      const targetDay1 = config.day || [];
      const targetDay2 = config.spcDay || [];
      const _isWeek = targetDay1.includes(_formatDay);
      const _isHoliday = targetDay2.includes(_formatMD);
      if (_isWeek) {
        // console.log("-常规休息日·例周末-", _formatDay);
        holidayType = 1;
      }
      if (_isHoliday) {
        holidayType = 2;

        if (config.colorMap && config.colorMap[_formatMD]) {
          const color = config.colorMap[_formatMD];
          // console.log(color);
          holidayColor = color;
        } else {
          holidayColor = "#ececec80"; // 默认色
        }
        // console.log("--特殊休息日·例国庆--", _formatMD, holidayColor);
      }
      if (_isWeek && _isHoliday) {
        holidayType = 3;
      }
    }

    dataList.push({
      show: showWords,
      date: startTime,
      holidayType, // 0: 工作日 1: 固定频率节假日周几 2: 特殊节假日 3: 节假日且为周末
      holidayColor, // 特殊色
      title, // hover显示
    });
    startTime = startTime.add(1, type);
  }
  // console.log(dataList);
  return dataList;
};


// 使用递归的方式实现数组、对象的深拷贝
export const deepClone = (obj) => {
  if (typeof obj !== "object") return obj;
  // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  // 进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      /* eslint-disable*/
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

//从数组中找到符合id的索引
export const fnGetIndex = (id, arr, targetProp = 'id') => {
  for(let i = 0; i < arr.length; i++){
    if(id == arr[i][targetProp]){
      return i;
    }
  }
  return -1;
}

//生成ID
export const creatID = () => {
	return Number(Math.random().toString().substr(3, 18) + Date.now()).toString(36);
}
//生成新任务
export const creatTask = (parentObj, index = '') => {
  let obj = {
    "id": `${parentObj.id}-${index}-${creatID()}`,
    "pid": parentObj.id,
    "isSealf": true,
    "isExpand": false,
    "isSelect": false,
    "level": parentObj.level + 1,
    "name": `新增子任务${parentObj.id}-${index}`,
    "cellList": [
      
    ]
    
  }
  if(parentObj.cellList.length > 0){
    for(let cell of parentObj.cellList){
      let cellModel = {
        name: "", // 单元格列名
        val: "", // 单元格值
        desc: "", // 单元格描述
        cellTag: "", // 单元格其他信息
        enable: true, // 是否可编辑
        colIndex: cell.colIndex, // 列索引
      }
      obj.cellList.push(cellModel);
    }
  }
  console.log(parentObj, obj);
  return obj;
}

// 计算角度
export const getDeg = function (x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  return (Math.atan(x / y) * 180) / Math.PI;
}

// 防抖-时间段多次只做最后一次
export const debounce = function(func, delay, immediate) {
  var timer = null;
  return function() {
    var context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var doNow = !timer;
      timer = setTimeout(function() {
        timer = null;
      }, delay);
      if (doNow) {
        func.apply(context, args);
      }
    } else {
      timer = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    }
  };
}
// 节流-时间段只允许执行一次
export const throttle = function(func, delay) {
  var prev = Date.now();
  return function() {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

/* 时间差额宽度
  单位类型: type(String["hour", "day", "week", "month"])
  起始时间戳: start(+Number)
  结束时间戳: end(+Number)
  单元基准宽度值: cellWidth(+Number)
*/
export const getDiffWidth = function(type = "day", start = 0, end = 0, cellWidth = 25) {
  if(
    typeof cellWidth != "number" ||
    cellWidth <= 0
  ) return 0;
  // console.log("参数", type, start, end, (end - start));
  let base = 1000 * 60 * 60;
  switch (type) {
    case "month":
      base *= 24 * 30;
      break;
    case "week":
      base *= 24 * 7;
      break;
    case "day":
      base *= 24 * 1;
      break;
    case "hour":

    default:
      
      break;
  }
  // let sourseWidth = parseInt((end - start) / base * cellWidth * 100) / 100 // 保留取二位小数且不舍入
  let sourseWidth = Math.round((end - start) / base * cellWidth);
  // console.log(sourseWidth)
  if(sourseWidth <= 1 && sourseWidth > 0) return 1;
  return sourseWidth;
}

// 权限检查
/* 
  level: 控件当前角色级别
  accessLevelArr: 调用方法自身对应级别数组
    1: 超级权限 | 任务进度计划 （默认）
    2: 游客 | 历史版本 (fnShow【Gantt】)
*/
export const getAuthentication = function(level, accessLevelArr = [1]){
  let _acl = new Set(accessLevelArr);
  if (
    level == 1 || 
    _acl.has(level)
  ) {
    return true; 
  }
  console.log("无权限! 当前权限:%O 角色级别:%s：", accessLevelArr, level);
  return false;
}

/**
 * @description: 数组上移某一项
 * @param {数组} fieldData
 * @param {移动目标的下标} index
 * @return {更新后数组} fieldData
 */
 export const upGo = function(fieldData = [], index = 0){
  if(index != 0) {
    fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0];
  } else {
    // fieldData.push(fieldData.shift());
  }
}
/**
 * @description: 数组下移某一项
 * @param {数组} fieldData
 * @param {移动目标的下标} index
 * @return {更新后数组} fieldData
 */
 export const downGo = function(fieldData = [], index = 0) {
  if(index != fieldData.length - 1) {
    fieldData[index] = fieldData.splice(index+1, 1, fieldData[index])[0];
  } else {
    // fieldData.unshift( fieldData.splice(index,1)[0]);
  }
}

/**
 * @description: 
 * @param {待换算时间单位} type
 * @param {待换算宽度} width
 * @param {单元格比例宽度} cellWidth
 * @return {差额时间戳}
 */
export const getDiffTimes = function(type = "day", diffWidth = 0, cellWidth = 25) {
  if(
    typeof cellWidth != "number" ||
    cellWidth <= 0 ||
    typeof diffWidth != "number"
  ) return 0;
  let base = 1000 * 60 * 60;
  switch (type) {
    case "month":
      base *= 24 * 30;
      break;
    case "week":
      base *= 24 * 7;
      break;
    case "day":
      base *= 24 * 1;
      break;
    case "hour":

    default:
      
      break;
  }
  let diffTimes = base / cellWidth * diffWidth // 保留取二位小数且不舍入
  return diffTimes;
  
}