// pages/Flash_sale/Flash_sale.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timelist: [],
    curHdIndex: -1,
    index: -1,
    inform:[{}],
    formatTime: '', //倒计时
    flag: true,//是否开启倒计时
    hour:'',//时
    minute:'',//分
    second: '',//秒
    bgColor: 'rgba(0,0,0,0)',
    color: 'rgba(0,0,0,0)',
    border: '4rpx solid rgba(0,0,0,0)',
    statusBarHeight: '',
    pageNum: 2,
    scrollLeft: 0,
    scrollTop: "",
    top:'21%',
    back:'rgba(0,0,0,0)'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.timelist();
    setInterval(()=>{
      that.timelist();
    },1000)
    common.loading()
    var myDate = new Date();
    var hour = myDate.getHours();
    wx.request({
      url: app.data.requestUrl + '/Seckillitem/get_list',
      data: {
        page_id: 1,
        time: hour
      },
      method: "post",
      success: function (data) {
        // console.log(data)
        var currentTime = '';
        if (hour < 10) { 
          currentTime = '0' + hour + ':00' 
          } else {
          currentTime = hour + ':00' 
        }
        for (let i = 0; i < that.data.timelist.length; i++) {
          if (that.data.timelist[i].time == currentTime) {
            that.setData({
              curHdIndex:i,
            })
          }
        }
        that.setData({
          inform: data.data.data,
          scrollLeft: (that.data.curHdIndex - 1.37) * 79.5
        })
        // 隐藏加载框
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
    that.daojishi();
    wx.getSystemInfo({
      success(res) {
        that.setData({
          statusBarHeight: res.statusBarHeight
        })
      }
    });
  },
  // 时间表
  timelist() {
    const that = this;
    const a = 1;
    let timelist = [];
    for(let i = 0; i < 24;i++) {
      let status = '';
      if (i < new Date().getHours()) {
        status = '已结束'
      } else if (i >= new Date().getHours() && i < new Date().getHours()+1) {
        status = '进行中'
      } else if (i >= new Date().getHours() + 1){
        status = '即将开场'
      }
      let obj = {
        id: i,
        time: i < 10 ? '0' + i + ':00' : i + ':00',
        status
      };
      timelist.push(obj);
    }
    that.setData({
      timelist
    })
  },
  //倒计时
  daojishi:function(){
    var that = this
    var times = 3600 - new Date().getMinutes() * 60 + new Date().getSeconds()
    that.formatTime(times)
    var timer = setInterval(function () {
      if (!that.data.flag || times == 0) {
        clearInterval(timer);
      }else {
        times--;
        that.formatTime(times)
      }
    }, 1000)
  },
  // 轮播图片高度自适应
  imgHeight: function(e) {
    var imgheight = e.detail.height;
    this.setData({
      imgheights: imgheight
    })
  },
  //选中某天
  choose_tab: function (e) {
    let that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    if (status == '已结束') {
      this.setData({
        flag:false,
        hour:'00',
        minute: '00',
        second: '00',
        inform:[]
      })
    } else if (status == '即将开场'){
      this.setData({
        flag: false,
        hour: '60',
        minute: '00',
        second: '00',
        inform: []
      })
    } else if (status == '进行中') {
      that.setData({
        flag: true
      });
      that.daojishi();
      common.loading()
      var myDate = new Date();
      var hour = myDate.getHours();
      wx.request({
        url: app.data.requestUrl + '/Seckillitem/get_list',
        data: {
          page_id: 1,
          time: id
        },
        method: "post",
        success: function (data) {
          that.setData({
            inform: data.data.data
          })
          // 隐藏加载框
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    };

    that.setData({
      curHdIndex: index
    });
  },
  // 倒计时函数
  formatTime: function (time) {
    function add(val) {
      if (parseFloat(val) < 10) {
        return '0' + val;
      } else {
        return val;
      }
    }
    var day = add(parseInt(time / 86400));
    var hour = add(parseInt((time - day * 86400) / 3600));
    var minute = add(parseInt((time - day * 86400 - hour * 3600) / 60));
    var second = add(parseInt(time - day * 86400 - hour * 3600 - minute * 60));
    this.setData({
      hour: hour,
      minute: minute,
      second: second,
    })
  },
  onPageScroll: function (e) {
    var that = this;
    var height = (that.data.statusBarHeight + 42) + 'px'
    if (e.scrollTop > 0) {
      that.setData({
        bgColor: '#f6592c',
        color: '#fff',
        border:'4rpx solid #fff',
        top: height,
        back: '#f75b2b'
      })
    } else {
      that.setData({
        bgColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)',
        border: '4rpx solid rgba(0,0,0,0)',
        top: '21%',
        back: 'rgba(0,0,0,0)'
      })
    }
    that.setData({
      scrollTop: e.scrollTop
    })
  },
  //进入详情页
  product_show(e) {
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../Flash_sale_goods_show/Flash_sale_goods_show?id=' + dataset.id + 
        '&price=' + dataset.price + 
        '&sell=' + dataset.sell + 
        '&inventory=' + dataset.inventory +
        '&preview_img=' + dataset.preview_img +
        '&item_seckill_id=' + dataset.item_seckill_id
    })
  },
  //返回上一页
  goback() {
    wx.navigateBack({ 
      delata: 1 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    that.timelist();
    common.loading()
    var myDate = new Date();
    var hour = myDate.getHours();
    wx.request({
      url: app.data.requestUrl + '/Seckillitem/get_list',
      data: {
        page_id: that.data.pageNum++,
        time: hour
      },
      method: "post",
      success: function (data) {
        console.log(data)
        var currentTime = '';
        if (hour < 10) {
          currentTime = '0' + hour + ':00'
        } else {
          currentTime = hour + ':00'
        }
        for (let i = 0; i < that.data.timelist.length; i++) {
          if (that.data.timelist[i].time == currentTime) {
            that.setData({
              curHdIndex: i
            })
          }
        }
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 3000
          })
        } else {
          that.setData({
            inform: that.data.inform.concat(data.data.data)
          })
        }
        // 隐藏加载框
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})