// pages/dingzhi_Record/dingzhi_Record.js
var app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: '',
    pageNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/custom/get_list',
      data: {
        token: getApp().globalData.user.token,
        page_id:1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          inform:data.data.data
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/custom/get_list',
      data: {
        token: getApp().globalData.user.token,
        page_id: ++that.data.pageNum
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 5000
          })
        } else {
          that.setData({
            inform: that.data.inform.concat(data.data.data)
          })
        }
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
  onShareAppMessage: function () {

  }
})