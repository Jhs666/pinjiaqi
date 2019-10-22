// pages/message/message.js
const app = getApp()
var template = require('../../app.js');
var common = require('../../utils/public.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes_list: [{}],//消息列表
    msg_count:'',//消息条数
    show:'',//红点样式是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/message/get_message',
      data: {
        token: getApp().globalData.user.token
      },
      method: 'POST',
      success: function (data) {
        // console.log(data)
        if (data.data.data.new_message_count == 0) {
          that.setData({
            show: 'none',
            mes_list: "暂无新消息"
          })
        }else {
          var mes_list = data.data.data.message_list[0].title
          that.setData({
            mes_list: data.data.data.message_list[0].title,
            msg_count: data.data.data.new_message_count
          })
        }
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  //点击跳转
  msg_list: function () {
    wx.navigateTo({
      url: '../mes_list/mes_list',
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