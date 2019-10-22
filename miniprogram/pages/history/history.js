// pages/Collection/Collection.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidename1: false,
    hidename2: false,
    selected1: true,
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.browsingHistory()
    if (that.data.history != '') {
      that.setData({
        hidename1: false,
        hidename2: false,
      })
    } else if (that.data.history == '') {
      that.setData({
        hidename1: true,
        hidename2: true
      })
    }
  },
  /**
   * 浏览历史
   */
  browsingHistory: function() {
    var that = this;
    wx.getStorage({
      key: 'browsingHistory',
      success: function(res) {
        that.setData({
          history: JSON.parse(res.data)
        })
      }
    })
  },
  //浏览历史跳转详情页
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_show/goods_show?id=' +
        dataset.id + '&title=' + dataset.title,
    })
  },
  selected1: function(e) {
    this.setData({
      selected: false,
      selected1: true,
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