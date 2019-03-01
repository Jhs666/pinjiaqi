// pages/recommend/recommend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    curHdIndex: 0,
    index: 0,
    index1: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        type: options.id
      },
      method: 'POST',
      success: function(data) {
          console.log(data)
        that.setData({
          inform: data.data.data
        })
        wx.stopPullDownRefresh()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  active: function(e) {
    let that = this;
    var dataId = e.currentTarget.dataset.index;
    that.setData({
      curHdIndex: dataId
    })
  },
  // 一元拼
  one_choose_tab: function(options) {
    var that = this;
    var dataId = options.currentTarget.dataset.index;
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        one: 1
      },
      method: 'POST',
        success: function (data) {
            console.log(data)
        that.setData({
          inform: data.data.data
        })
        that.setData({
          curHdIndex: dataId
        })
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 0元砍
  zero_choose_tab: function(options) {
    var that = this;
    var dataId = options.currentTarget.dataset.index;
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        zero: 1
      },
      method: 'POST',
        success: function (data) {
            console.log(data)
        that.setData({
          inform: data.data.data,
          curHdIndex: dataId
        })
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    var page_name='';
    if (dataset.id.zero==1){
        page_name='zero_goods_show';
    } else{
      page_name = 'one_goods_show';
    }
    wx.navigateTo({
      url: '../' + page_name +'/' + page_name+'?id=' +
        dataset.id.id + '&title=' + dataset.id.title + '&one=' + dataset.id.one + '&zero=' + dataset.id.zero,
    })
  },
  // 提示
  tishi: function () {
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
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
        // console.log(data)
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
        }
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