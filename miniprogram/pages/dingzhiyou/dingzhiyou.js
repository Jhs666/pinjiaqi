// pages/dingzhiyou/dingzhiyou.js
var app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    go_date: '出行日期',
    currentTab: 0,
    left: '',
    right: '',
    current:0,
  },

  /**
   * 生命周期函数
   */
  onLoad: function() {
    
  },
  //个人定制
  // 出发地
  startInput: function(e) {
    var that = this
    that.setData({
      start: e.detail.value
    })
    // console.log(that.data.start);
  },
  // 目的地
  endInput: function(e) {
    var that = this
    that.setData({
      end: e.detail.value
    })
    // console.log(that.data.end);
  },
  // 出行日期
  binddateChange: function(e) {
    this.setData({
      go_date: e.detail.value
    })
    // console.log(e.detail.value)
  },
  // 出行人数
  numInput: function(e) {
    var that = this
    that.setData({
      num: e.detail.value
    })
    // console.log(that.data.num);
  },
  // 人均预算
  moneyInput: function(e) {
    var that = this
    that.setData({
      money: e.detail.value
    })
    // console.log(that.data.money);
  },
  // 电话
  phoneInput: function(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
    // console.log(that.data.phone);
  },
  // 备注
  remarkInput: function(e) {
    var that = this
    that.setData({
      remark: e.detail.value
    })
    // console.log(that.data.remark);
  },
  personal: function(options) {
    var that = this
    // 验证格式
    var start = that.data.start
    var end = that.data.end
    var go_date = that.data.go_date
    var num = that.data.num
    var money = that.data.money
    var phone = that.data.phone
    var remark = that.data.remark
    var msg = ''
    if (remark == '') {
      msg = '请填写备注'
    }
    if (phone == '') {
      msg = '请输入联系方式'
    }
    if (money == '') {
      msg = '请输入人均预算'
    }
    if (num == '') {
      msg = '请输入出行人数'
    }
    if (go_date == '') {
      msg = '请选择出行日期'
    }
    if (end == '') {
      msg = '请输入目的地'
    }
    if (start == '') {
      msg = '请输入出发地'
    }
    var tab_current = that.data.current
    if (tab_current == 0){
      var pass_data = {
        token: getApp().globalData.user.token,
        type: 1, //类型个人1，企业2
        user_count: num, //出行人数
        budget: money, //人均预算
        trip_time: go_date, //出发时间
        start_space: start, //出发地
        end_space: end, //目的地
        phone: phone, //手机号
        remark: remark, //备注
      }
    } else if (tab_current == 1){
      var pass_data = {
        token: getApp().globalData.user.token,
        type: 2, //类型个人1，企业2
        user_count: num, //出行人数
        budget: money, //人均预算
        trip_time: go_date, //出发时间
        start_space: start, //出发地
        end_space: end, //目的地
        phone: phone, //手机号
        remark: remark, //备注
      }
    }
    wx.request({
      url: app.data.requestUrl + '/custom/add',
      data: pass_data,
      method: 'POST',
      success: function(data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        var code = data.data.code
        if (code == 0) {
          wx.showToast({
            title: '提交成功',
          })
        }
        setTimeout(function() {
          wx.navigateTo({
            url: '../dingzhi_success/dingzhi_success',
          })
        }, 3000)
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 地址切换
  changeAddress: function() {
    if (this.data.left == 'left') {
      this.setData({
        left: '',
        right: ''
      })
    } else {
      this.setData({
        left: 'left',
        right: 'right'
      })
    }
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    var current = e.target.dataset.current
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //点击记录
  hidtory(){
    wx.navigateTo({
      url: '../dingzhi_Record/dingzhi_Record',
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