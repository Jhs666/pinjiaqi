// pages/Cash_commit/Cash_commit.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [{}],
    balance:''
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
    var usable = getApp().globalData.user.wallet.balance //可用余额
    if (usable == 0){
      wx.showModal({
        title: '温馨提示',
        content: '暂时没有可提现余额',
        success:function(res){
          if (res.cancel) {
            //点击取消则返回上一页
            wx.navigateBack({
              delta: 1
            })
          } else if (res.confirm) {
            //点击确定则返回上一页
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  },
  // 点击确定执行提现请求
  balanceInput: function (e) {
    var that = this
    that.setData({
      balance: e.detail.value
    })
    console.log(e.detail.value);
  },
  sure:function(){
    var that = this
    var balance = that.data.balance
    if (balance == ''){
      wx.showToast({
        title: '金额不能为空',
        icon:'none',
        duration:3000
      })
      return
    }else{
      common.loading()
    }
    var balance_data = {
      token: getApp().globalData.user.token,
      type: 2,//1:提成和分红转余额,2:余额提现
      original_balance: getApp().globalData.user.wallet.balance,//用户当前可用余额
      extract_balance: that.data.balance//用户要提取的余额
    }
    console.log(balance_data)
    // return
    wx.request({
      url: app.data.requestUrl + '/balance/apply',
      data: balance_data,
      method: 'POST',
      success: function (data) {
        console.log(data)
        var msg = data.data.msg
        wx.showToast({
          title: msg,
          icon:'none',
          duration:3000
        })
        wx.navigateTo({
          url: '../Cash_success/Cash_success',
        })
        wx.hideLoading();
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  //点击提现记录跳转至记录页面
  record: function () {
    wx.navigateTo({
      url: '../Cash_details/Cash_details',
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