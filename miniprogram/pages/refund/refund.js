// pages/refund/refund.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_show:'',//详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/orderform/info',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        id: options.suixiuha
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          order_show: data.data.data,
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})