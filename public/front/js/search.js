/**
 * Created by Administrator on 2018/10/9.
 */
$(function () {
  render();
  //getHistory();
  //console.log(getHistory());
  //1.搜索历史记录渲染
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(jsonStr);
    return arr;
  }


  function render() {
    var arr = getHistory();
    //console.log(arr);
    $(".history").html(template("tmp",{arr:arr}))
  }
  //2.清空历史记录
  $(".title").on("click",".icon_delete", function () {
    mui.confirm("你确认要清空历史记录嘛","温馨提示",["取消","确定"], function (e) {
      if(e.index == 1){
        localStorage.removeItem("search_list");
        render();
      }
      //console.log(e.index)
    })
  })
  //3.删除单行历史记录
  $(".history").on("click",".icon_del", function () {
    var index = $(this).data("index");
    console.log(index)
    ////console.log(index);
    var arr = getHistory();
    arr.splice(index,1);
    console.log(arr);
    //var jsonStr =
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  })
  //4.添加搜索历史记录
  $("#add_btn").on("click", function () {
    var key = $(".search_input").val().trim();
    if(key == ""){
      mui.toast("搜索不能为空");
      return;
    }
    var arr = getHistory();
    if(arr.length >= 10){
      arr.pop();
    }
    var index = arr.indexOf(key);
    if(index != -1){
      arr.splice(index,1);
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $('.search_input').val("");
    location.href = "searchList.html?key=" + key;
  })
})
