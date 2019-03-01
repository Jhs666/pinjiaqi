// pages/my_fenxiao/my_fenxiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: [{
      type_list: '邮轮游',
      start: '青岛',
      preview_img: '../../images/homes.png',
      title: '东华帝君',
      num: '5',
      price: '3000',
      page_id: '',
      id: ''
    }],
    // 关闭模态框
    showModal: false,
    selectedFlag: [false],
    user: [{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user: getApp().globalData.user
    })
  },
  // 展开折叠选择  
  changeToggle: function(e) {
    // var index = e.currentTarget.dataset.index;
    // if (this.data.selectedFlag[index]) {
    //   this.data.selectedFlag[index] = false;
    // } else {
    //   this.data.selectedFlag[index] = true;
    // }
    // this.setData({
    //   selectedFlag: this.data.selectedFlag
    // })
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
  },
  // 关闭/打开规则模态框
  rule: function() {
    // this.setData({
    //   showModal: true
    // })
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon:'none',
      duration:2000
    })
  },
  close_spell: function() {
    this.setData({
      showModal: false
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