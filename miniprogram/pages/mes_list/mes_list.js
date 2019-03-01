// pages/mes_list/mes_list.js
let _page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true,
    mes_list: [{
        date: '2018年11月7日  11:09',
        h1: '消息通知',
        desc: '亲～玩的如何？您有笔订单待点评，发表优质点评即可获得10元门票代金劵红包哦！亲～玩的如何？您有笔订单待点评，发表优质点评即可获得10元门票代金劵红包哦！亲～玩的如何？您有笔订单待点评，发表优质点评即可获得10元门票代金劵红包哦！亲～玩的如何？您有笔订单待点评，发表优质点评即可获得10元门票代金劵红包哦！',
      }
    ]
  },
  ellipsis() {
    _page = this;
    let value = !this.data.ellipsis;
    _page.setData({
      ellipsis: value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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