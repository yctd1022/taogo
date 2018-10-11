/**
 * Created by Administrator on 2018/10/11.
 */
$(function () {
  render();
  function render() {
    var iproductId = getSearch().productId;
    //console.log(id)
    $.ajax({
      type: "get",
      url: "/product/queryProductDetail",
      data: {
        id: iproductId
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        $(".mui-scroll").html(template("tmp_Price",info));
        mui(".mui-numbox").numbox();
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
      }
    })
  };
  $(".mui-scroll").on("click",".size span", function () {
    $(this).addClass("current").siblings().removeClass("current");
  });
  $("#addCart").on("click", function () {
    var sizes = $(".size span").text();
    var number = $('.mui-numbox-input').val();
    var iproductId = getSearch().productId;
    if(!sizes){
      mui.toast("请选择尺码");
      return;
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: iproductId,
        num: number,
        size: sizes,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        if(info.success){
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
            if(e.index == 0){
              location.href = "cart.html";
            }
          })
        };
        if(info.error == 400){
          location.href = "login.html?retUrl=" + location.href;
        }
      }
    })
  })
})