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
    title: '', //标题
    price: '', //价格
    orderform_sn: '', //订单号
    value: [], //出行人姓名
    idArr: [], //出行人id
    realname: app.globalData.realname ? app.globalData.realname : '', //联系人
    phone: app.globalData.phone ? app.globalData.phone : '', //电话
    email: app.globalData.email ? app.globalData.email : '', //邮箱
    item_id: '', //商品id
    tihuoWay: '', //出行日期
    yyyy: "", //优惠券
    go_num: '', //出行人数
    travel_human_type: '',//成人出行数量
    travel_child_human_type: '',//儿童出行数量
    travel_total: '',//出行类型合并
    item_seckill_id: ''//秒杀活动id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var dateTime = wx.getStorageSync('orderDetail');
    app.globalData.goods_id = dateTime.id //商品id
    var item_seckill_id = dateTime.item_seckill.id//秒杀活动id
    app.globalData.avtivity_id = item_seckill_id
    that.setData({
      price: app.globalData.jiage, //价格
      go_num: app.globalData.shuliang, //出行人数
      tihuoWay: app.globalData.go_date, //时间
      dateTime: dateTime,
      timeID: app.globalData.timeID, //时间id
      realname: app.globalData.realname ? app.globalData.realname : '', //联系人
      phone: app.globalData.phone ? app.globalData.phone : '', //电话
      email: app.globalData.email ? app.globalData.email : '', //邮箱
      travel_human_type: app.globalData.travel_human_type,//成人出行数量
      travel_child_human_type: app.globalData.travel_child_human_type,//儿童出行数量
      travel_total: app.globalData.travel_total,//出行类型合并
    })
    app.globalData.travlist = 1;
    // 出行人标识
    app.globalData.num = 1;
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
  },
  // 输入出行人、联系人、手机号、邮箱
  trip_nameInput: function (e) {
    var that = this
    that.setData({
      value: app.globalData.value
    })
  },
  realnameInput: function (e) {
    var that = this
    that.setData({
      realname: e.detail.value
    })
  },
  phoneInput: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  emailInput: function (e) {
    var that = this
    that.setData({
      email: e.detail.value
    })
  },
  formSubmit: function (options) {
    var that = this
    var id = that.data.idArr //出行人id
    var timeID = that.data.timeID //出行时间id
    var go_num = that.data.go_num //出行人数
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
    //此处请求立即抢购
    common.loading()
    var v_data = {
      openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      item_id: app.globalData.goods_id, //商品id,应该在点击商品的时间中获取商品id/commodity_id
      buy_type: 8, //购买方式
      share_status: 1, //公开拼团状态
      trip_id: that.data.idArr, //出行人id
      item_num: go_num, //数量，也就是出行人数
      item_seckill_id: app.globalData.avtivity_id,//秒杀活动id
      integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
      trip_time_id: timeID, //出行时间
      urgency_name: realname,//联系人
      urgency_phone: phone,//电话
      urgency_email: email,//邮箱
    };
    console.log(v_data)
    wx.request({
      url: app.data.requestUrl + '/orderform/create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: v_data,
      success: function (res) {
        console.log(res)
        var this_res = res.data.data;
        if (false === common.check_res_code(res.data, false)) {
          return false;
        }
        common.loading()
        // 发起支付
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
        wx.hideLoading();
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
  //选择出行人
  choose_triper: function () {
    app.globalData.realname = this.data.realname//联系人
    app.globalData.phone = this.data.phone//电话
    app.globalData.email = this.data.email//邮箱
    app.globalData.go_num = this.data.go_num//出行总人数
    app.globalData.travel_human_type = this.data.travel_human_type//成人出行人数
    app.globalData.travel_child_human_type = this.data.travel_child_human_type//儿童出行人数
    app.globalData.travel_total = this.data.travel_total//出行类型合并
    wx.navigateTo({
      url: '../traveller/traveller?donghua=3',
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