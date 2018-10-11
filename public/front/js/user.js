/**
 * Created by Administrator on 2018/10/11.
 */
$(function () {
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function (info) {
      console.log(info)
      if(info.error == 400){
        location.href = "login.html";
        return;
      }
      $("#userInfo").html(template("user_Tmp",info));
    }
  });
  $("#logout").on("click", function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          location.href = "login.html";
        }
      }
    })
  })
})