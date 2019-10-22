// pages/city/city.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    searchKey: '',
    curHdIndex: 0,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //输入
  getSearchKey: function(options) {
    this.setData({
      searchKey: options.detail.value
    });
  },
  search_btn: function(options) {
    var that = this;
    var history = wx.getStorageSync("history") || [];
    history.push(that.data.searchKey)
    wx.setStorageSync("history", history);
    that.setData({
      history
    })
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        title: that.data.searchKey,
        call_type:1
      },
      method: 'POST',
      success: function(data) {
        console.log(data.data.data.length)
        if (data.data.data.length == 0) {
          wx.showToast({
            title: '没有找到你想要的内容~',
            icon: 'none',
            duration: 2000
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
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 点击取消返回首页
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  //删除历史记录
  clearHistory: function() {
    this.setData({
      history: []
    })
    wx.setStorageSync("history", [])
  },
  routeToSearchResPage: function(e) {
    var that = this;
    var history_text = e.target.dataset.text
    console.log(history_text)
    that.setData({
      searchKey: history_text
    })
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        title: history_text,
        call_type:1
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        if (data.data.data == '') {
          wx.showToast({
            title: '没有找到你想要的内容~',
            icon: 'none',
            duration: 2000
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
      error: function(data) {
        console.log(data)
      }
    })
    // if (!that.data.searchKey) {
    //   return
    // }
    // var history = wx.getStorageSync("history") || [];
    // history.push(that.data.searchKey)
    // wx.setStorageSync("history", history);
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
    this.setData({
      history: wx.getStorageSync("history") || []
    })
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