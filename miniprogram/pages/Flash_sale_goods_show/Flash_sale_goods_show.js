// pages/goods_show/goods_show.js
const app = getApp()
var template = require('../../app.js');
var WxParse = require('../../wxParse/wxParse.js');
var common = require('../../utils/public.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    window: "none",
    showModalStatus: false,
    animationData: '',
    currentTab: 0,
    box: [{}],
    detial: "",
    imgUrls: [
      '',
    ],
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
    selected: true,
    selected1: false,
    selected2: false,
    // 获取海报二维码
    imgPath: '',
    basicprofile: '',
    xcxcode: '',
    scene: '',
    page: '',
    // 关闭模态框
    showModal: false,
    user: [{}],
    sell_price:'',//抢购价格
    sell: '',//已售
    inventory: '',//库存
    surplus: '',//剩余
    formatTime: '', //倒计时
    isClick: false,//收藏星星
    collec_status: '收藏',//默认是收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.item_id = options.id//商品id
    app.globalData.item_seckill_id = options.item_seckill_id//活动id
    var user_id = getApp().globalData.user.id
    common.loading()
    if (getApp().globalData.user.id) {
      var user_id = getApp().globalData.user.id
    } else {
      var user_id = null
    }
    wx.request({
      url: app.data.requestUrl + '/Seckillitem/info',
      data: {
        item_id: app.globalData.item_id,
        item_seckill_id: app.globalData.item_seckill_id,
        user_id: user_id
      },
      method: "POST",
      success: function (data) {
        console.log(data)
        that.history(data.data.data);
        getApp().globalData.preview_img = data.data.data.preview_img;
        getApp().globalData.title = data.data.data.title;
        getApp().globalData.price = data.data.data.price;
        getApp().globalData.start_space = data.data.data.start_space;
        getApp().globalData.type_list = data.data.data.type_list;
        getApp().globalData.id = data.data.data.id;
        getApp().globalData.intro = data.data.data.intro;
        that.setData({
          box: data.data.data,
          imgUrls: data.data.data.banner_list,
          detial: data.data.data.detial.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
          user: getApp().globalData.user,
          add_shop_car: data.data.data,
          formatTime: that.formatTime(times), //倒计时
          isClick: data.data.data.collect_status,
        })
        if (data.data.data.collect_status == false) {
          that.setData({
            collec_status: '收藏'
          })
        } else if (data.data.data.collect_status == true) {
          that.setData({
            collec_status: '已收藏'
          })
        }
        app.globalData.collect_id = data.data.data.collect.id
        WxParse.wxParse('article', 'html', that.data.detial, that, 5);
        var times = 3600 - new Date().getMinutes() * 60 + new Date().getSeconds()
        var timer = setInterval(function () {
          if (times == 0) {
            clearInterval(timer);
            that.setData({
              formatTime: '活动已结束'
            })
          } else {
            times--;
            that.setData({
              formatTime: that.formatTime(times)
            })
          }
        }, 1000)
        // 请求详情成功后直接请求评论
        wx.request({
          url: app.data.requestUrl + '/Itemcomment/comment',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            token: getApp().globalData.user.token,
            item_id: that.data.aaa,
          },
          success: function (data) {
            console.log(data)
            if (data.data.data == false) {
              that.setData({
                comment: '', //评论上半部分
                comment_grade: '', //总的评论分 保留一位数
                comment_list: '', //评论列表
                one_1: '', //黄色星星数量
                two_1: '', //灰色星星数量
                comment_show: 'none',//没有评论就隐藏
              })
            } else {
              that.setData({
                comment: data.data.data, //评论上半部分
                comment_grade: data.data.data.good, //总的评论分 保留一位数
                comment_list: data.data.data.comment_list, //评论列表
                one_1: data.data.data.good, //黄色星星数量
                two_1: 5 - data.data.data.good, //灰色星星数量
                comment_show: 'block',//有评论就显示
              })
            }
            wx.hideLoading();
          },
          fail: function (res) {
            console.log(res)
          }
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      },
    })
  },
  /**
   * 浏览历史
   */
  history: function (data) {
    var myDate = new Date();
    var month = parseInt(myDate.getMonth()) + 1
    var time = myDate.getFullYear() + '年' + month + '月' + myDate.getDate() + '日';
    if (app.globalData.browsingHistory[time]) {
      var arr = app.globalData.browsingHistory[time];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == data.id) {
          arr.splice(i, 1)
        }
      }
      arr.unshift(data)
      app.globalData.browsingHistory[time] = arr;
    } else {
      var arr = [];
      arr.push(data)
      app.globalData.browsingHistory[time] = arr;
    }
    wx.setStorage({
      key: 'browsingHistory',
      data: JSON.stringify(app.globalData.browsingHistory)
    })
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      selected2: false,
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
    })
  },
  //请求评价
  selected2: function (e) {
    var that = this
    that.setData({
      selected: false,
      selected1: false,
      selected2: true,
    })
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/Itemcomment/comment',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: getApp().globalData.user.token,
        item_id: that.data.aaa,
      },
      success: function (data) {
        console.log(data)
        if (data.data.data == false) {
          that.setData({
            comment: '', //评论上半部分
            comment_grade: '', //总的评论分 保留一位数
            comment_list: '', //评论列表
            comment_show: 'none',//没有评论就隐藏
          })
        } else {
          that.setData({
            comment: data.data.data, //评论上半部分
            comment_grade: data.data.data.good.toFixed(1), //总的评论分 保留一位数
            comment_list: data.data.data.comment_list, //评论列表
            comment_show: 'block',//有评论就显示
          })
        }
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 根据标签切换列表
  comment_tab(e) {
    var that = this;
    common.loading()
    app.globalData.index = e.currentTarget.dataset.index
    that.setData({
      curHdIndex: app.globalData.index,
    })
    wx.request({
      url: app.data.requestUrl + '/Itemcomment/get_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: getApp().globalData.user.token,
        item_id: that.data.aaa,
        page_id: 1,
        search_type: app.globalData.index,
      },
      success: function (data) {
        console.log(data)
        that.setData({
          comment_list: data.data.data, //评论列表
        })
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 海报取消按钮
  close_btn: function (e) {
    this.setData({
      window: "none",
    })
  },
  // 立即抢购点击去选择日期和人数
  launch: function () {
    wx.setStorageSync('orderDetail', this.data.box)
    app.globalData.flag = 1
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    var times = 3600 - new Date().getMinutes() * 60 + new Date().getSeconds()
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else if (times == 0){
      wx.showModal({
        title: '温馨提示',
        content: '很抱歉，当前时间段活动已结束，看看别的吧',
      })
    }else{
      wx.navigateTo({
        url: '../Flash_choose_date/Flash_choose_date'
      })
    }
  },
  // 返回首页
  back_index: function () {
    console.log(11)
    wx.switchTab({
      url: '../index/index',
    })
  },
  //点击星星进行收藏
  collection: function () {
    var that = this
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      if (!that.data.isClick == true) {
        if (app.globalData.item_seckill_id){
          var item_seckill_id = app.globalData.item_seckill_id
        }else{
          var item_seckill_id = null
        }
        wx.request({
          url: app.data.requestUrl + '/collect/add',
          data: {
            token: getApp().globalData.user.token, //登陆时返回的user表字段中
            type: 1,
            item_type: 3,
            collect: app.globalData.item_id,
            item_seckill_id: item_seckill_id
          },
          method: 'POST',
          success: function (data) {
            console.log(data)
            var msg = data.data.msg
            wx.showToast({
              title: msg,
            });
            that.setData({
              isClick: !that.data.isClick,
              collec_status: data.data.msg
            })
            app.globalData.collect_id = data.data.data.id
          },
          error: function (data) {
            console.log(data)
          }
        })
      } else {
        wx.request({
          url: app.data.requestUrl + '/collect/ban',
          data: {
            token: getApp().globalData.user.token,
            id: app.globalData.collect_id
          },
          method: 'POST',
          success: function (data) {
            console.log(data)
            var msg = data.data.msg
            wx.showToast({
              title: msg,
            });
            that.setData({
              isClick: !that.data.isClick,
              collec_status: '收藏'
            })
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    }
  },
  // 倒计时函数
  formatTime: function (time) {
    function add(val) {
      if (parseFloat(val) < 10) {
        return '0' + val;
      } else {
        return val;
      }
    }
    var day = add(parseInt(time / 86400));
    var hour = add(parseInt((time - day * 86400) / 3600));
    var minute = add(parseInt((time - day * 86400 - hour * 3600) / 60));
    var second = add(parseInt(time - day * 86400 - hour * 3600 - minute * 60));
    return hour + ':' + minute + ':' + second
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var index = that.data.index
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/Itemcomment/get_list',
      data: {
        token: getApp().globalData.user.token,
        item_id: that.data.aaa,
        page_id: ++that.data.pageNum,
        search_type: index,
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 3000
          })
        } else {
          that.setData({
            comment_list: that.data.comment_list.concat(data.data.data), //评论列表
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
  onShareAppMessage: function () {

  }
})