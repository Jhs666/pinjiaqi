// pages/search_fenlei/search_fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexSize: 0,
    indicatorDots: false,
    autoplay: false,
    duration: 0, //可以控制动画
    list: '',
    detail: [{
        id: 1,
        title: '热门',
        list: [{
            taglist: '海滨海岛',
          },
          {
            taglist: '海滨海岛',
          },
          {
            taglist: '海滨海岛',
          },
          {
            taglist: '海滨海岛',
          },
          {
            taglist: '海滨海岛',
          },
          {
            taglist: '海滨海岛',
          },
          {
            taglist: '海滨海岛',
          },
        ],
        best: [{
          img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
          place: '稻城',
          num: '72.5万人出游'
        }],
        show: [{
            img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
            place: '香格里拉',
            num: '32.5万人出游'
          },
          {
            img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
            place: '香格里拉',
            num: '32.5万人出游'
          },
          {
            img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
            place: '香格里拉',
            num: '32.5万人出游'
          },
          {
            img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
            place: '香格里拉',
            num: '32.5万人出游'
          },
        ],
      },
      {
        id: 2,
        title: '周边',
        list: [{
          taglist: '海滨海岛',
        }],
        show: [{
          img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
          place: '香格里拉',
          num: '32.5万人出游'
        }],
      },
      {
        id: 3,
        title: '境内',
        list: [{
          taglist: '海滨海岛',
        }],
        show: [{
          img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
          place: '香格里拉',
          num: '32.5万人出游'
        }],
      },
      {
        id: 4,
        title: '港澳',
        list: [{
          taglist: '海滨海岛',
        }],
        show: [{
          img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
          place: '香格里拉',
          num: '32.5万人出游'
        }],
      },
      {
        id: 5,
        title: '台湾',
        list: [{
          taglist: '海滨海岛',
        }],
        show: [{
          img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
          place: '香格里拉',
          num: '32.5万人出游'
        }],
      },
      {
        id: 6,
        title: '日本',
        list: [{
          ttaglist: '海滨海岛',
        }],
        show: [{
          img: 'http://pjqly.com/public/wx_mini/images//ceshi.jpg',
          place: '香格里拉',
          num: '32.5万人出游'
        }],
      },
      {
        id: 7,
        title: '海岛风情',
        list: [{
          taglist: '海滨海岛',
        }],
      },
      {
        id: 8,
        title: '东南亚',
        list: [{
          taglist: '海滨海岛',
        }],
      },
      {
        id: 9,
        title: '欧洲',
        list: [{
          taglist: '海滨海岛',
        }],
      },
      {
        id: 10,
        title: '美洲',
        list: [{
          taglist: '海滨海岛',
        }],
      },
      {
        id: 11,
        title: '澳中东非',
        list: [{
          taglist: '海滨海岛',
        }],
      },
      {
        id: 12,
        title: '免签',
        list: [{
          taglist: '海滨海岛',
        }],
      },
      {
        id: 13,
        title: '落地签',
        list: [{
          taglist: '海滨海岛',
        }],
      },
    ],
  },
  change(e) {
    this.setData({
      indexSize: e.detail.current
    })
  },
  scrollTo(e) {
    this.setData({
      indexSize: e.target.dataset.index
    })
  },
  stopTouchMove: function() {
    return false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 点击取消返回首页
  back: function () {
    wx.navigateBack({
      delta: 2
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