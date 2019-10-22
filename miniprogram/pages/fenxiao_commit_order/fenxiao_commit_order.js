// pages/commit_order/commit_order.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    animationData: '',
    title: '',
    item_id: '',
    price: '',
    item_id: '',//商品id
    orderform_sn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var dateTime = wx.getStorageSync('orderDetail')[0];
    that.data.iid = dateTime.id //商品id
    that.setData({
      dateTime: dateTime,
    })
  },
  formSubmit: function (options) {
    var that = this
    common.loading()
    var v_data = {
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
      buy_type: 7, //购买方式
      trip_id: getApp().globalData.user.id, //出行人id
      item_num: 1, //应该从用户购买商品的表单中获取commodity_num
    };
    wx.request({
      url: app.data.requestUrl + '/orderform/create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: v_data,
      success: function (res) {
        console.log(res)
        if (false === common.check_res_code(res.data, false)) {
          return false;
        }
        var orderform_sn = res.data.data.orderform_sn
        wx.request({
          url: app.data.requestUrl + '/orderform/place_on',
          data: {
            orderform_sn: orderform_sn, //创建订单接口返回的订单号
            order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
            token: getApp().globalData.user.token,
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var this_res = res.data.data;
            common.loading()
            if (false === common.check_res_code(res.data, false)) {
              return false;
            }
            // 发起支付
            wx.requestPayment({
              'appId': this_res.appId,
              'timeStamp': this_res.timeStamp,
              'nonceStr': this_res.nonceStr,
              'package': this_res.package,
              'signType': this_res.signType,
              'paySign': this_res.paySign,
              'success': function (res) {
                console.log(res);
                var msg = data.data.data
                wx.showToast({
                  title: msg,
                  icon: 'none',
                  duration: 5000
                })
                wx.showToast({
                  title: '支付成功'
                });
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../pay_success/pay_success?item_price=' + app.globalData.jiage,
                  })
                }, 2000)
                wx.hideLoading();
              },
              'fail': function (res) {
                console.log(res)
              }
            });
            wx.hideLoading();
          },
          error: function (data) {
            console.log(data)
          }
        })
        common.loading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0.1)
  },
  hideModal: function () {
    this.setData({
      showModalStatus: false,
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