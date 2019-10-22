// pages/install/install.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[{}],
    save_msg: '',
    spell: false,//判断是否实名认证输入框还能继续点击
  },
  nameinput: function(e) {
    var that = this
    that.setData({
      name: e.detail.value
    })
    console.log(that.data.name);
  },
  idcardinput: function(e) {
    var that = this
    that.setData({
      idcard: e.detail.value
    })
    console.log(that.data.idcard);
  },
  sexinput: function (e) {
    var that = this
    that.setData({
      sex: e.detail.value
    })
    console.log(that.data.sex);
  },
  blurPhone: function(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
    console.log(that.data.phone);
  },
  formSubmit: function(options) {
    var that = this
    var realname = that.data.realname
    var sex = that.data.sex
    var phone = that.data.phone
    var idcard = that.data.idcard
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    var id = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    var msg = ''
    if (idcard == '') {
      msg = '请输入证件号'
      return
    } else if (!id.test(idcard)) {
      msg = '证件号格式不正确'
      return
    }
    if (phone == '') {
      msg = '请输入手机号'
      return
    } else if (!phonetel.test(phone)) {
      msg = '手机号格式不正确'
      return
    } if (sex == '') {
      msg = '请输入性别'
      return
    }
    if (realname == '') {
      msg = '请输入您的真实姓名'
      return
    }
    // app.globalData.qwe = that.data.realname;
    // 本地获取openid和token
    var token = wx.getStorageSync('token')
    var openid = wx.getStorageSync('openid')
    that.setData({
      token: token,
      openid: openid
    })
    wx.request({
      url: app.data.requestUrl +'/user/wx_mini_fill_user_idcard',
      data: {
        openid: getApp().globalData.user.openid,
        token: getApp().globalData.user.token,
        realname: that.data.name,
        phone: that.data.phone,
        idcard: that.data.idcard
      },
      method: 'POST',
      success: function(res) {
        // console.log(res)
        common.check_res_code(res.data, true)
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 3000,
          color: '#fff'
        });
        setTimeout(function() {
          wx.reLaunch({
            url: '../user/user',
          })
        }, 3000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.globalData.travlist = 2;
    app.onLoad();
    that.setData({
      user: getApp().globalData.user
    })
    // console.log(getApp().globalData.user)
    app.globalData.qwe = getApp().globalData.user.realname;
    if (app.globalData.qwe == "") {
      that.setData({
        save_msg: 'block'
      })
    } else {
      that.setData({
        save_msg: 'none'
      })
    }
    //判断实名认证后是否还能操作
    if (getApp().globalData.user.realname == '' || getApp().globalData.user.phone == '' || getApp().globalData.user.idcard=='') {
      that.setData({
        spell: false
      })
    } else {
      that.setData({
        spell: true
      })
    }
  },
  //退出登录
  login_out:function(){
    var that = this
    wx.request({
      url: app.data.requestUrl + '/login/exitlogin',
      data: {
        token: getApp().globalData.user.token
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        var msg = data.data.msg
        wx.showToast({
          title: msg,
          icon:'none',
          duration:3000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../user/user',
          })
        }, 3000);
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