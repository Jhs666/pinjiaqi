// pages/city/city.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place: [{
        taglist: '大理',
      },
      {
        taglist: '大理',
      },
      {
        taglist: '大理',
      },
      {
        taglist: '哒哒哒',
      },
      {
        taglist: '九重天',
      },
      {
        taglist: '黄果树瀑布',
      },
      {
        taglist: '土耳其',
      },
      {
        taglist: '巴黎',
      },
      {
        taglist: '泰山',
      },
      {
        taglist: '东京',
      },
    ],
    curHdIndex: 0,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //   搜索
  get_title: function (options) {
    var val = options.detail.value;
    this.setData({
      search_title: val
    });
  },
  search_btn: function (options) {
    var that = this
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        title: that.data.search_title
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        // return false;
        if (data.data.data=='') {
          wx.showToast({
            title: '没有找到你想要的内容~',
            icon: 'none',
            duration:2000
          })
        } else {
          that.setData({
            inform: data.data.data,
            curHdIndex: -1
          })
          app.globalData.biaoshi = 1;
            app.globalData.shoulie = data.data.data;
          wx.navigateTo({
            url: '../recommend/recommend',
          })
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 点击取消返回首页
  back: function () {
    wx.navigateBack({
      delta: 1
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