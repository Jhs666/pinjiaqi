// pages/activity_list/activity_list.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidename: false,
    pageNum: 2,
    activity_list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    common.loading()
    that.onPullDownRefresh()
    wx.request({
      url: app.data.requestUrl + '/tool/notice',
      data: {
        page_id:1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          activity_list:data.data.data
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.activity_list != '') {
      that.setData({
        hidename: false,
      })
    } else if (that.data.activity_list == '') {
      that.setData({
        hidename: true,
      })
    }
  },
  //查看更多
  more:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../link/link?id=' + id,
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
    var that = this
    wx.showNavigationBarLoading();
    wx.request({
      url: app.data.requestUrl + '/tool/notice',
      data: {
        page_id: that.data.pageNum++
      },
      method: 'POST',
      success: function (data) {
        if(data.data.data == ''){
          wx.showToast({
            title: '加载完成',
            icon:'none',
            duration:2000
          })
        }else{
          that.setData({
            activity_list: that.data.activity_list.concat(data.data.data)
          })
        }
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      error: function (data) {
        console.log(data)
      }
    })
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