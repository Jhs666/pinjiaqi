// pages/play_show/play_show.js
const app = getApp()
var template = require('../../app.js');
var WxParse = require('../../wxParse/wxParse.js');
var common = require('../../utils/public.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [{}],
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/guide/guide_info',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        guide_list_string:options.id
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          inform: data.data.data,
          content: data.data.data[0].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        })
        WxParse.wxParse('article', 'html', that.data.content, that, 5);
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