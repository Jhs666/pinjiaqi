// pages/youhuiquan/youhuiquan.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    hidename1: false,
    hidename2: false,
    selected: true,
    selected1: false,
    coupon_cash: [],
    coupon_discount: [],
    use_coupon_cash:'',
    use_coupon_discount:'',
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    app.globalData.cash_id = '';
    app.globalData.discount_id = '';
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/coupon/coupon_list',
      data: {
        token: getApp().globalData.user.token,
        page_id: 1,
        status: 1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          coupon_cash: data.data.data.coupon_cash,
          coupon_discount: data.data.data.coupon_discount,
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.coupon_cash != '' && that.data.coupon_discount != '' && that.data.use_coupon_cash != '' && that.data.use_coupon_discount != '') {
      that.setData({
        hidename1: false,
        hidename2: false,
      })
    } else if (that.data.coupon_cash == '' && that.data.coupon_discount == '' && that.data.use_coupon_cash == '' && that.data.use_coupon_discount == '') {
      that.setData({
        hidename1: true,
        hidename2: true
      })
    }
  },
  //满减
  go_shiyong: function(e) {
    var that = this
    app.globalData.ming = e.currentTarget.dataset.ming;
    app.globalData.qian = e.currentTarget.dataset.qian;
    if (app.globalData.shoulijian == 1) {
      if (parseFloat(app.globalData.total) > parseFloat(e.currentTarget.dataset.qian)){
        app.globalData.cash_id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../commit_order/commit_order?weiqu=1&feibiao=1',
        })
      }else{
        wx.showToast({
          title: '当前商品价格小于优惠券价格，暂时不能使用哦~',
          icon: 'none',
          duration: 3000
        })
      }
    }
  },
  //折扣
  go_shiyongs: function(e) {
    app.globalData.ming = e.currentTarget.dataset.ming;
    app.globalData.qian = e.currentTarget.dataset.qian;
    if (app.globalData.shoulijian == 1) {
      app.globalData.discount_id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../commit_order/commit_order?weiqu=2&feibiao=2',
      })
    }
  },
  // 点击切换
  selected: function(e) {
    var that = this
    common.loading()
    that.setData({
      selected1: false,
      selected: true,
      index: 0
    })
    wx.request({
      url: app.data.requestUrl + '/coupon/coupon_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        status: 1
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          coupon_cash: data.data.data.coupon_cash,
          coupon_discount: data.data.data.coupon_discount,
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  selected1: function (e) {
    var that = this
    common.loading()
    that.setData({
      selected: false,
      selected1: true,
      index:1
    })
    wx.request({
      url: app.data.requestUrl + '/coupon/coupon_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        status: 3
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          use_coupon_cash: data.data.data.coupon_cash,
          use_coupon_discount: data.data.data.coupon_discount,
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
    var that = this
    // app.globalData.cash_id = '';
    // app.globalData.discount_id = '';
    common.loading()
    var index = that.data.index
    if (index == 0) {
      wx.request({
        url: app.data.requestUrl + '/coupon/coupon_list',
        data: {
          token: getApp().globalData.user.token,
          page_id: ++that.data.pageNum,
          status: 1
        },
        method: 'POST',
        success: function (data) {
          console.log(data)
          if (false === common.check_res_code(data.data, false)) {
            return false;
          }
          that.setData({
            coupon_cash: that.data.coupon_cash.concat(data.data.data.coupon_cash),
            coupon_discount: that.data.coupon_discount.concat(data.data.data.coupon_discount),
          })
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    }else if(index == 1){
      wx.request({
        url: app.data.requestUrl + '/coupon/coupon_list',
        data: {
          token: getApp().globalData.user.token,
          page_id: ++that.data.pageNum,
          status: 3
        },
        method: 'POST',
        success: function (data) {
          console.log(data)
          console.log(2)
          if (false === common.check_res_code(data.data, false)) {
            return false;
          }
          that.setData({
            use_coupon_cash: that.data.use_coupon_cash.concat(data.data.data.coupon_cash),
            use_coupon_discount: that.data.use_coupon_discount.concat(data.data.data.coupon_discount),
          })
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
  onShareAppMessage: function() {

  }
})