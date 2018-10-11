/**
 * Created by Administrator on 2018/10/11.
 */
$(function () {
  render();
  function render() {
    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/cart/queryCart",
        dataType: "json",
        success: function (info) {
          console.log(info);
          if(info.error === 400){
            location.href = "login.html?retUrl=" + location.href;
            return;
          }
          $(".mui-table-view").html(template("cart_Tmp",{arr:info}));
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        }
      })
    },500)
  };
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识
      down : {
        auto: true, // 加载自动下拉刷新一次
        callback: function() {
          console.log( "发送ajax请求, 进行页面刷新" )
          render();
        }
      }
    }
  });
  $(".mui-table-view").on("tap",".btn_delete", function () {
    var id = $(this).data("id");
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: [id]
      },
      dataType: "json",
      success: function (info) {
        if(info.success){
          render();
        }
      }
    })
  });
  $('.lt_main').on("tap", ".btn_edit", function () {
    var obj = this.dataset;
    var id = obj.id;
    console.log(obj);
  })
})