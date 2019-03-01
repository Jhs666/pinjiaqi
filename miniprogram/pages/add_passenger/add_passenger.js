// pages/add_passenger/add_passenger.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '请选择',
    realname:'',
    china_name:'',
    spell_family_name:'',
    spell_name:'',
    idcard:'',
    country:'',
    phone:'',
    //证件类型
    array: ['请选择', '居民身份证', '护照'],
    objectArray: [{
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '居民身份证'
      },
      {
        id: 2,
        name: '护照'
      }
    ],
    card_type: 0,
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
    //客户类型
    kehu: ['请选择', '男客户', '女客户'],
    objectkehuArray: [{
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '男客户'
      },
      {
        id: 2,
        name: '女客户'
      }
    ],
    client_type: 0,
  },
  //证件类型
  bindcardChange(e) {
    this.setData({
      card_type: e.detail.value
    })
  },
  //性别
  bindsexChange(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  // 选择日期
  binddateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
    console.log(e.detail.value)
  },
  //客户类型
  bindkehuChange(e) {
    this.setData({
      client_type: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  // 获取输入框值
  nameInput: function (e) {
    var that = this
    that.setData({
      realname: e.detail.value
    })
    console.log(that.data.realname);
  },
  china_nameInput: function (e) {
    var that = this
    that.setData({
      china_name: e.detail.value
    })
    console.log(that.data.china_name);
  },
  spellInput: function (e) {
    var that = this
    that.setData({
      spell_family_name: e.detail.value
    })
    console.log(that.data.spell_family_name);
  },
  spell_nameInput: function (e) {
    var that = this
    that.setData({
      spell_name: e.detail.value
    })
    console.log(that.data.spell_name);
  },
  id_cardInput: function (e) {
    var that = this
    that.setData({
      idcard: e.detail.value
    })
    console.log(that.data.idcard);
  },
  countryInput: function (e) {
    var that = this
    that.setData({
      country: e.detail.value
    })
    console.log(that.data.country);
  },
  phoneInput: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
    console.log(that.data.phone);
  },
  // 添加出行人--保存按钮
  save: function (options) {
    var that = this
    // 验证格式
    var realname = that.data.realname
    var china_name = that.data.china_name
    var spell_family_name = that.data.spell_family_name
    var spell_name = that.data.spell_name
    var card_type = that.data.card_type
    var sex = that.data.sex
    var birthday = that.data.birthday
    // var client_type = that.data.client_type //客户类型
    var idcard = that.data.idcard
    var country = that.data.country
    var phone = that.data.phone
    var spellid = /^[a-z]+$/
    var spell_nameid = /^[a-z]+$/
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    var id = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    var msg = ''
    if (phone == '') {
      msg = '请输入手机号'
    } else if (!phonetel.test(phone)) {
      msg = '手机号格式不正确'
    }
    if (birthday == '') {
      msg = '请选择出生日期'
    }
    // if (client_type == '') {
    //   msg = '请选择客户类型'
    // }
    if (sex == '') {
      msg = '请选择性别'
    }
    if (country == '') {
      msg = '请输入国籍'
    }
    if (card_type == '') {
      msg = '请选择证件类型'
    }
    if (idcard == '') {
      msg = '请输入证件号'
    } else if (!id.test(idcard)) {
      msg = '证件号格式不正确'
    }
    if (spell_name == '') {
      msg = '请输入拼音名'
    } else if (!spell_nameid.test(spell_name)) {
      msg = '拼音名格式不正确'
    }
    if (spell_family_name == '') {
      msg = '请输入拼音姓'
    } else if (!spellid.test(spell_family_name)) {
      msg = '拼音姓格式不正确'
    }
    if (china_name == '') {
      msg = '请输入中文姓名'
    }
    if (realname == '') {
      msg = '请输入姓名'
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.data.requestUrl + '/trip/add',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        realname: realname,
        spell_family_name: spell_family_name,
        spell_name: spell_name,
        card_type: card_type,
        idcard: idcard,
        country: country,
        sex: sex,
        birthday: birthday,
        client_type:1,
        phone:phone
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        wx.showToast({
          title: '添加出行人成功',
          icon: 'none',
        });
        setTimeout(function () {
          wx.navigateTo({
            url: '../traveller/traveller?realname=' + realname + '&sex=' + sex,
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