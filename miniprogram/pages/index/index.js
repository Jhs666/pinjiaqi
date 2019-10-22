//index.js
var common = require('../../utils/public.js')
const app = getApp()
Page({
  data: {
    //1. 轮播图片数据
    imgUrls: [{}],
    //2. 轮播配置
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 600,
    indicatorColor: 'rgba(255,255,255,0.4)',
    indicatorActiveColor: '#fff',
    imgheights: 0, //轮播高度
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    pageNum: 2,
    //广告位图
    advert: [{
      src: '',
      link: ''
    }],
    index_list_hot: [{}], //大家都在玩
    hot_list:[{}],//首页列表
    bgColor: 'rgba(0,0,0,0)',
    color: 'rgba(0,0,0,0)',
    statusBarHeight: '',
    position: '3%',
    //分类
    sort:'',
    //城市
    city:'定位中...',
    isPopping: false,//是否已经弹出
    animationPlus: {},//旋转动画
    animationcollect: {},//item位移,透明度
    animationTranspond: {},//item位移,透明度
    animationInput: {},//item位移,透明度
    user: [{}],//用户信息
  },
  onLoad: function(options) {
    var that = this
    app.onLoad()
    // 调用下拉刷新
    that.onPullDownRefresh();
    //自动获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        var speed = res.speed //速度
        var accuracy = res.accuracy //位置的精确度
        wx.showLoading({
          title: '定位中...',
        })
        wx.request({
          url: app.data.requestUrl + '/tool/location',
          data: {
            latitude: longitude,
            longitude: latitude
          },
          method: "post",
          success: function (data) {
            // console.log(data)
            that.setData({
              city:data.data.msg
            })
            wx.setStorageSync('city_show', that.data.city)
            wx.hideLoading()
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    })
    //获取设备状态栏高度
    wx.getSystemInfo({
      success(res) {
        that.setData({
          statusBarHeight: res.statusBarHeight
        })
      }
    })
    //首页所有商品列表
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: 1,
        call_type:1
      },
      method: 'POST',
      success: function (data) {
        // console.log(data)
        that.setData({
          hot_list: data.data.data,
        })
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 上拉加载
  onReachBottom: function() {
    var that = this;
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: that.data.pageNum++,
        call_type: 1
      },
      method: "post",
      success: function(data) {
        // console.log(data)
        that.setData({
          hot_list: that.data.hot_list.concat(data.data.data)
        })
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 3000
          })
        }
        // 隐藏加载框
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  initialize: function(e) {
    wx.showNavigationBarLoading();
    var that = this
    common.loading()
    // 轮播图
    wx.request({
      url: app.data.requestUrl + '/minibanner/get_list',
      data: '',
      method: 'POST',
      success: function (data) {
        that.setData({
          imgUrls: data.data.data
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      error: function (data) {
        console.log(data)
      }
    })
    //首页分类
    wx.request({
      url: app.data.requestUrl + '/tool/classify',
      data: '',
      method: 'POST',
      success: function (data) {
        that.setData({
          sort:data.data.data
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      error: function (data) {
        console.log(data)
      }
    })
    // 广告位图
    wx.request({
      url: app.data.requestUrl + '/miniad/get_list',
      data: '',
      method: 'POST',
      success: function (data) {
        that.setData({
          advert: data.data.data
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      error: function (data) {
        console.log(data)
      }
    })
    //大家都在玩调0元的列表
    wx.request({
      url: app.data.requestUrl + '/item2/get_list',
      data: {
        page_id: 1,
        call_type: 3
      },
      method: 'POST',
      success: function(data) {
        that.setData({
          index_list_hot: data.data.data
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 点击轮播图下分类的跳转
  tab_list: function (e) {
    var sort_id = e.currentTarget.dataset.id; //id
    if (sort_id == 1){//跳至零元列表
      wx.switchTab({
        url: '../tuijian_two/tuijian_two',
      })
    } else if (sort_id == 2) {//跳至商品列表
      wx.navigateTo({
        url: '../recommend/recommend',
      })
    } else if (sort_id == 3) {//跳至限时抢购列表
      wx.navigateTo({
        url: '../Flash_sale/Flash_sale',
      })
    } else if (sort_id == 4) {//跳至活动专区列表
      wx.navigateTo({
        url: '../activity_list/activity_list',
      })
    }
  },
  //零元砍价
  zero: function () {
    wx.switchTab({
      url: '../tuijian_two/tuijian_two',
    })
  },
  //低价拼团
  piece: function () {
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
  //限时抢购
  time: function () {
    wx.navigateTo({
      url: '../Flash_sale/Flash_sale',
    })
  },
  //活动专区
  link: function () {
    wx.navigateTo({
      url: '../activity_list/activity_list',
    })
  },
  // 点击首页地名跳转至更多城市页面
  more_city: function () {
    wx.navigateTo({
      url: '../more_city/more_city',
    })
  },
  // 大家都在玩进入详情页
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../zero_goods_show/zero_goods_show?id=' +
        dataset.id + '&title=' + dataset.title,
    })
  },
  // 列表进入详情页
  show_details: function (options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_show/goods_show?id=' + dataset.id.id +
        '&title=' + dataset.id.title +
        '&type_list=' + dataset.id.type_list +
        '&start_space=' + dataset.id.start_space +
        '&preview_img=' + dataset.id.preview_img,
    })
  },
  //更多
  index_hot_more(){
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },  
  // 点击搜索进入搜索页面
  search_input: function(e) {
    wx.navigateTo({
      url: '../city/city'
    })
  },
  // 轮播图片高度自适应
  imgHeight: function(e) {
    var imgheight = e.detail.height;
    this.setData({
      imgheights: imgheight
    })
  },
  // 获取滚动条位置
  onPageScroll: function(e) {
    var that = this;
    common.onPageScroll(e, that)
    if (e.scrollTop > 0) {
      that.setData({
        bgColor: '#06b3ed',
        color: '#fff'
      })
    } else {
      that.setData({
        bgColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)'
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowHeight)
      }
    })
    if (e.scrollTop > 0) {
      that.setData({
        position: '-8%'
      });
    } else {
      that.setData({
        position: '3%'
      });
    }
  },
  //回到顶部
  goTop: function(e) {
    common.goTop()
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    this.initialize();
  },
  // 更多
  index_more: function() {
    wx.switchTab({
      url: '../tuijian_two/tuijian_two',
    })
  },
  // 消息中心
  message: function() {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  //点击弹出
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      popp.call(this);
      this.setData({
        isPopping: false
      })
    } else {
      //弹出动画
      takeback.call(this);
      this.setData({
        isPopping: true
      })
    }
  },
  //点击推广
  input: function () {
    wx.navigateTo({
      url: '../my_fenxiao/my_fenxiao',
    })
  },
  //点击定制
  transpond: function () {
    wx.navigateTo({
      url: '../dingzhiyou/dingzhiyou',
    })
  },
  onShareAppMessage: function() {

  }
})

//弹出动画
function popp() {
  //plus顺时针旋转
  var animationPlus = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationcollect = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationTranspond = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationInput = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  animationPlus.rotateZ(225).step();
  animationcollect.translate(-60, -80).rotateZ(360).opacity(1).step();
  animationTranspond.translate(-120, 0).rotateZ(360).opacity(1).step();
  animationInput.translate(-60, 80).rotateZ(360).opacity(1).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    animationTranspond: animationTranspond.export(),
    animationInput: animationInput.export(),
  })
}
//收回动画
function takeback() {
  //plus逆时针旋转
  var animationPlus = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationcollect = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationTranspond = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationInput = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  animationPlus.rotateZ(0).step();
  animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
  animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
  animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    animationTranspond: animationTranspond.export(),
    animationInput: animationInput.export(),
  })
}