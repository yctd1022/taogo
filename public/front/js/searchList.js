/**
 * Created by Administrator on 2018/10/10.
 */
$(function () {
  var val = getSearch().key;
  $(".search_input").val(val);
  render();
  //console.log(val);
  function render() {
    var params = {};
    params.page = 1;
    params.pageSize = 10;
    params.proName = $(".search_input").val();
    var current = $(".sort a.current");
    if(current.length > 0){
      var sortName = $(".current").data("type");
      var sortValue = $(".current").find("i").hasClass("fa-angle-down") ? 2: 1;
      params[sortName] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        success: function (info) {
          //console.log(info)
          $(".product").html(template("search_tmp",info));
        }
      })
    },500);
  };
  $("#add_btn").on("click", function () {
    //var val = $(".search_input").val();
    //console.log(input_txt);
    var  key = $(".search_input").val().trim();
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
  });
  $(".sort a[data-type]").on("click", function () {
    if($(this).hasClass("current")){
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $(this).addClass("current").siblings().removeClass("current");

    }
    render();
  })
})