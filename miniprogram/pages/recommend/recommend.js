// pages/recommend/recommend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [{
      name: '',
    }],
    inform: [{
      type_list: '',
      start_space: '',
      preview_img: '',
      title: '',
      num: '已拼5件',
      price: '',
      page_id: '',
      id: ''
    }],
    curHdIndex: 0,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // console.log(options)
    that.setData({
      curHdIndex: options.index,
      index: options.index
    })
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        type: options.id
      },
      method: 'POST',
      success: function(data) {
        if (app.globalData.biaoshi==1){
            that.setData({
                inform: app.globalData.shoulie,
                curHdIndex: -1
            })
            app.globalData.biaoshi = 2;
        }else{
            that.setData({
                inform: data.data.data
            })
        }
        
        wx.stopPullDownRefresh()
      },
      error: function(data) {
        console.log(data)
      }
    })
    wx.request({
      url: app.data.requestUrl + '/item/item_type',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        that.setData({
          type: data.data.data
        })
        wx.stopPullDownRefresh()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_show/goods_show?id=' +
        dataset.id.id + '&title=' + dataset.id.title,
    })
  },
  choose_tab: function(options) {
    var that = this;
    // console.log(options.currentTarget.dataset.id)
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        type: options.currentTarget.dataset.id
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
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
    // console.log(dataId)
    that.setData({
      curHdIndex: dataId
    })
  },
  //   搜索
  get_title: function(options) {
    var val = options.detail.value;
    this.setData({
      search_title: val
    });
  },
  search_btn: function(options) {
    var that = this
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        title: that.data.search_title
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          inform: data.data.data,
          curHdIndex: -1
        })
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 提示
  integral: function () {
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
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