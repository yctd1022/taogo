/**
 * Created by Administrator on 2018/9/27.
 */
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  NProgress.done();
});
$(function () {
  //下拉菜单栏
  $(".nav li .category").click(function () {
    $(".nav li .child").stop().slideToggle();
  });
  $(".tg_topbar .icon_menu").click(function () {
    $(".tg_aside").toggleClass("hidemenu");
    $(".tg_mian").toggleClass("hidemenu");
    $(".tg_mian .tg_topbar").toggleClass("hidemenu");
  });
  $(".tg_topbar .icon_logout").click(function () {
    $("#loginout_modal").modal('show');
  });
  $("#loginout").click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        //console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  });
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (info) {
      console.log(info);
      if(info.error === 400){
        location.href = "login.html"
      }
    }
  })
})