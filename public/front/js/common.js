/**
 * Created by Administrator on 2018/10/9.
 */
mui('.mui-scroll-wrapper').scroll({
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});

function getHistory() {
  var jsonStr = localStorage.getItem("search_list") || "[]";
  var arr = JSON.parse(jsonStr);
  return arr;
}

function getSearch() {
  var search = location.search;
//console.log(search);
  search = decodeURI(search);
//console.log(search);
  search = search.slice(1);
//console.log(search)
  search = search.split("&");
//console.log(search)
  var obj = {}
  search.forEach(function (v,i) {
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  });
  return obj;
}
