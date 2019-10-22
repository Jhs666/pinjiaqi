// pages/edit_travel/edit_travel.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: '',
    realname: '',
    phone: '',
    idcard: '',
    sex: '',
    // birthday: '',
    client_type: '',
    //性别
    sexindex: ['请选择', '男', '女'],
    objectsexArray: [{
      id: 0,
      name: '请选择'
    },
    {
      id: 1,
      name: '男'
    },
    {
      id: 2,
      name: '女'
    }
    ],
    sex: 0,
    birthday: '请选择',
    //与本人关系
    kehu: ['请选择', '本人', '家属', '朋友', '紧急联系人'],
    objectkehuArray: [{
      id: 0,
      name: '请选择'
    },
    {
      id: 1,
      name: '本人'
    },
    {
      id: 2,
      name: '家属'
    },
    {
      id: 3,
      name: '朋友'
    },
    {
      id: 4,
      name: '紧急联系人'
    }
    ],
    client_type: 0,
  },
  // 姓名
  nameInput: function (e) {
    var that = this
    that.setData({
      realname: e.detail.value
    })
    // console.log(that.data.realname);
  },
  //性别
  bindsexChange(e) {
    this.setData({
      sex: e.detail.value
    })
    // console.log(e.detail.value)
  },
  // 选择日期
  binddateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
    // console.log(e.detail.value)
  },
  //与本人关系
  bindkehuChange(e) {
    this.setData({
      client_type: e.detail.value
    })
    // console.log(e.detail.value)
  },
  //手机号
  phoneInput: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
    // console.log(that.data.phone);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/trip/pick',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        id: app.globalData.userid
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          inform: data.data.data,
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 确定修改
  save: function () {
    var that = this
    common.loading()
    var data = {
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      id: app.globalData.userid,
      realname: that.data.realname,
      phone: that.data.phone,
      type: 2,
      sex: that.data.sex,
      birthday: that.data.birthday,
      client_type: that.data.client_type,
      idcard: ''//身份证不填
    }
    console.log(data)
    // return
    wx.request({
      url: app.data.requestUrl + '/trip/edit',
      data: data,
      method: 'POST',
      success: function (data) {
        console.log(data)
        var code = data.data.code
        if (code == 1 || code == -1 || code == -2) {
          var msg = data.data.msg
          wx.showModal({
            title: '温馨提示',
            content: msg,
          })
        } else if (code == 0) {
          var msg = data.data.msg
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../traveller/traveller',
            })
          }, 2000)
        }
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 删除
  delet: function () {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/trip/ban',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        id: app.globalData.userid
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        var msg = data.data.msg
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../traveller/traveller',
          })
        }, 2000)
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