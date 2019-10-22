// pages/recommend/recommend.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [{
      name: '',
    }],
    inform: [{}],
    pageNum: 2,
    id:3,
    curHdIndex: 0,
    index: 0,
    price_start:'',//最低价
    price_end:'',//最高价
    end_space: '',//目的地
    hidename: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: 1,
        type: that.data.id,
        call_type:1
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        if (app.globalData.biaoshi == 1) {
          that.setData({
            inform: app.globalData.shoulie,
            curHdIndex: -1
          })
          app.globalData.biaoshi = 2;
        } else {
          that.setData({
            inform: data.data.data,
            show_name: '拼团游'
          })
        }
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
    wx.request({
      url: app.data.requestUrl + '/item/item_type',
      data: {
        // token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        that.setData({
          type: data.data.data
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_show/goods_show?id=' + dataset.id.id + 
      '&title=' + dataset.id.title + 
      '&type_list=' + dataset.id.type_list +
      '&start_space=' + dataset.id.start_space +
      '&preview_img=' + dataset.id.preview_img,
    })
  },
  choose_tab: function(options) {
    var that = this;
    common.loading()
    that.setData({
      id: options.currentTarget.dataset.id,
      curHdIndex: options.currentTarget.dataset.index,
      index: options.currentTarget.dataset.index,
    })
    var id = options.currentTarget.dataset.id
    var name = options.currentTarget.dataset.name
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: 1,
        type: id,
        call_type: 1
      },
      method: 'POST',
      success: function(data) {
        if(data.data.data == ''){
          that.setData({
            inform: '',
            show_name: '',
            hidename: true,
          })
        } else {
          that.setData({
            inform: data.data.data,
            show_name: name,
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
  active: function(e) {
    let that = this;
    var dataId = e.currentTarget.dataset.index;
    that.setData({
      curHdIndex: dataId
    })
  },
  //搜索
  get_title: function(options) {
    var val = options.detail.value;
    this.setData({
      search_title: val
    });
  },
  search_btn: function(options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: 1,
        title: that.data.search_title,
        call_type: 1
      },
      method: 'POST',
      success: function(data) {
        if (data.data.data == '') {
          wx.showToast({
            title: '没有找到你想要的内容~',
            icon: 'none',
            duration: 3000
          })
        } else {
          that.setData({
            inform: data.data.data,
            curHdIndex: -1
          })
        }
        wx.hideLoading()
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
  lowInput: function(e) {
    var that = this
    that.setData({
      price_start: e.detail.value
    })
    // console.log(that.data.price_start);
  },
  highInput: function(e) {
    var that = this
    that.setData({
      price_end: e.detail.value
    })
    // console.log(that.data.price_end);
  },
  placeInput: function(e) {
    var that = this
    that.setData({
      end_space: e.detail.value
    })
    // console.log(that.data.end_space);
  },
  formSubmit: function (options){
    var that = this
    common.loading()
    var price_start = that.data.price_start
    var price_end = that.data.price_end
    var end_space = that.data.end_space
    that.setData({
      id: that.data.id,
      curHdIndex: that.data.curHdIndex,
      index: that.data.index,
    })
    app.globalData.choose_id = that.data.id
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
      page_id:1,//页码, 必填
      type: app.globalData.choose_id,// 类型, 选填
      lable:'',// 标签, 选填
      one:'',//一元拼, 选填
      zero: '',// 零元砍, 选填
      end_space: end_space,// 目的地, 搜索目的地时填
      price_start: price_start,// 起始价, 搜索价格地时选填, 可填price_start, price_end或price_start或price_end或不填
      price_end: price_end,// 最高价, 搜索价格时选填, 可填price_start, price_end或price_start或price_end或不填
      price_up: '',// 价格升序, 价格排序时填, 升序price_up: 1, price_down: 0 选填
      price_down: '',// 价格降序, 价格排序时填, 降序price_up: 0, price_down: 1 选填
      call_type: 1
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
        if (data.data.data == ''){
          wx.showToast({
            title: '抱歉，暂无此类商品',
            icon:'none',
            duration:5000
          })
        }else{
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
  // 降序排列
  price_down: function () {
    var that = this
    common.loading()
    var price_start = that.data.price_start
    var price_end = that.data.price_end
    var end_space = that.data.end_space
    that.setData({
      id: that.data.id,
      curHdIndex: that.data.curHdIndex,
      index: that.data.index,
    })
    app.globalData.choose_id = that.data.id
    app.globalData.curHdIndex = that.data.curHdIndex
    app.globalData.index = that.data.index
    var screen_data = {
      page_id: 1,//页码, 必填
      type: app.globalData.choose_id,// 类型, 选填
      lable: '',// 标签, 选填
      one: '',//一元拼, 选填
      zero: '',// 零元砍, 选填
      end_space: end_space,// 目的地, 搜索目的地时填
      price_start: price_start,// 起始价, 搜索价格地时选填, 可填price_start, price_end或price_start或price_end或不填
      price_end: price_end,// 最高价, 搜索价格时选填, 可填price_start, price_end或price_start或price_end或不填
      price_up: 0,// 价格升序, 价格排序时填, 升序price_up: 1, price_down: 0 选填
      price_down: 1,// 价格降序, 价格排序时填, 降序price_up: 0, price_down: 1 选填
      call_type: 1
    }
    console.log(screen_data)
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
        that.setData({
          inform: data.data.data,
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 升序排列
  price_up: function () {
    var that = this
    common.loading()
    var price_start = that.data.price_start
    var price_end = that.data.price_end
    var end_space = that.data.end_space
    that.setData({
      id: that.data.id,
      curHdIndex: that.data.curHdIndex,
      index: that.data.index,
    })
    app.globalData.choose_id = that.data.id
    app.globalData.curHdIndex = that.data.curHdIndex
    app.globalData.index = that.data.index
    var screen_data = {
      page_id: 1,//页码, 必填
      type: app.globalData.choose_id,// 类型, 选填
      lable: '',// 标签, 选填
      one: '',//一元拼, 选填
      zero: '',// 零元砍, 选填
      end_space: end_space,// 目的地, 搜索目的地时填
      price_start: price_start,// 起始价, 搜索价格地时选填, 可填price_start, price_end或price_start或price_end或不填
      price_end: price_end,// 最高价, 搜索价格时选填, 可填price_start, price_end或price_start或price_end或不填
      price_up: 1,// 价格升序, 价格排序时填, 升序price_up: 1, price_down: 0 选填
      price_down: 0,// 价格降序, 价格排序时填, 降序price_up: 0, price_down: 1 选填,
      call_type: 1
    }
    console.log(screen_data)
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
        that.setData({
          inform: data.data.data,
        })
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
    var that = this
    that.setData({
      curHdIndex: that.data.index,
      index: that.data.index
    })
    var paga_data = {
      page_id: that.data.pageNum++,
      type: that.data.id,
      call_type: 1
    }
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: paga_data,
      method: 'POST',
      success: function(data) {
        console.log(data)
        if (app.globalData.biaoshi == 1) {
          that.setData({
            inform: app.globalData.shoulie,
            curHdIndex: -1
          })
          app.globalData.biaoshi = 2;
        } else if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 5000
          })
        } else {
          that.setData({
            inform: that.data.inform.concat(data.data.data)
          })
        }
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //回到顶部
  goTop: function (e) {
    common.goTop()
  },
  // 获取滚动条位置
  onPageScroll: function (e) {
    var that = this;
    common.onPageScroll(e, that)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})