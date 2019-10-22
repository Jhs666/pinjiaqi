// pages/Lottery_details/Lottery_details.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_order: [{}],
    ticket_list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var one_buy_id = options.one_buy_id
    var index = options.index
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/oneshop/ticket',
      data: {
        token: getApp().globalData.user.token,
        one_buy_id: one_buy_id,
        index: index
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          all_order: data.data.data,
          ticket_list: data.data.data.ticket_list
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