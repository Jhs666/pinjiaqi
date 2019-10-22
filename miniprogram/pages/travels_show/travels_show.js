// pages/travels_show/travels_show.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travel:'',//详情
    isClick: false,//收藏星星
    user: [{}],//用户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.globalData.travel_id = options.id
    var user_id = getApp().globalData.user.id
    common.loading()
    if (getApp().globalData.user.id) {
      var user_id = getApp().globalData.user.id
    } else {
      var user_id = null
    }
    wx.request({
      url: app.data.requestUrl + '/Travelleft/info',
      data: {
        id: app.globalData.travel_id,
        user_id: user_id
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          travel: data.data.data,//详情
          user: getApp().globalData.user,//是否登录
          isClick: data.data.data.collect_status,//是否收藏的状态
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  //点击星星进行收藏
  collection: function () {
    var that = this
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      if (!that.data.isClick == true) {
        wx.request({
          url: app.data.requestUrl + '/collect/add',
          data: {
            token: getApp().globalData.user.token, //登陆时返回的user表字段中
            type: 2,
            collect: app.globalData.travel_id,
            item_seckill_id: null
          },
          method: 'POST',
          success: function (data) {
            console.log(data)
            var msg = data.data.msg
            wx.showToast({
              title: msg,
            });
            that.setData({
              isClick: !that.data.isClick
            })
            app.globalData.collect_id = data.data.data.id
          },
          error: function (data) {
            console.log(data)
          }
        })
      } else {
        wx.request({
          url: app.data.requestUrl + '/collect/ban',
          data: {
            token: getApp().globalData.user.token,
            id: app.globalData.collect_id
          },
          method: 'POST',
          success: function (data) {
            console.log(data)
            var msg = data.data.msg
            wx.showToast({
              title: msg,
            });
            that.setData({
              isClick: !that.data.isClick
            })
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})