/**
 * Created by Administrator on 2018/10/9.
 */
$(function () {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (info) {
      console.log(info)
      $(".category_left .mui-scroll ul").html(template("nav_Tmp",info))
    }
  });
  $(".category_left .mui-scroll ul").on("click","a", function () {
    //console.log("aa")
    $(this).addClass("current").parent().siblings().children().removeClass("current");
    var id = $(".category_left .mui-scroll ul li a.current").data("id");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        $(".category_right .mui-scroll ul").html(template("nav2_Tmp",info));
      }
    })
  })
})