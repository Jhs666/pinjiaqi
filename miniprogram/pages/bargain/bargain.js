// pages/bargain/bargain.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: [{}], //商品详情
    formatTime: '', //倒计时
    help_kan: '', //分享给别人砍价的按钮
    user: '', //发起的用户
    help_bang: 'none', //被人点击砍价的按钮
    team: [], //砍价列表
    setup: '',
    hhh: '',
    progress: 0, //进度条初始值
    product_list: '', //商品列表
    difference_price: '',
    price: '',
    popup: true,//砍价弹窗默认隐藏
    bargain_money: '',//砍价弹窗显示的价格
    height: '',//设备高度
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.data.suixiuha1 = options.suixiuha
    if (options.share_btn == 1) { //分享进来
      that.setData({
        help_bang: 'block',
        help_kan: 'none'
      })
      wx.request({
        url: app.data.requestUrl + '/zero/info',
        data: {
          id: options.id
        },
        method: 'POST',
        success: function(data) {
          var times = data.data.data.lack_time;
          that.data.ddd = data.data.data.id
          app.globalData.difference_price = data.data.data.difference_price //已砍
          app.globalData.price = data.data.data.price //总价
          app.globalData.progressLength = 100 - parseFloat(app.globalData.difference_price) / parseFloat(app.globalData.price) * 100
          app.globalData.all_data = data.data.data
          app.globalData.all_team = data.data.data.zero_piece_list_array
          that.setData({
            user: data.data.data.user_id_info,
            inform: app.globalData.all_data,
            formatTime: that.formatTime(times), //倒计时
            team: app.globalData.all_team, //砍价队列
            progress: app.globalData.progressLength //进度条进度
          })
          app.globalData.parent_id = data.data.data.user_id_info.id //发起砍价者的id
          var timer = setInterval(function() {
            if (times == 0) {
              clearInterval(timer);
              that.setData({
                formatTime: '砍价已结束'
              })
            } else {
              times--;
              that.setData({
                formatTime: that.formatTime(times)
              })
            }
          }, 1000)
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
      wx.request({
        url: app.data.requestUrl + '/item2/get_list',
        data: {
          token: app.globalData.new_token, //登陆时返回的user表字段中
          page_id: 1,
          call_type:3
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
          that.setData({
            product_list: data.data.data,
          })
        },
        error: function(data) {
          console.log(data)
        }
      })
    } else { //正常进来
      that.setData({
        help_bang: 'none',
        help_kan: 'block'
      })
      common.loading()
      wx.request({
        url: app.data.requestUrl + '/zero/info',
        data: {
          id: options.suixiuha
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
          if (data.data.code == 1 || data.data.code == -2 || data.data.code == -1) {
            var msg = data.data.msg
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 2000);
          }
          that.data.ddd = data.data.data.id
          var times = data.data.data.lack_time;
          var progressLength = 100 - parseFloat(data.data.data.difference_price) / parseFloat(data.data.data.price) * 100
          that.setData({
            inform: data.data.data, //商品详情
            formatTime: that.formatTime(times), //倒计时
            team: data.data.data.zero_piece_list_array, //砍价队列
            user: data.data.data.user_id_info, //发起者姓名和头像
            setup: 'none', //设置按钮隐藏
            progress: progressLength //进度条进度
          })
          var timer = setInterval(function() {
            if (times == 0) {
              clearInterval(timer);
              that.setData({
                formatTime: '砍价已结束'
              })
            } else {
              times--;
              that.setData({
                formatTime: that.formatTime(times)
              })
            }
          }, 1000)
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
    }
    that.setData({
      height: wx.getSystemInfoSync().windowHeight,
    })
  },
  // 授权按钮
  bindgetuserinfo: function(e) {
    var that = this
    var wx_mini_user_info_json = e.detail.userInfo
    wx_mini_user_info_json['openid'] = getApp().globalData.user.openid;
    var wx_mini_user_info = JSON.stringify(wx_mini_user_info_json);
    wx.login({ //首先登陆
      success(res) {
        if (res.code) {
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
              app.globalData.new_token = data.data.data.token
              app.globalData.parent_ID = data.data.data.parent_id
              wx.request({ //请求砍价者头像和昵称
                url: app.data.requestUrl + '/user/wx_fill_user_detail',
                data: {
                  token: app.globalData.new_token,
                  wx_mini_user_info: wx_mini_user_info,
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(data) {
                  wx.request({ //请求砍价
                    url: app.data.requestUrl + '/orderform/zero_piece',
                    data: {
                      token: app.globalData.new_token,
                      zero_id: that.data.ddd
                    },
                    method: 'POST',
                    success: function(data) {
                      if (data.data.code == 1 || data.data.code == -1 || data.data.code == -2) {
                        var msg = data.data.msg
                        wx.showToast({
                          title: msg,
                          icon: 'none',
                          duration: 3000
                        })
                      } else {
                        var bargain = data.data.data.zero_piece_list_array.pop().num_name
                        that.setData({
                          bargain_money: bargain
                        })
                        that.showPopup()
                        var msg = data.data.msg
                        wx.showToast({
                          title: msg,
                          icon: 'none',
                          duration: 3000
                        })
                        app.globalData.difference_price = data.data.data.difference_price //已砍
                        app.globalData.price = data.data.data.price //总价
                        app.globalData.progressLength = 100 - parseFloat(app.globalData.difference_price) / parseFloat(app.globalData.price) * 100
                        app.globalData.all_data = data.data.data
                        app.globalData.all_team = data.data.data.zero_piece_list_array
                        that.setData({
                          inform: app.globalData.all_data,
                          team: app.globalData.all_team,
                          progress: app.globalData.progressLength, //进度条进度
                        })
                      }
                      //判断是否有推荐人，显示按钮与否
                      if (app.globalData.parent_ID == '') {
                        that.setData({
                          setup: 'block'
                        })
                      } else {
                        that.setData({
                          setup: 'none'
                        })
                      }
                      //登录成功判断是否有上级
                      if (app.globalData.parent_ID) {

                      } else if (app.globalData.parent_ID == '') {
                        var data_data = {
                          token: app.globalData.new_token,
                          parent_id: app.globalData.parent_id
                        }
                        wx.request({
                          url: app.data.requestUrl + '/user/set_parent_id',
                          data: data_data,
                          method: 'POST',
                          success: function (data) {
                            var msg = data.data.msg
                            wx.showModal({
                              title: '温馨提示',
                              content: msg,
                            })
                            if (false === common.check_res_code(data.data, false)) {
                              return false;
                            }
                          },
                          error: function (data) {
                            console.log(data)
                          }
                        })
                      }
                    },
                    error: function(data) {
                      console.log(data)
                    }
                  })
                },
                error: function(data) {
                  console.log(data)
                }
              })
            },
            error: function(data) {
              console.log(data)
            }
          })
        } else {
          console.log('刷新用户状态失败！' + res.errMsg)
        }
      }
    })
  },

  // 分享进来的用户点击设置按钮进行设置推荐人
  set_btn: function() {
    wx.showModal({
      title: '提示',
      content: '是否设置对方为您的上级推荐人？',
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else if (res.confirm) {
          var data_data = {
            token: app.globalData.new_token, //登陆时返回的user表字段中
            parent_id: app.globalData.parent_id
          }
          wx.request({
            url: app.data.requestUrl + '/user/set_parent_id',
            data: data_data,
            method: 'POST',
            success: function(data) {
              if (false === common.check_res_code(data.data, false)) {
                return false;
              }
            },
            error: function(data) {
              console.log(data)
            }
          })
        }
      }
    })
  },
  // 点击进入详情页
  product_show: function(options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../zero_goods_show/zero_goods_show?id=' + dataset.id.id +
        '&title=' + dataset.id.title +
        '&zero=' + dataset.id.zero,
    })
  },

  // 倒计时函数
  formatTime: function(time) {
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
    return day + '天：' + hour + '时：' + minute + '分：' + second + ' 秒后结束'
  },

  //点击立即查看
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  // 显示弹窗
  showPopup() {
    this.hidePopup(false);
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
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function () {
      if (next) {
        this.animation.scale(0.95).step()
        next = !next;
      } else {
        this.animation.scale(1).step()
        next = !next;
      }
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 600)
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
    var that = this;
    return {
      title: '帮好友砍一刀',
      path: 'pages/bargain/bargain?share_btn=1&id=' + that.data.suixiuha1,
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})