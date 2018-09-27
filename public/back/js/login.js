/**
 * Created by Administrator on 2018/9/26.
 */
$(function () {
  $("#form").bootstrapValidator({
    feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名不能少于2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"用户名不能少于6-12位"
          },
          callback:{
            message:"密码不正确"
          }
        }
      }
    }
  });
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success: function (info) {
        console.log(info);
        if(info.success){
          location.href = "index.html"
        } else if(info.error === 1000){
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        } else if(info.error === 1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  });
  //$("#form").bootstrapValidator({
  //  feedbackIcons: {
  //    valid: 'glyphicon glyphicon-ok',
  //    invalid: 'glyphicon glyphicon-remove',
  //    validating: 'glyphicon glyphicon-refresh'
  //  },
  //  fields:{
  //    username:{
  //      validators:{
  //        notEmpty:{
  //          message:"用户名不能为空"
  //        },
  //        stringLength:{
  //          min:2,
  //          max:6,
  //          message:"用户名不能少于2-6位"
  //        },
  //        callback:{
  //          message:"用户名不存在"
  //        }
  //      }
  //    },
  //    threshold:6,
  //    remote:{
  //      type:"post",
  //      url:"/employee/employeeLogin",
  //      dataType:"json",
  //      data: function (validator) {
  //        return {
  //          username:$("[name='username']").val()
  //        }
  //      },
  //      success: function (info){
  //        if(info.error === 1000){
  //          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
  //        }
  //      }
  //    },
  //    password:{
  //      validators:{
  //        notEmpty:{
  //          message:"密码不能为空"
  //        },
  //        stringLength:{
  //          min:6,
  //          max:12,
  //          message:"用户名不能少于6-12位"
  //        },
  //        callback:{
  //          message:"密码不正确"
  //        }
  //      }
  //    }
  //  }
  //});
  //$("form").on("success.form.bv", function (e) {
  //  e.preventDefault();
  //  $.ajax({
  //    type:"post",
  //    url:"/employee/employeeLogin",
  //    data:$("#form").serialize(),
  //    dataType:"json",
  //    success: function (info) {
  //      console.log(info);
  //      if(info.success){
  //        location.href = "index.html"
  //      } else  if(info.error === 1001){
  //        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
  //      }
  //    }
  //  })
  //});
  $("[type='reset']").click(function () {
    $('#form').data("bootstrapValidator").resetForm();
  })
})