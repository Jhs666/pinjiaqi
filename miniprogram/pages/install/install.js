// pages/install/install.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    username: '',
    name: '',
    phone: '',
    sex: '',
    idcard: '',
    token: '',
    openid: ''
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
  blurPhone: function(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
    console.log(that.data.phone);
  },
  formSubmit: function(options) {
    var that = this
    // 本地获取openid和token
    var token = wx.getStorageSync('token')
    var openid = wx.getStorageSync('openid')
    that.setData({
      token: token,
      openid: openid
    })
    wx.request({
      url: 'https://pin.lanhaihui.net/public/index.php/index/user/wx_mini_fill_user_idcard',
      data: {
        openid: getApp().globalData.user.openid,
        token: getApp().globalData.user.token,
        realname: that.data.name,
        phone: that.data.phone,
        idcard: that.data.idcard
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        // return true;
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
  onLoad: function(options) {
    app.onLoad();
    this.setData({
      user: getApp().globalData.user
    })
    this.globalData = {
      user: [{
        "id": 0,
        "account": "",
        "openid": "",
        "phone": "",
        "email": "",
        "password": "",
        "nickname": "",
        "realname": "",
        "spell_family_name": "",
        "spell_name": "",
        "sex": 1,
        "country": "",
        "birthday": "",
        "profile_photo": "",
        "region_id": 0,
        "card_type": "",
        "idcard": "",
        "front_img": "",
        "reverse_img": "",
        "card_ident_status": "",
        "longitude": "",
        "latitude": "",
        "cover": "",
        "create_time": "",
        "update_time": "",
        "token": "",
        "wx_mini_reg_status": 2,
        "is_delete": 1
      }]
    }
  },
  // 退出登录
  out_btn: function() {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/login/exitlogin',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        wx.showToast({
          title: data.data.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '../user/user',
          })
        }, 1000)
      },
      error: function(data) {
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