// pages/user/user.js
var app = getApp();
var common = require('../../utils/public.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    user: [{}],
    balance:'',//余额
    diviend:'',//分红
    ret:'',//提成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    app.globalData.shoulijian = 2;
    that.setData({
      user: getApp().globalData.user
    })
    // console.log(getApp().globalData.user)
  },

  //提成和分红自动转为余额否则进入余额页面
  total: function () {
    var that = this
    var original_profit = getApp().globalData.user.wallet.ret //提成
    var original_diviend = getApp().globalData.user.wallet.diviend //分红
    if (original_profit == 0 && original_diviend == 0) {
      wx.navigateTo({
        url: '../Cash/Cash',
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '是否将提成和分红转入余额？',
        success: function (res) {
          if (res.cancel) {
            //点击取消则进入余额页面
            wx.navigateTo({
              url: '../Cash/Cash',
            })
          } else if (res.confirm) { //点击确定转换为余额
            common.loading()
            var balance_data = {
              token: getApp().globalData.user.token,
              type: 1, //1:提成和分红转余额,2:余额提现
              original_profit: original_profit, //提成值
              original_diviend: original_diviend //分红值
            }
            wx.request({
              url: app.data.requestUrl + '/balance/apply',
              data: balance_data,
              method: 'POST',
              success: function (data) {
                console.log(data)
                if (false === common.check_res_code(data.data, false)) {
                  return false;
                }
                var msg = data.data.msg
                wx.showToast({
                  title: msg,
                  icon:'none',
                  duration:3000
                })
                that.onPullDownRefresh()
              },
              error: function (data) {
                console.log(data)
              }
            })
          }
        }
      })
    }
  },

  // 进入购物车
  shop_car_list: function(options) {
    wx.navigateTo({
      url: '../shop_car/shop_car',
    })
  },
  // 下拉刷新函数
  onPullDownRefresh: function() {
    var that = this
    wx.showNavigationBarLoading();
    wx.login({
      success(res) {
        app.globalData.code = res.code;
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
              app.globalData.user = data.data.data;
              that.setData({
                user: getApp().globalData.user
              })
              // 隐藏导航栏加载框
              wx.hideNavigationBarLoading();
              // 停止下拉动作
              wx.stopPullDownRefresh();
            },
            error: function(data) {
              console.log(data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //待出行
  showlist: function() {
    wx.navigateTo({
      url: '../order/order?mkll=' + 2,
    })
  },
  //待付款
  showlist2: function() {
    wx.navigateTo({
      url: '../order/order?mkll=' + 3,
    })
  },
  //待点评
  showlist3: function() {
    wx.navigateTo({
      url: '../order/order?mkll=' + 4,
    })
  },
  //退款
  showlist4: function() {
    wx.navigateTo({
      url: '../order/order?mkll=' + 5,
    })
  },
  // 消息中心
  message: function() {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  //进入拼团中
  assemble(){
    wx.navigateTo({
      url: '../Assemble_list/Assemble_list',
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
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
                  getApp().globalData.user = data.data.data;
                  that.setData({
                    user: data.data.data
                  })
                  wx.hideLoading()
                  var msg = data.data.msg
                  wx.showToast({
                    title: msg,
                  })
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    
  }
})