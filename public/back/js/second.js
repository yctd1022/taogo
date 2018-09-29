/**
 * Created by Administrator on 2018/9/29.
 */
$(function () {
  var pageSize = 3;
  var pages = 1;
  render()
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: pages,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        $("tbody").html(template("tmp",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a,d,f,page) {
            pages = page;
            render();
          }
        })
      }
    })
  };
  $("#addbtn-Second").on("click", function () {
    $("#addsecond").modal("show");
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100000
      },
      dataType: "json",
      success: function (info) {
        //console.log(info)
        $(".dropdown-menu").html(template("tmpsecond",info));
      }
    })
  });
  $(".dropdown-menu").on("click","a", function () {
    let txt = $(this).text();
    //console.log(txt)
    $("#dropdownTxt").text(txt);
    var ids = $(this).data("id");
    $('[name="categoryId"]').val( ids );
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e, data) {
      //console.log(data);
      var pics = data.result.picAddr;
      console.log(pics)
      $("#imgBox img").attr("src",pics);
      $('[name="brandLogo"]').val(pics);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });
  $('#form').on("success.form.bv", function(e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          $('#addsecond').modal("hide");
          currentPage = 1;
          render();
          $('#form').data("bootstrapValidator").resetForm(true);
          $('#dropdownTxt').text("请选择一级分类");
          $('#imgBox img').attr("src", "images/none.png");
        }
      }
    })

  })
})