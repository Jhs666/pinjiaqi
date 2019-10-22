// pages/pay_success/pay_success.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',//价格
    title:''//标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dateTime = wx.getStorageSync('orderDetail')[0];
    var that = this
    var item_price = options.item_price
    that.setData({
      price: item_price,
      dateTime: dateTime
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