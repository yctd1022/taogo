/**
 * Created by Administrator on 2018/9/27.
 */
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  NProgress.done();
})