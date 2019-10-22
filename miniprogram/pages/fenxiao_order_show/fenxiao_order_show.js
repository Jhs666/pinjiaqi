// pages/order_show/order_show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_show: '',
    ddd: "flex",
    aaa: 'block'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log(options.suixiuha)
    var that = this
    wx.request({
      url: app.data.requestUrl + '/orderform/info',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        id: options.suixiuha
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          order_show: data.data.data,
        })
        that.data.bianhao = data.data.data.orderform_sn;
        that.data.shopId = data.data.data.item_id;
        // that.data.ddd = data.data.data.cash_pay_sum;
        if (data.data.data.order_pay_status_name == '未支付') {
          that.setData({
            aaa: "none"
          })
        }
        if (data.data.data.order_pay_status_name == '已完成') {
          that.setData({
            ddd: "none"
          })
        }
        if (data.data.data.order_pay_status_name == '已取消') {
          that.setData({
            ddd: "none"
          })
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 继续支付
  continu: function (res) {
    var that = this
    var order_data = {
      orderform_sn: that.data.bianhao, //创建订单接口返回的订单号
      order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
      token: getApp().globalData.user.token,
    }
    console.log(order_data)
    // return
    wx.request({
      url: app.data.requestUrl + '/orderform/place_on',
      data: order_data,
      method: 'POST',
      success: function (res) {
        var this_res = res.data.data;
        // 发起支付
        wx.requestPayment({
          'appId': this_res.appId,
          'timeStamp': this_res.timeStamp,
          'nonceStr': this_res.nonceStr,
          'package': this_res.package,
          'signType': this_res.signType,
          'paySign': this_res.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功'
            });
            console.log(res);
            setTimeout(function () {
              wx.navigateTo({
                url: '../pay_success/pay_success?item_price=' + item_price + '&item_title=' + item_title,
              })
            }, 2000)
          },
          'fail': function (res) {
            console.log(res)
          }
        });
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 取消订单
  cancel: function (options) {
    var that = this
    wx.request({
      url: app.data.requestUrl + '/item/get_item_trip_time',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        orderform_sn: that.data.bianhao,
        item_id: that.data.shopId
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        wx.showToast({
          title: '订单取消成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../order/order?mkll=0',
          })
        }, 2000)
      },
      error: function (data) {
        console.log(data)
      }
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