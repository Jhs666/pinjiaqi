// pages/youhuiquan/youhuiquan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidename1: false,
    hidename2: false,
    selected: true,
    selected1: false,
    quan: [{
        qian: '￥388',
        man: '满￥388使用',
        news: '新人注册优惠卷',
        date: '2018.11.12至2019.02.21',
        fanwei: '所有商品均适用'
      },
      {
        qian: '8折',
        news: '新人注册折扣卷',
        date: '2018.11.12至2019.02.21',
        fanwei: '除0元购/1元购商品可用'
      }
    ],
    guoqi: [{
        qian: '￥388',
        man: '满￥388使用',
        news: '新人注册优惠卷',
        date: '2018.11.12至2019.02.21',
        fanwei: '所有商品均适用'
      },
      {
        qian: '8折',
        news: '新人注册折扣卷',
        date: '2018.11.12至2019.02.21',
        fanwei: '除0元购/1元购商品可用'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (that.data.quan != '' && that.data.guoqi != '') {
      that.setData({
        hidename1: false,
        hidename2: false,
      })
    } else if (that.data.quan == '' && that.data.guoqi == '') {
      that.setData({
        hidename1: true,
        hidename2: true
      })
    }
  },
  selected: function(e) {
    this.setData({
      selected1: false,
      selected: true,
      selected2: false,
    })
  },
  selected1: function(e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
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
  onShow: function() {},

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