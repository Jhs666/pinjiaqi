// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mode:'widthFix',
    picture: [],
    //后端给的分数,显示相应的星星
    // num: 4,
    full_2: 0,
    empty_2: 5,
    userStars: [
      'http://pin.lanhaihui.net/public/wx_mini/images//xing1.png',
      'http://pin.lanhaihui.net/public/wx_mini/images//xing1.png',
      'http://pin.lanhaihui.net/public/wx_mini/images//xing1.png',
      'http://pin.lanhaihui.net/public/wx_mini/images//xing1.png',
      'http://pin.lanhaihui.net/public/wx_mini/images//xing1.png'
    ],
  },
  in_xin: function(e) {
    var in_xin = e.currentTarget.dataset.in;
    var full_2;
    if (in_xin === 'use_sc2') {
      full_2 = Number(e.currentTarget.id);
    } else {
      full_2 = Number(e.currentTarget.id) + this.data.full_2;
    }
    this.setData({
      full_2: full_2,
      empty_2: 5 - full_2
    })
  },
  // 星星点击事件
  starTap: function(e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = 'http://pin.lanhaihui.net/public/wx_mini/images//xing2.png'
      } else { // 其他是空心
        tempUserStars[i] = 'http://pin.lanhaihui.net/public/wx_mini/images//xing1.png'
      }
    }
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars
    })
  },
  // 上传图片
  chooseImg: function(e) {
    var that = this;
    var picture = this.data.picture;
    if (picture.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function() {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var picture = that.data.picture;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (picture.length >= 9) {
            that.setData({
              picture: picture
            });
            return false;
          } else {
            picture.push(tempFilePaths[i]);
          }
        }
        // console.log(picture);
        that.setData({
          picture: picture
        });
      }
    });
  },
  // 删除图片
  deleteImg: function() {
    this.data.picture.splice(this.index, 1)
    this.setData({
      picture: this.data.picture,
      showModal: false
    })
  },
  showDialogBtn: function (picture) {
    this.picture = picture.target.dataset.src;
    console.log(this.picture)
    this.src = picture.target.dataset.src
    this.index = picture.currentTarget.dataset.index
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {

  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
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