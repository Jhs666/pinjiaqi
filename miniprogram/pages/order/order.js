// pages/directory/directory.js
const app = getApp()
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.showLoading({
      title: '加载中',
      duration: 2000
    }, 2000)
    console.log(options.mkll)
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
        }
      })
    } else if (options.mkll == 1) {

    } else if (options.mkll == 2) {
      // 待出行
      var that = this
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
        },
        error: function(data) {
          console.log(data)
        }
      })
    }else if(options.mkll == 3){
      // 待付款
      var that = this
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
        success: function (data) {
          console.log(data)
          that.setData({
            wait_payment: data.data.data
          })
        },
        error: function (data) {
          console.log(data)
        }
      })
    }else if(options.mkll == 4){
      // 待点评
      var that = this
      // this.setData({
      //   selected: false,
      //   selected1: false,
      //   selected2: false,
      //   selected3: true,
      //   selected4: false,
      // })
      wx.showToast({
        title: '努力开发中，敬请期待~',
        icon: 'none',
        duration: 2000
      })
      // wx.request({
      //   url: app.data.requestUrl + '/Orderform/orderform_list',
      //   data: {
      //     page_id: 1,
      //     comment_status: 1,
      //     token: getApp().globalData.user.token, //登陆时返回的user表字段中
      //   },
      //   method: 'POST',
      //   success: function (data) {
      //     console.log(data)
      //     that.setData({
      //       wait_Comment: data.data.data
      //     })
      //   },
      //   error: function (data) {
      //     console.log(data)
      //   }
      // })
    } else if (options.mkll == 5) {
      // 退款
      var that = this
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
        success: function (data) {
          console.log(data)
          that.setData({
            refund: data.data.data
          })
        },
        error: function (data) {
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
  selected: function(e) {
    var that = this
    this.setData({
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
    })
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
      }
    })
  },
  selected1: function(e) {
    var that = this
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
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  selected2: function(e) {
    var that = this
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
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  selected3: function(e) {
    var that = this
    // this.setData({
    //   selected: false,
    //   selected1: false,
    //   selected2: false,
    //   selected3: true,
    //   selected4: false,
    // })
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
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
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  selected4: function(e) {
    var that = this
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
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  look_order: function(e) {
    var sid = e.currentTarget.dataset.sew;
    var suixiuha = e.currentTarget.dataset.suixiuha;
    console.log(sid)
    if (sid == 1) {
      wx.showToast({
        title: '努力开发中，敬请期待~',
        icon: 'none',
        duration: 2000
      })
    } else if (sid == 2) {
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 3) {
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 4) {
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 5) {
      wx.navigateTo({
        url: '../Progress_details/Progress_details?suixiuha=' + suixiuha,
      })
    } else if (sid == 6) {
      // wx.navigateTo({
      //   url: '../bargain/bargain?suixiuha=' + suixiuha,
      // })
      wx.showToast({
        title: '努力开发中，敬请期待~',
        icon: 'none',
        duration: 2000
      })
    }
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