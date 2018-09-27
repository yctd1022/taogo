/**
 * Created by Administrator on 2018/9/27.
 */
var echarts_1 = echarts.init(document.querySelector(".echarts_1"));
option1 = {
  title : {
    text: '2017人',
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [1222,1212,1314,1234,2213,3141,5333,1234,7552,1453,3332,1243],
    type: 'bar'
  }]
};
echarts_1.setOption(option1);

var echarts_2 = echarts.init(document.querySelector(".echarts_2"));
option2 = {
  title : {
    text: '某站点用户访问来源',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  },
  series : [
    {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
echarts_2.setOption(option2);