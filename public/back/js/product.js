/**
 * Created by Administrator on 2018/9/30.
 */
$(function () {
  var pageSize = 2;
  let pages = 1;
  let imgArr = [];
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        pageSize: pageSize,
        page: pages
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        $("tbody").html(template("tmp",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.pags,
          totalPages: Math.ceil(info.total / info.size),
          size:"small",
          onPageClicked: function (a,d,c,page) {
            pages = page;
            render();
          },
          itemTexts: function (type, page, current) {
            switch (type){
              case "page":
                return page;
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页"
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type){
              case "page":
                return `前往第${page}页`;
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页"
            }
          }
        })
      }
    })
  };
  $("#addProduct").on("click", function () {
    $("#add_Product").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        pageSize: 10000,
        page: 1
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        $(".dropdown-menu").html(template("tmpli",info));
      }
    })
  });
  $(".dropdown-menu").on("click","a", function () {
    var txt = $(this).text();
    $("#dropdownTxt").text(txt);
    let id = $(this).data("id");
    $('[name="brandId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
  
  //$("#fileupload").fileupload({
  //  dataType:"json",
  //  done:function (e, data) {
  //    //console.log(data);
  //
  //  }
  //});
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {

      //console.log(data.result);
      imgArr.unshift(data.result);
      console.log(imgArr);
      var imgs = data.result.picAddr;
      //console.log(imgs)
      $("#imgBox").prepend(`<img src="${imgs}" style="height: 100px;width: 100px;display: inline-block"  alt="">`);
      if(imgArr.length > 3){
        $("#imgBox img:last-of-type").remove();
        imgArr.pop();
      }
      if ( imgArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '要求尺码为 xx-xx 的格式, 例如 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  });
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    var paramsStr = $('#form').serialize();
    paramsStr += `&picName1=${imgArr[0].picName}&picAddr1=${imgArr[0].picAddr}&picName2=${imgArr[1].picName}&picAddr2=${imgArr[1].picAddr}&picName3=${imgArr[2].picAddr}&picAddr3=${imgArr[2].picName}`
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function (info) {
        if(info.success){
          $("#add_Product").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $("#dropdownTxt").text("请选择二级分类");
          $("#imgBox img").remove();
          picArr = [];
        }
      }
    })
  })
})