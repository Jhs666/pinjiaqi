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
    hidename5: false,
    all_order: [], //全部订单
    wait_trip: [], //待出行
    wait_payment: [], //待付款
    wait_Comment: [], //待点评
    refund: [], //退款
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selected4: false,
    pageNum: 1,
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    if (options.mkll == 0) {
      //全部订单
      wx.request({
        url: app.data.requestUrl + '/orderform/orderform_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: getApp().globalData.user.token,
          page_id: 1
        },
        success: function(data) {
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
    } else if (options.mkll == 1) {

    } else if (options.mkll == 2) {
      // 待出行
      var that = this
      common.loading()
      this.setData({
        selected: false,
        selected1: true,
        selected2: false,
        selected3: false,
        selected4: false,
      })
      wx.request({
        url: app.data.requestUrl + '/Orderform/orderform_list',
        data: {
          page_id: 1,
          trip_status: 2,
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
          that.setData({
            wait_trip: data.data.data
          })
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
    } else if (options.mkll == 3) {
      // 待付款
      var that = this
      common.loading()
      this.setData({
        selected: false,
        selected1: false,
        selected2: true,
        selected3: false,
        selected4: false,
      })
      wx.request({
        url: app.data.requestUrl + '/Orderform/orderform_list',
        data: {
          page_id: 1,
          order_pay_status: 1,
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
          that.setData({
            wait_payment: data.data.data
          })
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
    } else if (options.mkll == 4) {
      // 待点评
      var that = this
      common.loading()
      this.setData({
        selected: false,
        selected1: false,
        selected2: false,
        selected3: true,
        selected4: false,
      })
      wx.request({
        url: app.data.requestUrl + '/Orderform/orderform_list',
        data: {
          page_id: 1,
          comment_status: 1,
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
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
    } else if (options.mkll == 5) {
      // 退款
      var that = this
      common.loading()
      this.setData({
        selected: false,
        selected1: false,
        selected2: false,
        selected3: false,
        selected4: true,
      })
      wx.request({
        url: app.data.requestUrl + '/Orderform/orderform_list',
        data: {
          page_id: 1,
          refund_status: 2,
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
          that.setData({
            refund: data.data.data
          })
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
    }
    if (that.data.all_order != '' && that.data.wait_trip != '' && that.data.wait_payment != '' && that.data.wait_Comment != '' && that.data.refund != '') {
      that.setData({
        hidename1: false,
        hidename2: false,
        hidename3: false,
        hidename4: false,
        hidename5: false,
      })
    } else if (that.data.all_order == '' && that.data.wait_trip == '' && that.data.wait_payment == '' && that.data.wait_Comment == '' && that.data.refund == '') {
      that.setData({
        hidename1: true,
        hidename2: true,
        hidename3: true,
        hidename4: true,
        hidename5: true,
      })
    }
  },
  // 全部
  selected: function(e) {
    var that = this
    common.loading()
    this.setData({
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      index:0
    })
    wx.request({
      url: app.data.requestUrl + '/orderform/orderform_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: getApp().globalData.user.token,
        page_id: 1
      },
      success: function(data) {
        console.log(data)
        that.setData({
          all_order: data.data.data
        })
        wx.hideLoading()
      }
    })
  },
  // 待出行
  selected1: function(e) {
    var that = this
    common.loading()
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
      selected3: false,
      selected4: false,
      index: 1
    })
    wx.request({
      url: app.data.requestUrl + '/Orderform/orderform_list',
      data: {
        page_id: 1,
        trip_status: 2,
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          wait_trip: data.data.data
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 待付款
  selected2: function(e) {
    var that = this
    common.loading()
    this.setData({
      selected: false,
      selected1: false,
      selected2: true,
      selected3: false,
      selected4: false,
      index: 2
    })
    wx.request({
      url: app.data.requestUrl + '/Orderform/orderform_list',
      data: {
        page_id: 1,
        order_pay_status: 1,
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          wait_payment: data.data.data
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 待点评
  selected3: function(e) {
    var that = this
    common.loading()
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
      index: 3
    })
    wx.request({
      url: app.data.requestUrl + '/Orderform/orderform_list',
      data: {
        page_id: 1,
        comment_status: 1,
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          wait_Comment: data.data.data
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 退款
  selected4: function(e) {
    var that = this
    common.loading()
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
      index: 4
    })
    wx.request({
      url: app.data.requestUrl + '/Orderform/orderform_list',
      data: {
        page_id: 1,
        refund_status: 2,
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          refund: data.data.data
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //点击查看退款详情
  refund_info(e) {
    var orderform_id = e.currentTarget.dataset.suixiuha
    wx.navigateTo({
      url: '../refund/refund?suixiuha=' + orderform_id,
    })
  },
  // 点击查看
  look_order: function(e) {
    var that = this
    var sid = e.currentTarget.dataset.sew;//购买类型
    var suixiuha = e.currentTarget.dataset.suixiuha;//订单id
    if (sid == 1) { // 正常购买
      wx.navigateTo({
        url: '../order_show/order_show?suixiuha=' + suixiuha,
      })
    } else if (sid == 2) { // 正常购买建团
      var groupID = e.currentTarget.dataset.look;
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha + '&groupID=' + groupID,
      })
    } else if (sid == 3) { // 正常购买拼团
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 4) { // 一元建团
      wx.navigateTo({
        url: '../one_Progress_details/one_Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 5) { // 一元拼团
      wx.navigateTo({
        url: '../one_Progress_details/one_Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 6) { //零元砍价详情
      var suixiuha = e.currentTarget.dataset.laoda;
      wx.navigateTo({
        url: '../bargain/bargain?suixiuha=' + suixiuha,
      })
    } else if (sid == 7) { //分销商商品详情
      wx.navigateTo({
        url: '../fenxiao_order_show/fenxiao_order_show?suixiuha=' + suixiuha,
      })
    } else if (sid == 8) { //限时抢购商品详情
      wx.navigateTo({
        url: '../order_show/order_show?suixiuha=' + suixiuha,
      })
    }
  },
  //去评价
  evaluate:function(e){
    var preview_img = e.currentTarget.dataset.preview_img
    var item_id = e.currentTarget.dataset.item_id
    var orderform_id = e.currentTarget.dataset.suixiuha
    wx.navigateTo({
      url: '../comment/comment?orderform_id=' + orderform_id + '&preview_img=' + preview_img + '&item_id=' + item_id,
    })
  },
  // 获取滚动条位置
  onPageScroll: function (e) {
    var that = this;
    common.onPageScroll(e, that)
  },
  //回到顶部
  goTop: function (e) {
    common.goTop()
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
    //全部订单
    var that = this
    common.loading()
    var index = that.data.index
    console.log(index)
    if (index == 0) {//全部订单
      wx.request({
        url: app.data.requestUrl + '/orderform/orderform_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: getApp().globalData.user.token,
          page_id: ++that.data.pageNum
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
              all_order: that.data.all_order.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    }else if(index == 1){//待出行
      wx.request({
        url: app.data.requestUrl + '/orderform/orderform_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: getApp().globalData.user.token,
          trip_status: 2,
          page_id: ++that.data.pageNum
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
              wait_trip: that.data.wait_trip.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if (index == 2) {//待付款
      wx.request({
        url: app.data.requestUrl + '/orderform/orderform_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: getApp().globalData.user.token,
          order_pay_status: 1,
          page_id: ++that.data.pageNum
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
              wait_payment: that.data.wait_payment.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if (index == 3) {//待点评
      wx.request({
        url: app.data.requestUrl + '/orderform/orderform_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: getApp().globalData.user.token,
          comment_status: 1,
          page_id: ++that.data.pageNum
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
              wait_Comment: that.data.wait_Comment.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if (index == 4) {//退款
      wx.request({
        url: app.data.requestUrl + '/orderform/orderform_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: getApp().globalData.user.token,
          refund_status: 2,
          page_id: ++that.data.pageNum
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
              refund: that.data.refund.concat(data.data.data)
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
  onShareAppMessage: function() {

  }
})