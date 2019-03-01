// pages/more_city/more_city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place: [{
      placelist: '青岛'
    }],
    his: [{
      hislist: '青岛'
    }],
    hot: [{
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      },
      {
        hotlist: '丽江'
      }
    ],
    selected: true,
    selected1: false,
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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