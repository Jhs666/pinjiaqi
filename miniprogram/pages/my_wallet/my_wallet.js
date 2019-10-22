// pages/directory/directory.js
const app = getApp()
var common = require('../../utils/public.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidename1: false,
    hidename2: false,
    hidename3: false,
    hidename4: false,
    all_order: [{}], //全部
    wait_trip: [], //进行中
    wait_payment: [], //已中奖
    wait_Comment: [], //未中奖
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    index: 0,
    pageNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/oneshop/ticket_list',
      data: {
        token: getApp().globalData.user.token,
        one_shop_status:0,
        page_id:1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          all_order:data.data.data
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.all_order != '' && that.data.wait_trip != '' && that.data.wait_payment != '' && that.data.wait_Comment != '') {
      that.setData({
        hidename1: false,
        hidename2: false,
        hidename3: false,
        hidename4: false,
      })
    } else if (that.data.all_order == '' && that.data.wait_trip == '' && that.data.wait_payment == '' && that.data.wait_Comment == '') {
      that.setData({
        hidename1: true,
        hidename2: true,
        hidename3: true,
        hidename4: true,
      })
    }
  },
  // 全部
  selected: function (e) {
    var that = this
    that.setData({
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false,
      index:0
    })
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/oneshop/ticket_list',
      data: {
        token: getApp().globalData.user.token,
        one_shop_status: 0,
        page_id: 1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          all_order: data.data.data
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 进行中
  selected1: function (e) {
    var that = this
    that.setData({
      selected: false,
      selected1: true,
      selected2: false,
      selected3: false,
      index: 1
    })
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/oneshop/ticket_list',
      data: {
        token: getApp().globalData.user.token,
        one_shop_status: 2,
        page_id: 1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          wait_trip: data.data.data
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 已中奖
  selected2: function (e) {
    var that = this
    that.setData({
      selected: false,
      selected1: false,
      selected2: true,
      selected3: false,
      index: 2
    })
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/oneshop/ticket_list',
      data: {
        token: getApp().globalData.user.token,
        one_shop_status: 4,
        page_id: 1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          wait_payment: data.data.data
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 未中奖
  selected3: function (e) {
    var that = this
    that.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true,
      index: 3
    })
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/oneshop/ticket_list',
      data: {
        token: getApp().globalData.user.token,
        one_shop_status: 5,
        page_id: 1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          wait_Comment: data.data.data
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },

  //点击查看跳转至详情
  see_more: function (options){
    var one_buy_id = options.currentTarget.dataset.one_buy_id
    var index = options.currentTarget.dataset.index
    wx.navigateTo({
      url: '../Lottery_details/Lottery_details?one_buy_id=' + one_buy_id +
        '&index=' + index
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
    var index = that.data.index
    if (index == 0) {
      var data = {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: ++that.data.pageNum,
        one_shop_status: 0,
      }
      wx.request({
        url: app.data.requestUrl + '/oneshop/ticket_list',
        data: data,
        method: 'POST',
        success: function (data) {
          console.log(data)
          console.log(1)
          if (data.data.data == '') {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              all_order: that.data.all_order.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if(index == 1){
      var data = {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: ++that.data.pageNum,
        one_shop_status: 2,
      }
      wx.request({
        url: app.data.requestUrl + '/oneshop/ticket_list',
        data: data,
        method: 'POST',
        success: function (data) {
          console.log(data)
          console.log(2)
          if (data.data.data == '') {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              wait_trip: that.data.wait_trip.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if (index == 2) {
      var data = {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: ++that.data.pageNum,
        one_shop_status: 4,
      }
      wx.request({
        url: app.data.requestUrl + '/oneshop/ticket_list',
        data: data,
        method: 'POST',
        success: function (data) {
          console.log(data)
          console.log(3)
          if (data.data.data == '') {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              wait_payment: that.data.wait_payment.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if (index == 3) {
      var data = {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: ++that.data.pageNum,
        one_shop_status: 5,
      }
      wx.request({
        url: app.data.requestUrl + '/oneshop/ticket_list',
        data: data,
        method: 'POST',
        success: function (data) {
          console.log(data)
          console.log(4)
          if (data.data.data == '') {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              wait_Comment: that.data.wait_Comment.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})