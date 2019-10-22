// pages/mes_list/mes_list.js
const app = getApp()
var template = require('../../app.js');
var common = require('../../utils/public.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes_list:[],
    show:'',
    hide:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/message/get_message',
      data: {
        token: getApp().globalData.user.token
      },
      method: 'POST',
      success: function (data) {
        // console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          mes_list:data.data.data.message_list,
        })
        if (data.data.data.new_message_count != 0){
          that.setData({
            show:'block',
            hide:'none',
          })
        }else{
          that.setData({
            show: 'none',
            hide: 'block'
          })
        }
        WxParse.wxParse('article', 'html', that.data.content, that, 5);
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.mes_list != '') {
      that.setData({
        hidename1: false,
      })
    } else if (that.data.mes_list == '') {
      that.setData({
        hidename1: true,
      })
    }
  },
  //点击展开
  ellipsis(e) {
    let index = e.currentTarget.dataset.index;
    let ellipsis = this.data.mes_list[index];
    let ellipsis1 = 'mes_list[' + index + ']';
    ellipsis.ellipsis = !this.data.mes_list[index].ellipsis
    this.setData({
      [ellipsis1]: ellipsis
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