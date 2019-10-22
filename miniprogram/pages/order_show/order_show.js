// pages/order_show/order_show.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_show: '',
    aaa: '',
    item_title: '',
    item_id: '',
    price: '',
    orderform_sn: '',
    trip_id:'',
    suixiuha:'',
    animationData: '',
    content: '',//内容
    phone:'',//手机号
    status_name:'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    app.globalData.order_id = options.suixiuha
    wx.request({
      url: app.data.requestUrl + '/orderform/info',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        id: options.suixiuha
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          order_show: data.data.data,
        })
        that.data.bianhao = data.data.data.orderform_sn;
        that.data.shopId = data.data.data.item_id;
        that.data.trip_id = data.data.data.trip_id;
        that.data.cash_pay_sum = data.data.data.cash_pay_sum;
        app.globalData.status_show = data.data.data.order_pay_status
        if (data.data.data.order_pay_status == 1) {
          that.setData({
            aaa: "none",
            ddd: "flex"
          })
        } else if (data.data.data.order_pay_status_name == '微信已支付' || '已完成' || '已支付') {
          that.setData({
            ddd: "none",
            aaa: 'block'
          })
        } else if (data.data.data.order_pay_status_name == '已取消') {
          that.setData({
            ddd: "none",
            aaa: 'none'
          })
        }
        if (data.data.data.can_apply_refund == 1){
          that.setData({
            status_name: 'block',
          })
        } else if (data.data.data.can_apply_refund == 0){
          that.setData({
            status_name: 'none',
          })
        }
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 继续支付
  continu: function(res) {
    var that = this
    var order_data = {
      orderform_sn: that.data.bianhao, //创建订单接口返回的订单号
      order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
      token: getApp().globalData.user.token,
      trip_id: that.data.trip_id
    }
    console.log(order_data)
    // return
    wx.request({
      url: app.data.requestUrl + '/orderform/place_on',
      data: order_data,
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (false === common.check_res_code(res.data, false)) {
          return false;
        }
        var this_res = res.data.data;
        // 发起支付
        wx.requestPayment({
          'appId': this_res.appId,
          'timeStamp': this_res.timeStamp,
          'nonceStr': this_res.nonceStr,
          'package': this_res.package,
          'signType': this_res.signType,
          'paySign': this_res.paySign,
          'success': function(res) {
            console.log(res)
            wx.showToast({
              title: '支付成功'
            });
            setTimeout(function() {
              wx.navigateTo({
                url: '../pay_success/pay_success?item_price=' + item_price + '&item_title=' + item_title,
              })
            }, 2000)
          },
          'fail': function(res) {
            console.log(res)
          }
        });
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 取消订单
  cancel: function(options) {
    var that = this
    var data = {
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      orderform_sn: that.data.bianhao,
      item_id: that.data.shopId
    }
    console.log(data)
    wx.request({
      url: app.data.requestUrl + '/orderform/cancel',
      data: data,
      method: 'POST',
      success: function(data) {
        console.log(data)
        var msg = data.data.msg
        wx.showToast({
          title: msg,
          icon:'none',
          duration:3000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../order/order?mkll=0',
          })
        },2000)
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //确认出行
  confirm_trip: function (options) {
    var that = this
    wx.showModal({
      title: '温馨提示',
      content: '出行完成才可进行确认，是否继续？',
      success: function (res) {
        if (res.cancel) {
          //点击取消
          wx.showToast({
            title: '已取消',
            icon:'none',
            duration:2000
          })
        } else if (res.confirm) {
          //点击确认
          wx.request({
            url: app.data.requestUrl + '/orderform/confirm_trip',
            data: {
              token: getApp().globalData.user.token, //登陆时返回的user表字段中
              orderform_sn: that.data.bianhao,
            },
            method: 'POST',
            success: function (data) {
              console.log(data)
              var msg = data.data.msg
              wx.showToast({
                title: msg,
                icon: 'none',
                duration: 3000
              })
              that.onPullDownRefresh()
            },
            error: function (data) {
              console.log(data)
            }
          })
        }
      }
    })
  },
  // 点击申请退款
  show_Modal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      modalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 60)
  },
  // 隐藏遮罩层
  hide_Modal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        modalStatus: false
      })
    }.bind(this), 200)
  },
  //点击提交发起申请
  con_Input: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  phone_input: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  submit(){
    var that = this
    var content = that.data.content//内容
    var phone = that.data.phone//手机号
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    var msg = ''
    if (content == '') {
      msg = '请输入评价内容'
    }
    if (phone == '') {
      msg = '请输入手机号'
    } else if (!phonetel.test(phone)) {
      msg = '手机号格式不正确'
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.data.requestUrl + '/orderform/refund',
      data: {
        token: getApp().globalData.user.token, //token
        orderform_sn: that.data.bianhao,//订单号
        refund_fee: that.data.cash_pay_sum,//金额
        remark: that.data.content,//提交内容
        phone:that.data.phone,//手机号
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          status_name: 'none'
        })
        var msg = data.data.msg
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 3000
        })
        that.hide_Modal()
        that.onPullDownRefresh()
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
  onPullDownRefresh: function () {
    var that = this
    wx.showNavigationBarLoading();
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/orderform/info',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        id: app.globalData.order_id
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          order_show: data.data.data,
        })
        if (data.data.data.can_apply_refund == 1) {
          that.setData({
            status_name: 'block',
          })
        } else if (data.data.data.can_apply_refund == 0) {
          that.setData({
            status_name: 'none',
          })
        }
        wx.hideLoading()
        // 隐藏导航栏加载框
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})