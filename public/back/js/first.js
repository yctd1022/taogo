/**
 * Created by Administrator on 2018/9/29.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 3;
  render()
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        //console.log(info)
        $("tbody").html(template("tmp",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a,d,f,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  };
  $("#addbtn-first").on("click", function () {
    $("#addfirst").modal("show");
  });
  $("#form").bootstrapValidator({
    feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message: "一级分类不能为空",
          }
        }
      }
    }
  });
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info)
        if(info.success){
          $("#addfirst").modal("hide");
          page = 1;
          render();
        }
      }
    })
    //$("#add").on("click", function () {
    //
    //})
  })
})