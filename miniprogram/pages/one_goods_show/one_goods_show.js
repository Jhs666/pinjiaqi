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
    showModalStatus2: false,
    window: "none",
    asd: 1,
    showModalStatus: false,
    animationData: '',
    currentTab: 0,
    box: [{
      id: '',
      discount_price: '',
      price: '',
      title: '',
      lable_list: '',
      detial: '',
      intro: '',
      team_list: [{}],
    },],
    item_list_string: '',
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
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.iid = options.id;
    var gid = options.kind;
    wx.request({
      url: app.data.requestUrl + '/item/item_info',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        item_list_string: options.id
      },
      method: "POST",
      success: function (data) {
        that.history(data.data.data[0]);
        if (data.data.code == 0) {
          getApp().globalData.preview_img = data.data.data[0].preview_img;
          getApp().globalData.title = data.data.data[0].title;
          getApp().globalData.intro = data.data.data[0].intro;
          // console.log(data.data.data[0].team_list[0].length);
          if (data.data.data[0].team_list[0].length > 1) {
            that.setData({
              asd: 2,
            })
          }
          that.setData({
            box: data.data.data,
            imgUrls: data.data.data[0].banner_list,
            detial: data.data.data[0].detial,
            team_list: data.data.data[0].team_list,
          })
          if (data.data.data[0].team_list[0].length == 0) {

          } else {
            that.data.id = data.data.data[0].team_list[0][0].id;
          }
          // console.log(that.data.box[0].team_list);
          WxParse.wxParse('article', 'html', that.data.detial, that, 5);
        } else if (data.data.code == -2) {
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
                  success: function (data) {
                    getApp().globalData.user = data.data.data;
                    that.setData({
                      user: data.data.data
                    })
                    wx.request({
                      url: app.data.requestUrl + '/item/item_info',
                      data: {
                        token: getApp().globalData.user.token, //登陆时返回的user表字段中
                        item_list_string: options.id
                      },
                      method: "POST",
                      success: function (data) {
                        if (data.data.code == 0) {
                          that.setData({
                            box: data.data.data,
                            imgUrls: data.data.data[0].banner_list,
                            detial: data.data.data[0].detial,
                            team_list: data.data.data[0].team_list,
                          })
                          WxParse.wxParse('article', 'html', that.data.detial, that, 5);
                        } else if (data.data.code == -1) {
                          wx.showToast({
                            title: "服务器异常"
                          })
                        }
                      },
                      error: function (data) {
                        console.log(data)
                      },
                    })
                  },
                  error: function (data) {
                    console.log(data)
                  }
                })
              } else {
                console.log('刷新用户状态失败！' + res.errMsg)
              }
            }
          })
        } else if (data.data.code == -1) {
          wx.showToast({
            title: "服务器异常"
          })
        }
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
    // console.log(app.globalData.browsingHistory)
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
  selected2: function (e) {
    // this.setData({
    //   selected: false,
    //   selected1: false,
    //   selected2: true,
    // })
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
  },
  // 请求小程序二维码
  share: function (options) {
    var that = this
    var path1 = getApp().globalData.preview_img
    var path2 = getApp().globalData.qrcode_src
    var title = getApp().globalData.title
    var intro = getApp().globalData.intro
    var user_id = getApp().globalData.user.id
    const ctx = wx.createCanvasContext('myCanvas')
    wx.showLoading({
      title: '海报生成中...',
    })
    wx.request({
      url: app.data.requestUrl + '/tool/wx_mini_qrcode',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: getApp().globalData.user.token,
        scene: user_id,
        page: 'pages/index/index',
        item_id: '',
      },
      success: function (res) {
        getApp().globalData.qrcode_src = res.data.data;
        that.setData({
          window: "block",
          showModalStatus: false,
        })
        wx.getImageInfo({
          src: path1,
          success: function (res) {
            let Path = res.path;
            wx.getImageInfo({
              src: getApp().globalData.qrcode_src,
              success: function (reult) {
                let Paths = reult.path;
                // console.log(Paths)
                common.creat_qrcode(Path, Paths, title, intro);
              }
            })
          },
          fail: function (res) {
            //失败回调
          }
        })
        // common.creat_qrcode(getApp().globalData.preview_img,getApp().globalData.qrcode_src);
        wx.hideLoading();
      }
    })
  },
  close_btn: function (e) {
    this.setData({
      window: "none",
    })
  },
  // 正常购买
  buy: function (e) {
    var that = this
    wx.login({
      success(res) {
        wx.request({
          url: app.data.requestUrl + '/login/miniprogramlogin ',
          data: {
            js_code: res.code,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (data) {
            getApp().globalData.user = data.data.data;
            var v_data = {
              openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
              token: getApp().globalData.user.token, //登陆时返回的user表字段中
              pay_user_id: getApp().globalData.user.id, //支付用户的id
              target_user_id: getApp().globalData.user.id, //购买用户的id
              item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
              buy_type: 1, //购买方式
              trip_id: getApp().globalData.user.id, //出行人id,属于支付者的
              coupon_cash_id: '', //使用的代金卷id
              coupon_discount_id: '', //使用的折扣卷id
              coupon_type: 1, //优惠卷使用状态
              item_num: 1, //应该从用户购买商品的表单中获取commodity_num
              integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
            };
            wx.request({
              url: app.data.requestUrl + '/orderform/create ',
              method: 'POST',
              data: v_data,
              success: function (res) {
                console.log(res)
                app.globalData.item_price = res.data.data.item_price;
                app.globalData.item_title = res.data.data.item_title;
                app.globalData.orderform_sn = res.data.data.orderform_sn;
                wx.navigateTo({
                  url: '../commit_order/commit_order?item_price=' + res.data.data.item_price +
                    '&item_title=' + res.data.data.item_title +
                    '&orderform_sn=' + res.data.data.orderform_sn,
                })
              }
            })
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    })
  },
  // 发起拼单建团
  launch: function () {
    var that = this;
    var launch_data = {
      openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      pay_user_id: getApp().globalData.user.id, //支付用户的id
      target_user_id: getApp().globalData.user.id, //购买用户的id
      item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
      buy_type: 4, //购买方式
      intro: '', //简介
      share_status: 1, //公开拼团状态
      trip_id: getApp().globalData.user.id, //出行人id,属于支付者的
      coupon_cash_id: '', //使用的代金卷id
      coupon_discount_id: '', //使用的折扣卷id
      coupon_type: 1, //优惠卷使用状态
      item_num: 1, //应该从用户购买商品的表单中获取commodity_num
      integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
    };
    // console.log(launch_data)
    // return false
    wx.request({
      url: app.data.requestUrl + '/orderform/create',
      data: launch_data,
      method: 'POST',
      success: function (data) {
        console.log(data)
        app.globalData.item_price = data.data.data.item_price;
        app.globalData.item_title = data.data.data.item_title;
        app.globalData.orderform_sn = data.data.data.orderform_sn;
        wx.navigateTo({
          url: '../commit_order/commit_order?item_price=' + data.data.data.item_price +
            '&item_title=' + data.data.data.item_title +
            '&orderform_sn=' + data.data.data.orderform_sn,
        })
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 拼团购买-拼团
  go_spell_order: function () {
    var that = this;
    var go_spell_order_data = {
      openid: getApp().globalData.user.openid, //登陆时返回的user表字段中
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      pay_user_id: getApp().globalData.user.id, //支付用户的id
      target_user_id: getApp().globalData.user.id, //购买用户的id
      item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
      buy_type: 5, //购买方式
      one_shop_id: that.data.id, //拼团id
      trip_id: getApp().globalData.user.id, //出行人id,属于支付者的
      coupon_cash_id: '', //使用的代金卷id
      coupon_discount_id: '', //使用的折扣卷id
      coupon_type: 1, //优惠卷使用状态
      item_num: 1, //应该从用户购买商品的表单中获取commodity_num
      integral_use_sum: 0, //用户购买商品所想使用的积分,当前填0就可以
    };
    console.log(go_spell_order_data)
    // return false
    wx.request({
      url: app.data.requestUrl + '/orderform/create',
      data: go_spell_order_data,
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (data.data.code != 0) {
          var mes = data.data.msg
          wx.showToast({
            title: mes,
            icon: 'none',
            duration: 2000
          })
        } else {
          app.globalData.item_price = data.data.data.item_price;
          app.globalData.item_title = data.data.data.item_title;
          app.globalData.orderform_sn = data.data.data.orderform_sn;
          wx.navigateTo({
            url: '../commit_order/commit_order?item_price=' + data.data.data.item_price +
              '&item_title=' + data.data.data.item_title +
              '&orderform_sn=' + data.data.data.orderform_sn,
          })
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 加入购物车
  add_cart: function () {
    // var that = this;
    // var add_cart_data = {
    //   token: getApp().globalData.user.token, //登陆时返回的user表字段中
    //   item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
    //   item_title: that.data.item_title, //商品标题
    //   item_price: that.data.item_price, //商品价格
    //   item_num: 1, //数量
    //   types: '', //已拼多少件
    //   type_list: that.data.type_list, //出游类型tag
    //   start_space: that.data.start_space //价格
    // }
    // var content = JSON.stringify(add_cart_data);
    // console.log(content)
    // wx.request({
    //   url: app.data.requestUrl + '/cart/cart_insert',
    //   data: {
    //     token: getApp().globalData.user.token, //登陆时返回的user表字段中
    //     'content': content
    //   },
    //   method: 'POST',
    //   success: function(data) {
    //     console.log(data)
    //     wx.showToast({
    //       title: '成功加入购物车',
    //       icon: 'none',
    //       duration: 5000
    //     })
    //   },
    //   error: function(data) {
    //     console.log(data)
    //     wx.showToast({
    //       title: '加入购物车失败',
    //       icon: 'none',
    //       duration: 5000
    //     })
    //   }
    // })
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
  },
  // 遮罩层
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0.1)
  },
  hideModal: function () {
    this.setData({
      showModalStatus: false,
    })
  },
  //下载海报
  savetup: function () {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 240,
      height: 360,
      destWidth: 240,
      destHeight: 360,
      canvasId: 'myCanvas',
      success: function (res) {
        //调取小程序当中获取图片
        console.log(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '保存成功',
              content: '图片成功保存到相册了，去发圈噻~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function (res) {
                // if (res1.confirm) {
                console.log('用户点击确定');
                // }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 海报end
  // 关闭/打开模态框
  look_more: function () {
    this.setData({
      showModal: true
    })
  },
  close_spell: function () {
    this.setData({
      showModal: false
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})