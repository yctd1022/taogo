/**
 * Created by Administrator on 2018/10/11.
 */
$(function () {
  $("#loginBtn").on("click", function () {
    var username = $("#username").val();
    var password = $("#password").val();
    if(username.trim() === ""){
      mui.toast("用户名不能为空");
      return;
    }
    if(password.trim() === ""){
      mui.toast("密码不能为空");
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function (info) {
        if(info.success){
          if(location.search.indexOf("retUrl") > -1){
            //拿到地址使用替换replace前面不要的去除
            var retUrl = location.search.replace("?retUrl=", "");
            location.href = retUrl;
          } else {
            location.href = "user.html";
          }
        };
        if(info.error){
          mui.toast("登录失败重新登入");
          return;
        }
      }
    })
  })

})