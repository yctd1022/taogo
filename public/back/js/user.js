/**
 * Created by Administrator on 2018/9/28.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 4;
  let ids;
  let isDelete;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        $("tbody").html(template("tmp",info));
        //var aaa = template("tmp",info);
        //console.log(aaa);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            console.log(page)
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        })
      }
    })
  };
  $("tbody").on("click",".btn",function () {
    //console.log("11");
    $("#btn_modal").modal("show");
    ids = $(this).parent().attr("data-id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    //console.log(id,isDelete);
  });
  $("#submitBtn").on("click", function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id:ids,
        isDelete:isDelete
      },
      dataType: "json",
      success: function (info) {
       //console.log(info);
        if(info.success){
          $("#btn_modal").modal("hide");
          render();
        }
      }
    })
  })



})

