// pages/Cash/Cash.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [{}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      user: getApp().globalData.user
    })
    // console.log(getApp().globalData.user)
  },
  //点击提现记录跳转至记录页面
  record:function(){
    wx.navigateTo({
      url: '../Cash_details/Cash_details',
    })
  },
  // 充值
  recharge:function(){
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon:'none',
      duration:3000
    })
  },  
  // 点击提现跳转至提现页面
  confirm:function(){
    wx.navigateTo({
      url: '../Cash_commit/Cash_commit',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})