// pages/recommend/recommend.js
const app = getApp()
var common = require('../../utils/public.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    curHdIndex: 0,
    index:0,
    pageNum: 1,
    price_start: '',//最低价
    price_end: '',//最高价
    end_space: '',//目的地
    city: '',
    hidename: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this,
    type = this.data.type,
    data = {
      page_id: 1,
      call_type: 3
    }
    common.loading()
    var city = wx.getStorageSync('city_show')
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: data,
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          inform: data.data.data,
          city:city
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
    if (that.data.inform != '') {
      that.setData({
        hidename: false,
      })
    } else if (that.data.inform == '') {
      that.setData({
        hidename: true,
      })
    }
  },
  active: function(e) {
    let that = this;
    var dataId = e.currentTarget.dataset.index;
    that.setData({
      curHdIndex: dataId
    })
  },
  // 请求切换列表
  one_choose_tab: function(options) {
    var that = this;
    common.loading()
    var dataId = options.currentTarget.dataset.index,
    data = {};
    if (dataId == 0) {
      data = {
        page_id: 1,
        call_type: 3
      }
    } else {
      data = {
        page_id: 1,
        call_type: 2
      }
    }
    that.setData({
      curHdIndex: dataId,
      pageNum: 1
    })
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: data,
      method: 'POST',
      success: function(data) {
        console.log(data)
        if(data.data.data == ''){
          that.setData({
            inform: '',
            curHdIndex: dataId,
            hidename: true,
          })
        } else {
          that.setData({
            inform: data.data.data,
            curHdIndex: dataId,
            hidename: false,
          })
        }
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 点击进入详情页
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    var page_name = '';
    if (dataset.id.zero == 1) {
      page_name = 'zero_goods_show';
    } else {
      page_name = 'one_goods_show';
    }
    wx.navigateTo({
      url: '../' + page_name + '/' + page_name + '?id=' +
        dataset.id.id + '&title=' + dataset.id.title + '&one=' + dataset.id.one + '&zero=' + dataset.id.zero,
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
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: 1,
        title: that.data.search_title
      },
      method: 'POST',
      success: function(data) {
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
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 筛选
  filter: function(e) { //点击筛选事件
    var animation = wx.createAnimation({ //创建动画
      duration: 500,
      timingFunction: 'ease',
      width: 300,
      height: 800,
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#fff',
      opcity: 0.5
    })
    this.animation = animation
    animation.translateX(-100 + 'vh').step() //动画效果向右滑动100vh
    this.setData({
      animationData: animation.export(),
      show: true
    })
  },
  // 关闭筛选
  close_gg: function() {
    var animation = wx.createAnimation({ //创建动画
      duration: 500,
      timingFunction: 'ease',
      width: 300,
      height: 800,
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#fff',
      opcity: 0.5
    })
    this.animation = animation
    animation.translateX(100 + 'vh').step() //动画效果向右滑动100vh
    this.setData({
      animationData: animation.export(),
      show: true
    })
  },
  // 筛选请求
  lowInput: function (e) {
    var that = this
    that.setData({
      price_start: e.detail.value
    })
    // console.log(that.data.price_start);
  },
  highInput: function (e) {
    var that = this
    that.setData({
      price_end: e.detail.value
    })
    // console.log(that.data.price_end);
  },
  placeInput: function (e) {
    var that = this
    that.setData({
      end_space: e.detail.value
    })
    // console.log(that.data.end_space);
  },
  formSubmit: function (options) {
    var that = this
    common.loading()
    var price_start = that.data.price_start
    var price_end = that.data.price_end
    var end_space = that.data.end_space
    that.setData({
      curHdIndex: that.data.curHdIndex,
      index: that.data.index,
    })
    app.globalData.curHdIndex = that.data.curHdIndex
    app.globalData.index = that.data.index
    var msg = ''
    if (price_start == '') {
      msg = '请输入最低价'
    }
    if (price_end == '') {
      msg = '请输入最高价'
    }
    if (end_space == '') {
      msg = '请输入目的地'
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
    var screen_data = {
      page_id: 1,//页码, 必填
      type: app.globalData.index,// 类型, 选填
      lable: '',// 标签, 选填
      call_type:2,//一元拼, 选填
      call_type: 3,// 零元砍, 选填
      end_space: end_space,// 目的地, 搜索目的地时填
      price_start: price_start,// 起始价, 搜索价格地时选填, 可填price_start, price_end或price_start或price_end或不填
      price_end: price_end,// 最高价, 搜索价格时选填, 可填price_start, price_end或price_start或price_end或不填
      price_up: '',// 价格升序, 价格排序时填, 升序price_up: 1, price_down: 0 选填
      price_down: '',// 价格降序, 价格排序时填, 降序price_up: 0, price_down: 1 选填
    }
    // console.log(screen_data)
    // return
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: screen_data,
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        if (data.data.data == '') {
          wx.showToast({
            title: '抱歉，暂无此类商品',
            icon: 'none',
            duration: 5000
          })
        } else {
          that.setData({
            inform: data.data.data,
          })
        }
        that.close_gg()
        wx.hideLoading()
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
    var that = this;
    common.loading()
    var dataId = that.data.curHdIndex,
    data = {};
    if (dataId == 0) {
      data = {
        page_id: ++that.data.pageNum,
        call_type: 3
      }
    } else {
      data = {
        page_id: ++that.data.pageNum,
        call_type: 2
      }
    }
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: data,
      method: 'POST',
      success: function (data) {
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 3000
          })
        } else {
          that.setData({
            inform: that.data.inform.concat(data.data.data)
          })
        }
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})