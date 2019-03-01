// pages/traveller/traveller.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    trip_list: [{
      realname:'',
      sex_name:''
    }]
  },
  checkboxChange(e) {
    this.setData({
      value: e.detail.value
    })
    // console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.data.requestUrl + '/trip/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function (data) {
        // console.log(data)
        that.setData({
          trip_list: data.data.data,
        })
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 选择成功后返回赋值
  success: function (options) {
    var that = this
    app.globalData.value = that.data.value
    wx.navigateTo({
      url: '../commit_order/commit_order',
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