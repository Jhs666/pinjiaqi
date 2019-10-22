// pages/Cash_details/Cash_details.js
var app = getApp();
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidename: false,
    cash_list: [{}],
    pageNum: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/balance/apply_list',
      data:{
        token: getApp().globalData.user.token,
        type:2,
        page_id:1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          cash_list:data.data.data,
        })
        wx.hideLoading();
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.cash_list != '') {
      that.setData({
        hidename: false
      })
    } else if (that.data.cash_list == '') {
      that.setData({
        hidename: true
      })
    }
  },
  //点击展开
  ellipsis(e) {
    let index = e.currentTarget.dataset.index;
    let ellipsis = this.data.cash_list[index];
    let ellipsis1 = 'cash_list[' + index + ']';
    ellipsis.ellipsis = !this.data.cash_list[index].ellipsis
    this.setData({
      [ellipsis1]: ellipsis
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
      url: app.data.requestUrl + '/balance/apply_list',
      data: {
        token: getApp().globalData.user.token,
        type: 2,
        page_id: that.data.pageNum++
      },
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
            cash_list: that.data.cash_list.concat(data.data.data)
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