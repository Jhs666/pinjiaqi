// pages/recommend/recommend.js
const app = getApp()
var common = require('../../utils/public.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [{}],//商品信息
    formatTime: '',//倒计时
    team: [{}],//拼单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/team/info',
      data: {
        token: getApp().globalData.user.token,
        id: options.groupID
      },
      method: 'POST',
      success: function(data) {
        console.log(data);
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        var times = data.data.data.lack_time;
        that.setData({
          inform: data.data.data,
          formatTime: that.formatTime(times),
          team: data.data.data.team_piece_list[0],
        })
        wx.hideLoading()
        var timer = setInterval(function() {
          if (times == 0) {
            clearInterval(timer);
            that.setData({
              formatTime: '拼团已结束'
            })
          } else {
            times--;
            that.setData({
              formatTime: that.formatTime(times)
            })
          }
        }, 1000)
        app.globalData.item_id = data.data.data.item_id
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 倒计时函数
  formatTime: function(time) {
    function add(val) {
      if (parseFloat(val) < 10) {
        return '0' + val;
      } else {
        return val;
      }
    }
    var day = add(parseInt(time / 86400));
    var hour = add(parseInt((time - day * 86400) / 3600));
    var minute = add(parseInt((time - day * 86400 - hour * 3600) / 60));
    var second = add(parseInt(time - day * 86400 - hour * 3600 - minute * 60));
    return day + '天：' + hour + '时：' + minute + '分：' + second + ' 秒后结束'
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
  onShareAppMessage: function(res) {
    var that = this
    var user_id = getApp().globalData.user.id //当前用户id
    var user_name = getApp().globalData.user.nickname //当前用户昵称
    var id = app.globalData.item_id //商品id
    that.data.aaa = app.globalData.item_id//重新定义商品id
    var share_title = '来自' + user_name + '的分享' //我自定义的标题
    if (res.from === 'button') { //我自定义的分享
      return {
        title: share_title,
        path: '/pages/goods_show/goods_show?share_btn=1' + '&user_id' + user_id + '&id=' + that.data.aaa,
      }
    } else if (res.from === 'menu') { //右上角自带分享
      return {
        title: share_title,
        path: '/pages/goods_show/goods_show?share_btn=1' + '&user_id' + user_id + '&id=' + that.data.aaa,
      }
    }
  }
})