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
    title: '',//标题
    price: '',//价格
    orderform_sn: '',//订单号
    value: [], //出行人姓名
    idArr: [], //出行人id
    realname: app.globalData.realname ? app.globalData.realname : '',//联系人
    phone: app.globalData.phone ? app.globalData.phone : '',//电话
    email: app.globalData.email ? app.globalData.email : '',//邮箱
    item_id: '',//商品id
    tihuoWay: '', //出行日期
    yyyy: "", //优惠券
    go_num: '', //出行总人数
    travel_human_type:'',//成人出行数量
    travel_child_human_type:'',//儿童出行数量
    travel_total:'',//出行类型合并
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var dateTime = wx.getStorageSync('orderDetail')[0];
    that.setData({
      price: app.globalData.jiage, //价格
      go_num: app.globalData.shuliang, //出行人数
      tihuoWay: app.globalData.go_date, //时间
      dateTime: dateTime,
      timeID: app.globalData.timeID,//时间id
      realname: app.globalData.realname ? app.globalData.realname : '',//联系人
      phone: app.globalData.phone ? app.globalData.phone : '',//电话
      email: app.globalData.email ? app.globalData.email : '',//邮箱
      travel_human_type: app.globalData.travel_human_type,//成人出行数量
      travel_child_human_type: app.globalData.travel_child_human_type,//儿童出行数量
      travel_total: app.globalData.travel_total,//出行类型合并
    })
    app.globalData.travlist = 1;
    // 优惠券标识
    app.globalData.shoulijian = 1;
    // 出行人标识
    app.globalData.num = 1;
    that.data.iid = dateTime.id //商品id
    if (options.weiqu == 1) {
      //优惠券
      that.setData({
        yyyy: app.globalData.ming + "-" + app.globalData.qian,
      })
    } else if (options.weiqu == 2){
      //折扣券
      that.setData({
        yyyy: app.globalData.ming + "*" + app.globalData.qian / 10 + '折',
      })
    }
    // 获取出行人值和id
    if (app.globalData.value) {
      var nameList = [];
      var idList = [];
      for (var i = 0; i < app.globalData.value.length; i++) {
        var name = app.globalData.value[i].split(',')[1];
        var id = app.globalData.value[i].split(',')[0];
        nameList.push(name)
        idList.push(id)
      }
      that.setData({
        value: nameList.join(','),
        idArr: idList.join(',')
      })
    }
    if (options.feibiao == 1) {
      that.setData({
        price: parseFloat(app.globalData.jiage) - app.globalData.qian, //满减价格
      })
    } else if (options.feibiao == 2) {
      var zhekou = (app.globalData.qian / 100);
      that.setData({
        price: (parseFloat(app.globalData.jiage) * zhekou).toFixed(2), //折扣价格
      })
    }
  },
  tiaotiao: function() {
    var that = this;
    app.globalData.realname = that.data.realname//联系人
    app.globalData.phone = that.data.phone//电话
    app.globalData.email = that.data.email//邮箱
    app.globalData.total = that.data.price
    wx.navigateTo({
      url: '../youhuiquan/youhuiquan?price=' + app.globalData.total,
    })
  },
  // 输入出行人、联系人、手机号、邮箱
  trip_nameInput: function(e) {
    var that = this
    that.setData({
      value: app.globalData.value
    })
    // console.log(app.globalData.value);
  },
  realnameInput: function(e) {
    var that = this;
    app.globalData.true_name = e.detail.value
    that.setData({
      realname: e.detail.value
    })
    // console.log(that.data.realname);
  },
  phoneInput: function(e) {
    var that = this
    app.globalData.tel = e.detail.value
    that.setData({
      phone: e.detail.value
    })
    // console.log(that.data.phone);
  },
  emailInput: function(e) {
    var that = this
    app.globalData.em = e.detail.value
    that.setData({
      email: e.detail.value
    })
    // console.log(that.data.email);
  },
  formSubmit: function(options) {
    var that = this
    var id = that.data.idArr//出行人id
    var timeID = that.data.timeID//出行时间id
    var go_num = that.data.go_num//出行人数
    var realname = that.data.realname
    var phone = that.data.phone
    var email = that.data.email
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    var msg = ''
    if (phone == '') {
      msg = '请输入手机号'
    } else if (!phonetel.test(phone)) {
      msg = '手机号格式不正确'
    }
    if (realname == '') {
      msg = '请选择联系人'
    }
    if (id == '') {
      msg = '请选择出行人'
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
    if (app.globalData.request_btn == 1) {       //此处请求正常购买
      common.loading()
      var coupon_cash_id = app.globalData.cash_id
      var coupon_discount_id = app.globalData.discount_id
      if (coupon_cash_id && !coupon_discount_id){
        that.setData({
          coupon_cash_id: app.globalData.cash_id,
          coupon_discount_id: ''
        })
      } else if (coupon_discount_id && !coupon_cash_id){
        that.setData({
          coupon_cash_id: '',
          coupon_discount_id: app.globalData.discount_id,
        })
      }else{
        that.setData({
          coupon_cash_id: '',
          coupon_discount_id:'',
        })
      }
      var v_data = {
        openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        pay_user_id: getApp().globalData.user.id, //支付用户的id
        target_user_id: getApp().globalData.user.id, //购买用户的id
        item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
        buy_type: 1, //购买方式
        trip_id: that.data.idArr, //出行人id
        coupon_cash_id: that.data.coupon_cash_id, //使用的代金卷id    app.globalData.cash_id
        coupon_discount_id: that.data.coupon_discount_id, //使用的折扣卷id  app.globalData.discount_id
        coupon_type: 1, //优惠卷使用状态
        integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
        item_num: go_num, //数量，也就是出行人数
        trip_time_id: timeID, //出行时间
        urgency_name: realname,//联系人
        urgency_phone: phone,//电话
        urgency_email: email,//邮箱
      };
      console.log(v_data)
      // return
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
          wx.hideLoading()
          var orderform_sn = res.data.data.orderform_sn
          wx.request({
            url: app.data.requestUrl + '/orderform/place_on',
            data: {
              orderform_sn: orderform_sn, //创建订单接口返回的订单号
              order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
              token: getApp().globalData.user.token,
              value: that.data.idArr, //出行人
            },
            method: 'POST',
            success: function (res) {
              var this_res = res.data.data;
              if (false === common.check_res_code(res.data, false)) {
                return false;
              }
              common.loading()
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
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else if (app.globalData.request_btn == 2){       //此处请求建团
      common.loading()
      var coupon_cash_id = app.globalData.cash_id
      var coupon_discount_id = app.globalData.discount_id
      if (coupon_cash_id && !coupon_discount_id) {
        that.setData({
          coupon_cash_id: app.globalData.cash_id,
          coupon_discount_id: ''
        })
      } else if (coupon_discount_id && !coupon_cash_id) {
        that.setData({
          coupon_cash_id: '',
          coupon_discount_id: app.globalData.discount_id,
        })
      } else {
        that.setData({
          coupon_cash_id: '',
          coupon_discount_id: '',
        })
      }
      var launch_data = {
        openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        pay_user_id: getApp().globalData.user.id, //支付用户的id
        target_user_id: getApp().globalData.user.id, //购买用户的id
        item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
        buy_type: 2, //购买方式
        intro: '', //简介
        share_status: 1, //公开拼团状态
        trip_id: that.data.idArr, //出行人id
        coupon_cash_id: that.data.coupon_cash_id, //使用的代金卷id  app.globalData.cash_id
        coupon_discount_id: that.data.coupon_cash_id, //使用的折扣卷id  app.globalData.discount_id
        coupon_type: 1, //优惠卷使用状态
        item_num: go_num, //数量，也就是出行人数
        integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
        share_status: 1, //公开拼团状态: 1 - 私密, 2-公开
        trip_time_id: timeID,//出行时间id
        urgency_name: realname,//联系人
        urgency_phone: phone,//电话
        urgency_email: email,//邮箱
      };
      console.log(launch_data)
      // return false
      wx.request({
        url: app.data.requestUrl + '/orderform/create',
        data: launch_data,
        method: 'POST',
        success: function (res) {
          console.log(res)
          // return
          if (false === common.check_res_code(res.data, false)) {
            return false;
          }
          var orderform_sn = res.data.data.orderform_sn
          common.loading()
          wx.request({
            url: app.data.requestUrl + '/orderform/place_on',
            data: {
              orderform_sn: orderform_sn, //创建订单接口返回的订单号
              order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
              token: getApp().globalData.user.token,
              value: that.data.idArr, //出行人
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              var this_res = res.data.data;
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
                  wx.showToast({
                    title: '支付成功'
                  });
                  console.log(res);
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
            },
            error: function (data) {
              console.log(data)
            }
          })
          wx.hideLoading();
        },
        error: function (data) {
          console.log(data)
        }
      })
    } else {       //此处请求拼团
      common.loading()
      var coupon_cash_id = app.globalData.cash_id
      var coupon_discount_id = app.globalData.discount_id
      if (coupon_cash_id && !coupon_discount_id) {
        that.setData({
          coupon_cash_id: app.globalData.cash_id,
          coupon_discount_id: ''
        })
      } else if (coupon_discount_id && !coupon_cash_id) {
        that.setData({
          coupon_cash_id: '',
          coupon_discount_id: app.globalData.discount_id,
        })
      } else {
        that.setData({
          coupon_cash_id: '',
          coupon_discount_id: '',
        })
      }
      var go_spell_order_data = {
        openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        pay_user_id: getApp().globalData.user.id, //支付用户的id
        target_user_id: getApp().globalData.user.id, //购买用户的id
        item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
        buy_type: 3, //购买方式
        team_id:app.globalData.groupid, //拼团id
        trip_id: that.data.idArr, //出行人id
        coupon_cash_id: that.data.coupon_cash_id, //使用的代金卷id  app.globalData.cash_id
        coupon_discount_id: that.data.coupon_cash_id, //使用的折扣卷id  app.globalData.discount_id
        coupon_type: 1, //优惠卷使用状态
        item_num: go_num, //数量，也就是出行人数
        integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
        share_status: 1,//公开拼团状态: 1 - 私密, 2-公开
        trip_time_id: timeID,//出行时间id
        urgency_name: realname,//联系人
        urgency_phone: phone,//电话
        urgency_email: email,//邮箱
      };
      console.log(go_spell_order_data)
      // return false
      wx.request({
        url: app.data.requestUrl + '/orderform/create',
        data: go_spell_order_data,
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (false === common.check_res_code(res.data, false)) {
            return false;
          }
          var orderform_sn = res.data.data.orderform_sn
          common.loading()
          wx.request({
            url: app.data.requestUrl + '/orderform/place_on',
            data: {
              orderform_sn: orderform_sn, //创建订单接口返回的订单号
              order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
              token: getApp().globalData.user.token,
              value: that.data.idArr, //出行人
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              var this_res = res.data.data;
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
                  console.log(res)
                  wx.showToast({
                    title: '支付成功'
                  });
                  console.log(res);
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
            },
            error: function (data) {
              console.log(data)
            }
          })
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    }
  },
  showModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0.1)
  },
  hideModal: function() {
    this.setData({
      showModalStatus: false,
    })
  },
  //选择出行人
  choose_triper: function() {
    app.globalData.realname =this.data.realname//联系人
    app.globalData.phone = this.data.phone//电话
    app.globalData.email = this.data.email//邮箱
    app.globalData.go_num = this.data.go_num//出行总人数
    app.globalData.travel_human_type = this.data.travel_human_type//成人出行人数
    app.globalData.travel_child_human_type = this.data.travel_child_human_type//儿童出行人数
    app.globalData.travel_total = this.data.travel_total//出行类型合并
    wx.navigateTo({
      url: '../traveller/traveller',
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