// pages/directory/directory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_id: 1,
    selected: true,
    b1: "none",
    a1: "block",
    tablist1: [], //一级切换
    tablistselected1: 0, //一级切换选中
    tablistName1: '游记', //一级切换选中name
    tablistItem1: '', //一级切换选中item
    tablist2: [],
    tablistselected2: 0,
    tablist3: [],
    eatlist: [{
        li: '饺子'
      },
      {
        li: '海鲜'
      },
      {
        li: '啤酒'
      }
    ],
    eat_list: [{
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '青岛啤酒',
        tit: '看一片海等一个人'
      },
      {
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '青岛啤酒',
        tit: '豪饮岛城醉看红瓦绿树，香飘五洲情系碧海蓝天'
      },
      {
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '鲅鱼水饺',
        tit: '饕餮世间味，最是此物鲜'
      },
      {
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '鲅鱼水饺',
        tit: '饕餮世间味，最是此物鲜'
      },
      {
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '鲅鱼水饺',
        tit: '饕餮世间味，最是此物鲜'
      }
    ],
    buylist: [{
        li: '台东'
      },
      {
        li: '万象天成'
      },
      {
        li: '海鲜市场'
      }
    ],
    buy_list: [{
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '台东夜市·步行街',
        tit: '看一片海等一个人'
      },
      {
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '万象天成',
        tit: '豪饮岛城醉看红瓦绿树，香飘五洲情系碧海蓝天'
      },
      {
        img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
        title: '海鲜市场',
        tit: '饕餮世间味，最是此物鲜'
      }
    ],
    trip: [{
        name: '大脸猫',
        time: '11',
        heart_num: '1',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '2',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '3',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '4',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '5',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '6',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '7',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '8',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        name: '大脸猫爱吃鱼',
        time: '11',
        heart_num: '8',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // tab按钮
    wx.request({
      url: app.data.requestUrl + '/guide/type_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          tablist1: data.data.data
        })
        wx.stopPullDownRefresh()
      },
      error: function(data) {
        console.log(data)
      }
    })
    this.tagAjax();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  selected1: function(e) {
    this.setData({
      tablistselected1: e.currentTarget.dataset.index, //这是id
      tablistselected2: 0, //默认选中第一个
      tablistItem1: e.currentTarget.dataset.item
    })
    // console.log(this.data.tablistselected1)
    if (e.currentTarget.dataset.name == this.data.tablistName1) {
      this.setData({
        selected: false
      })
    } else {
      this.setData({
        selected: true
      })
    }
    this.tagAjax();
    this.listAjax();
  },
  selected2: function(e) {
    this.setData({
      tablistselected2: e.currentTarget.dataset.index
    });
    this.listAjax();
  },
  // 标签
  tagAjax: function() {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/guide/lable_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        // item修改字段
        item: that.data.tablistItem1
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          tablist2: data.data.data
        });
        that.listAjax();
        wx.stopPullDownRefresh()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 列表
  listAjax: function() {
    var that = this;
    // console.log(this.data.tablistselected1)
    wx.request({
      url: app.data.requestUrl + '/guide/guide_list',
      data: {
        page_id: that.data.page_id,
        type: this.data.tablistselected1,
        lable: this.data.tablistselected2,
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          tablist3: data.data.data
        })
        wx.stopPullDownRefresh()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 详情
  goods_info(options) {
    var data = options.currentTarget.dataset.item;
    // console.log(data);
    wx.navigateTo({
      url: '../play_show/play_show?id=' +
        data.id + '&title=' + data.title,
    })
  },
  // 提示
  search: function () {
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
  add_btn: function(e) {
    this.setData({
      b1: "block",
      a1: "none"
    })
  },
  close_btn: function(e) {
    this.setData({
      b1: "none",
      a1: "block"
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})