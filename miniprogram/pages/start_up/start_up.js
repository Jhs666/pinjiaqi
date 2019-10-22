// pages/start_up/start_up.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1. 轮播图片数据
    imgUrls: [
      'http://pjqly.com/public/wx_mini/images/start1.jpg',
      'http://pjqly.com/public/wx_mini/images/start2.jpg',
      'http://pjqly.com/public/wx_mini/images/start3.jpg',
    ],
    //2. 轮播配置
    indicatorDots: false,
    autoplay: true,
    interval: 900000,
    duration: 600,
    swiperCurrent: 0,
    imgheight: '', //图片高度
    time: 10,
    popup: true, //砍价弹窗默认隐藏
    user: '', //用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var imgheight = res.windowHeight
        that.setData({
          imgheight: imgheight
        })
      },
    })
    that.setData({
      user: getApp().globalData.user
    })
    var login_status = getApp().globalData.user[0].wx_mini_reg_status
    if (login_status != 3) {
      //调用弹出动画
      that.showPopup()
    } else {
      that.hidePopup()
    }
  },
  //轮播图滑动 指示点
  swiperChange(e) {
    let current = e.detail.current;
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  // 进入首页
  get_into: function() {
    clearInterval(this.data.Time)
    wx.reLaunch({
      url: '../index/index',
    })
  },
  //登录弹窗动画
  onShow: function() {
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function() {
      if (next) {
        this.animation.scale(0.95).step()
        next = !next;
      } else {
        this.animation.scale(1).step()
        next = !next;
      }
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 600)
  },
  //隐藏弹窗
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  // 显示弹窗
  showPopup() {
    this.hidePopup(false);
  },
  //授权登录
  bindgetuserinfo: function(e) {
    var that = this
    var wx_mini_user_info_json = e.detail.userInfo
    wx_mini_user_info_json['openid'] = getApp().globalData.user.openid;
    var wx_mini_user_info = JSON.stringify(wx_mini_user_info_json);
    wx.showLoading({
      title: '登录中...',
    })
    wx.request({
      url: app.data.requestUrl + '/user/wx_fill_user_detail',
      data: {
        token: getApp().globalData.user.token,
        wx_mini_user_info: wx_mini_user_info,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(data) {
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                url: app.data.requestUrl + '/login/miniprogramlogin',
                data: {
                  js_code: res.code,
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(data) {
                  console.log(data)
                  that.setData({
                    user: data.data.data
                  })
                  wx.hideLoading()
                  var msg = data.data.msg
                  wx.showToast({
                    title: msg,
                  })
                  that.hidePopup() //成功后隐藏弹出框
                  that.forTime() //开始进入首页倒计时
                },
                error: function(data) {
                  console.log(data)
                }
              })
            } else {
              console.log('刷新用户状态失败！' + res.errMsg)
            }
          }
        })
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //倒计时进入首页
  forTime() {
    this.data.Time = setInterval(() => {
      this.setData({
        time: --this.data.time
      })
      if (this.data.time <= 0) {
        clearInterval(this.data.Time)
        this.get_into()
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.forTime() //开始进入首页倒计时
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})