//index.js
var common = require('../../utils/public.js')
const app = getApp()
Page({
  data: {
    //1. 轮播图片数据
    imgUrls: [{
      src: '',
    }],
    //2. 轮播配置
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 600,
    indicatorColor: 'rgba(255,255,255,0.4)',
    indicatorActiveColor: '#fff',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    type: [{
      id: '',
      img_show: '',
      name: ''
    }, ],
    pageNum: 2,
    //广告位图
    advert: [{
      src: '',
      link: ''
    }],
    index_list_hot: [{
      page_id: 1,
      id: 100,
      price: '',
      preview_img: '',
      title: '',
      name: '天安门'
    }],
    test: app.globalData.requestUrl,
  },
  onLoad: function(options) {
    // this.ccc = 1;
    if (options.scene) {
      var scene = decodeURIComponent(options.scene)
      wx.request({
        url: app.data.requestUrl + '/user/set_parent',
        data: {
          token: getApp().globalData.user.token, //登陆时返回的user表字段中parent_id:
          parent_id: scene
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
        },
        error: function(data) {
          console.log(data)
        }
      })
    } else {
      var scene = ''
    }
    // var text = '+' + scene + '+'
    // wx.showToast({
    //   title: text,
    //   icon: 'success',
    //   duration: 5000
    // })
    // 调用下拉刷新
    this.initialize(scene);
  },
  tab_list: function(e) {
    // console.log(e.currentTarget.dataset.id)
    var a = e.currentTarget.dataset.id;
    var b = e.currentTarget.dataset.index;
    if (a == 49) {
      // wx.navigateTo({
      //   url: '../dingzhiyou/dingzhiyou',
      // })
      wx.showToast({
        title: '努力开发中，敬请期待~',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../recommend/recommend?id=' + a + '&index=' + b,
      })
    }
  },
  // 提示
  tishi:function(){
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
  },
  // 上拉加载
  onReachBottom: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      duration: 2000
    }, 2000)
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: that.data.pageNum++,
        type: 100
      },
      method: "post",
      success: function(data) {
        that.setData({
          index_list_hot: that.data.index_list_hot.concat(data.data.data)
        })
        // console.log(data.data.data)
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
        // 隐藏加载框
        setTimeout(function() {
          wx.hideLoading()
        }, 2000)
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 下拉刷新函数
  initialize: function(e) {
    // console.log(e)
    app.onLoad();
    var that = this
    wx.request({
      url: app.data.requestUrl + '/item/item_type',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        if (data.data.msg == "登陆过期") {
          wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                wx.request({
                  url: app.data.requestUrl + '/login/miniprogramlogin',
                  data: {
                    js_code: res.code,
                    parend_id: e,
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(data) {
                    // 重新定义全局token
                    app.globalData.user = data.data.data;
                    var user_token = data.data.data.token;
                    wx.request({
                      url: app.data.requestUrl + '/item/item_type',
                      data: {
                        token: user_token, //登陆时返回的user表字段中
                      },
                      method: 'POST',
                      success: function(data) {
                        // console.log(data);
                        that.setData({
                          type: data.data.data
                        })
                      }
                    })
                  },
                  error: function(data) {
                    console.log(data)
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        }
      },
      error: function(data) {
        console.log(data)
      }
    })
    wx.request({
      url: app.data.requestUrl + '/item/item_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        type: 100,
        // lable: ''
      },
      method: 'POST',
      success: function(data) {
        if (data.data.msg == "登陆过期") {
          wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                wx.request({
                  url: app.data.requestUrl + '/login/miniprogramlogin',
                  data: {
                    js_code: res.code,
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(data) {
                    // 重新定义全局token
                    app.globalData.user = data.data.data;
                    var user_token = data.data.data.token;
                    wx.request({
                      url: app.data.requestUrl + '/item/item_list',
                      data: {
                        token: getApp().globalData.user.token, //登陆时返回的user表字段中
                        page_id: 1,
                        type: 100
                      },
                      method: 'POST',
                      success: function(data) {
                        // console.log(data)
                        that.setData({
                          index_list_hot: data.data.data
                        })
                      }
                    })
                  },
                  error: function(data) {
                    console.log(data)
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        } else {
          that.setData({
            left_list: data.data.data
          })
        }
      },
      error: function(data) {
        console.log(data)
      }
    })
    // 轮播图
    wx.request({
      url: app.data.requestUrl + '/minibanner/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        if (data.data.msg == "登陆过期") {
          wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                wx.request({
                  url: app.data.requestUrl + '/login/miniprogramlogin',
                  data: {
                    js_code: res.code,
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(data) {
                    // console.log(data)
                    // 重新定义全局token
                    app.globalData.user = data.data.data;
                    var user_token = data.data.data.token;
                    wx.request({
                      url: app.data.requestUrl + '/minibanner/get_list',
                      data: {
                        token: getApp().globalData.user.token, //登陆时返回的user表字段中
                      },
                      method: 'POST',
                      success: function(data) {
                        // console.log(data)
                        that.setData({
                          imgUrls: data.data.data
                        })
                      }
                    })
                  },
                  error: function(data) {
                    console.log(data)
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        } else {
          that.setData({
            imgUrls: data.data.data
          })
        }
      },
      error: function(data) {
        console.log(data)
      }
    })
    // 广告位图
    wx.request({
      url: app.data.requestUrl + '/miniad/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        if (data.data.msg == "登陆过期") {
          wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                wx.request({
                  url: app.data.requestUrl + '/login/miniprogramlogin',
                  data: {
                    js_code: res.code,
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(data) {
                    // console.log(data)
                    // 重新定义全局token
                    app.globalData.user = data.data.data;
                    var user_token = data.data.data.token;
                    wx.request({
                      url: app.data.requestUrl + '/miniad/get_list',
                      data: {
                        token: getApp().globalData.user.token, //登陆时返回的user表字段中
                      },
                      method: 'POST',
                      success: function(data) {
                        // console.log(data)
                        that.setData({
                          advert: data.data.data
                        })
                      }
                    })
                  },
                  error: function(data) {
                    console.log(data)
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        } else {
          that.setData({
            advert: data.data.data
          })
        }
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_show/goods_show?id=' +
        dataset.id + '&title=' + dataset.title,
    })
  },
  // 点击搜索进入搜索页面
  search_input: function (e) {
    wx.navigateTo({
      url: '../city/city'
    })
    // wx.showToast({
    //   title: '努力开发中，敬请期待~',
    //   icon: 'none',
    //   duration: 2000
    // })
  },
  // 获取滚动条位置
  onPageScroll: function(e) {
    var that = this;
    common.onPageScroll(e, that)
  },
  //回到顶部
  goTop: function(e) {
    common.goTop()
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    this.initialize();
  },
  onShareAppMessage: function() {

  }
})