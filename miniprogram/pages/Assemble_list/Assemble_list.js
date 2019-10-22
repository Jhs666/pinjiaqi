// pages/Assemble_list/Assemble_list.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: [{}],
    statusBarHeight: '',
    bgColor: 'rgba(0,0,0,0)',
    color: 'rgba(0,0,0,0)',
    border: '4rpx solid rgba(0,0,0,0)',
    pageNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取状态栏高度
    wx.getSystemInfo({
      success(res) {
        that.setData({
          statusBarHeight: res.statusBarHeight
        })
      }
    });
    wx.request({
      url: app.data.requestUrl + '/orderform/piece_list',
      data: {
        page_id: 1,
        token: getApp().globalData.user.token,
      },
      method: "post",
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
  //点击查看进度跳转至相应页面
  product_show(e){
    var buy_type = e.currentTarget.dataset.buy_type//购买类型
    var suixiuha = e.currentTarget.dataset.suixiuha//订单id
    if (buy_type == 2) {
      var groupID = e.currentTarget.dataset.look//团id
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha + '&groupID=' + groupID,
      })
    } else if (buy_type == 3) {
      wx.navigateTo({
        url: '../one_Progress_details/one_Progress_details?suixiuha=' + suixiuha,
      })
    } else if (buy_type == 4){
      wx.navigateTo({
        url: '../one_Progress_details/one_Progress_details?suixiuha=' + suixiuha,
      })
    } else if (buy_type == 5){
      wx.navigateTo({
        url: '../one_Progress_details/one_Progress_details?suixiuha=' + suixiuha,
      })
    } else if (buy_type == 6) {
      var suixiuha = e.currentTarget.dataset.laoda//零元团id
      wx.navigateTo({
        url: '../bargain/bargain?suixiuha=' + suixiuha,
      })
    }
  },
  //页面滚动
  onPageScroll: function (e) {
    var that = this;
    var height = (that.data.statusBarHeight + 42) + 'px'
    if (e.scrollTop > 0) {
      that.setData({
        bgColor: '#fa533d',
        color: '#fff',
        border: '4rpx solid #fff',
      })
    } else {
      that.setData({
        bgColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)',
        border: '4rpx solid rgba(0,0,0,0)',
      })
    }
    that.setData({
      scrollTop: e.scrollTop
    })
  },
  //返回上一页
  goback() {
    wx.navigateBack({
      delata: 1
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
      url: app.data.requestUrl + '/orderform/piece_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        token: getApp().globalData.user.token,
        page_id: ++that.data.pageNum
      },
      success: function (data) {
        // console.log(data)
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