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
    }],
    item_list_string: '',
    detial: "",
    imgUrls: [],
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
    // 倒计时
    formatTime: '',
    aaa: '',
    isClick: false, //收藏星星
    collec_status: '收藏', //默认是收藏
    share_btn: 1, //自定义页面进入方式的标志
    pageNum: 1, //评价列表默认显示第一页
    comment_grade: '', //好评数
    one_1: '', //黄色星星显示数量
    two_1: '', //灰色星星显示数量
    curHdIndex: 0, //默认选中全部评论按钮
    index: 0, //默认选中第一个评论按钮（全部）
    comment_show:'block',//默认显示评论
    team_list_show:'block',//拼团队列默认显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.data.iid = options.id;
    var gid = options.kind;
    var user_id = getApp().globalData.user.id
    app.globalData.parent_id = options.user_id
    app.globalData.share_btn = options.share_btn
    // 清空优惠券
    app.globalData.feibiao == 2;
    common.loading()
    if (options.scene) {
      var msg = options.scene
      var arr = msg.split('%2C')
      var item_id = parseInt(arr[1])
      var share_btn = parseInt(arr[2])
      that.setData({
        aaa: item_id,
        share_btn: share_btn
      })
      app.globalData.share_btn = 1
      wx.request({
        url: app.data.requestUrl + '/Tool/item_info',
        data: {
          item_list_string: that.data.aaa
        },
        success: function(data) {
          console.log(data)
          if (false === common.check_res_code(data.data, false)) {
            return false;
          }
        },
        error: function(data) {
          console.log(data)
        },
      })
    } else {
      that.data.aaa = options.id;
    }
    if (getApp().globalData.user.id) {
      var user_id = getApp().globalData.user.id
    } else {
      var user_id = null
    }
    //判断进入方式
    if (app.globalData.share_btn == 1) {
      wx.login({
        success(res) {
          app.globalData.code = res.code;
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
                console.log(data)
                app.globalData.parent_id = data.data.data.parent_id
                app.globalData.token = data.data.data.token
                app.globalData.login_status = data.data.data.wx_mini_reg_status
                //登录成功后请求详情
                wx.request({
                  url: app.data.requestUrl + '/item2/info',
                  data: {
                    item_list_string: that.data.aaa,
                    user_id: user_id,
                    call_type: 1
                  },
                  method: "POST",
                  success: function(data) {
                    console.log(data)
                    that.history(data.data.data[0]);
                    var team_list = data.data.data[0].team_list[0];
                    var team_list1 = data.data.data[0].team_list[0];
                    if (team_list != '') {
                      // setInterval(function () {
                      for (var i in team_list1) {
                        if (team_list1[i].lack_time != 0) {
                          team_list1[i].lack_time = team_list1[i].lack_time--;
                        }
                        team_list[i].lack_time = that.formatTime(team_list1[i].lack_time)
                        that.setData({
                          team_list: team_list,
                        })
                      };
                      // }, 1000)
                    }
                    getApp().globalData.preview_img = data.data.data[0].preview_img;
                    getApp().globalData.title = data.data.data[0].title;
                    getApp().globalData.price = data.data.data[0].price;
                    getApp().globalData.start_space = data.data.data[0].start_space;
                    getApp().globalData.type_list = data.data.data[0].type_list;
                    getApp().globalData.preview_img = data.data.data[0].preview_img;
                    getApp().globalData.id = data.data.data[0].id;
                    getApp().globalData.intro = data.data.data[0].intro;
                    if (data.data.data[0].team_list[0].length > 1) {
                      that.setData({
                        asd: 2,
                      })
                    }
                    that.setData({
                      box: data.data.data,
                      imgUrls: data.data.data[0].banner_list,
                      detial: data.data.data[0].detial.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
                      user: getApp().globalData.user,
                      isClick: data.data.data[0].collect_status,
                    })
                    if (data.data.data[0].show_list == 0) {
                      that.setData({
                        team_list_show: 'none'
                      })
                    } else if (data.data.data[0].show_list != 0) {
                      that.setData({
                        team_list_show: 'block'
                      })
                    }
                    if (data.data.data[0].collect_status == false) {
                      that.setData({
                        collec_status: '收藏'
                      })
                    } else if (data.data.data[0].collect_status == true) {
                      that.setData({
                        collec_status: '已收藏'
                      })
                    }
                    app.globalData.collect_id = data.data.data[0].collect.id
                    WxParse.wxParse('article', 'html', that.data.detial, that, 5);
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
                      success: function(data) {
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
                      fail: function(res) {
                        console.log(res)
                      }
                    })
                    wx.hideLoading()
                    //请求到详情后判断当前用户是否存在上级
                    if (app.globalData.parent_id) {
                      //已经有推荐人了
                    } else if (app.globalData.parent_id == '') {
                      var data_data = {
                        token: app.globalData.token,
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
                  },
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
      wx.request({
        url: app.data.requestUrl + '/item2/info',
        data: {
          item_list_string: that.data.aaa,
          user_id: user_id,
          call_type: 1
        },
        method: "POST",
        success: function(data) {
          console.log(data)
          that.history(data.data.data[0]);
          var team_list = data.data.data[0].team_list[0];
          var team_list1 = data.data.data[0].team_list[0];
          if (team_list != '') {
            // setInterval(function () {
            for (var i in team_list1) {
              if (team_list1[i].lack_time != 0) {
                team_list1[i].lack_time = team_list1[i].lack_time--;
              }
              team_list[i].lack_time = that.formatTime(team_list1[i].lack_time)
              that.setData({
                team_list: team_list,
              })
            };
            // }, 1000)
          }
          getApp().globalData.preview_img = data.data.data[0].preview_img;
          getApp().globalData.title = data.data.data[0].title;
          getApp().globalData.price = data.data.data[0].price;
          getApp().globalData.start_space = data.data.data[0].start_space;
          getApp().globalData.type_list = data.data.data[0].type_list;
          getApp().globalData.preview_img = data.data.data[0].preview_img;
          getApp().globalData.id = data.data.data[0].id;
          getApp().globalData.intro = data.data.data[0].intro;
          if (data.data.data[0].team_list[0].length > 1) {
            that.setData({
              asd: 2,
            })
          }
          that.setData({
            box: data.data.data,
            imgUrls: data.data.data[0].banner_list,
            detial: data.data.data[0].detial.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
            add_shop_car: data.data.data,
            user: getApp().globalData.user,
            isClick: data.data.data[0].collect_status,
          })
          if (data.data.data[0].show_list == 0){
            that.setData({
              team_list_show:'none'
            })
          } else if (data.data.data[0].show_list != 0){
            that.setData({
              team_list_show: 'block'
            })
          }
          if (data.data.data[0].collect_status == false) {
            that.setData({
              collec_status: '收藏'
            })
          } else if (data.data.data[0].collect_status == true) {
            that.setData({
              collec_status: '已收藏'
            })
          }
          app.globalData.collect_id = data.data.data[0].collect.id
          WxParse.wxParse('article', 'html', that.data.detial, that, 5);
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
            success: function(data) {
              console.log(data)
              if (data.data.data == false) {
                that.setData({
                  comment: '', //评论上半部分
                  comment_grade: '', //总的评论分 保留一位数
                  comment_list: '', //评论列表
                  one_1: '', //黄色星星数量
                  two_1: '', //灰色星星数量
                  comment_show:'none',//没有评论就隐藏
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
            fail: function(res) {
              console.log(res)
            }
          })
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        },
      })
    }
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
    return day + '天：' + hour + '时：' + minute + '分：' + second + '秒'
  },
  /**
   * 浏览历史
   */
  history: function(data) {
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
  selected: function(e) {
    this.setData({
      selected1: false,
      selected: true,
      selected2: false,
    })
  },
  selected1: function(e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
    })
  },
  //请求评价
  selected2: function(e) {
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
        if (data.data.data == false){
          that.setData({
            comment: '', //评论上半部分
            comment_grade: '', //总的评论分 保留一位数
            comment_list: '', //评论列表
            comment_show: 'none',//没有评论就隐藏
          })
        }else{
          that.setData({
            comment: data.data.data, //评论上半部分
            comment_grade: data.data.data.good.toFixed(1), //总的评论分 保留一位数
            comment_list: data.data.data.comment_list, //评论列表
            comment_show: 'block',//有评论就显示
          })
        }
        wx.hideLoading();
      },
      fail: function(res) {
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
      success: function(data) {
        console.log(data)
        that.setData({
          comment_list: data.data.data, //评论列表
        })
        wx.hideLoading();
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 请求小程序二维码
  share: function(options) {
    var that = this
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      var path1 = getApp().globalData.preview_img
      var path2 = getApp().globalData.qrcode_src
      var title = getApp().globalData.title
      var intro = getApp().globalData.intro
      var user_id = getApp().globalData.user.id
      const ctx = wx.createCanvasContext('myCanvas')
      var item_id = that.data.iid
      wx.showLoading({
        title: '海报生成中...',
      })
      var v_scene = user_id + ',' + item_id + ',' + 1
      console.log(v_scene)
      var share_data = {
        token: getApp().globalData.user.token,
        scene: v_scene,
        page: 'pages/goods_show/goods_show',
        user_id: user_id
      }
      console.log(share_data)
      wx.request({
        url: app.data.requestUrl + '/tool/wx_mini_qrcode',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: share_data,
        success: function(res) {
          getApp().globalData.qrcode_src = res.data.data;
          that.setData({
            window: "block",
            showModalStatus: false,
          })
          wx.getImageInfo({
            src: path1,
            success: function(res) {
              let Path = res.path;
              wx.getImageInfo({
                src: getApp().globalData.qrcode_src,
                success: function(reult) {
                  let Paths = reult.path;
                  common.creat_qrcode(Path, Paths, title, intro);
                }
              })
            },
            fail: function(res) {
              console.log(res)
            }
          })
          wx.hideLoading();
        }
      })
    }
  },
  // 海报取消按钮
  close_btn: function(e) {
    this.setData({
      window: "none",
    })
  },
  // 单独购买点击去选择日期和人数
  alone_buy: function(res) {
    wx.setStorageSync('orderDetail', this.data.box)
    app.globalData.request_btn = 1
    app.globalData.flag = 1
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    var wx_mini_reg_status = app.globalData.login_status
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      wx.navigateTo({
        url: '../choose_date/choose_date'
      })
    }
  },
  // 发起拼单建团点击去选择日期和人数
  launch: function() {
    wx.setStorageSync('orderDetail', this.data.box)
    app.globalData.request_btn = 2
    app.globalData.flag = 2
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    var wx_mini_reg_status = app.globalData.login_status
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      wx.navigateTo({
        url: '../choose_date/choose_date'
      })
    }
  },
  // 拼团购买点击去选择日期和人数
  go_spell_order: function(e) {
    app.globalData.groupid = e.currentTarget.dataset.groupid
    wx.setStorageSync('orderDetail', this.data.box)
    app.globalData.request_btn = 3
    app.globalData.flag = 2
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    var wx_mini_reg_status = app.globalData.login_status
    console.log(wx_mini_reg_status)
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      wx.navigateTo({
        url: '../choose_date/choose_date'
      })
    }
  },
  //返回首页
  back_index: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 遮罩层
  showModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0.1)
  },
  hideModal: function() {
    this.setData({
      showModalStatus: false,
    })
  },
  //下载海报
  savetup: function() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 240,
      height: 360,
      destWidth: 240 * 1920 / wx.getSystemInfoSync().windowWidth,
      destHeight: 360 * 1920 / wx.getSystemInfoSync().windowWidth,
      canvasId: 'myCanvas',
      success: function(res) {
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
              success: function(res) {
                console.log('用户点击确定');
              }
            })
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 海报end
  // 关闭/打开模态框
  look_more: function() {
    this.setData({
      showModal: true
    })
  },
  close_spell: function() {
    this.setData({
      showModal: false
    })
  },
  //点击星星进行收藏
  collection: function() {
    var that = this
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      if (!that.data.isClick == true) {
        wx.request({
          url: app.data.requestUrl + '/collect/add',
          data: {
            token: getApp().globalData.user.token, //登陆时返回的user表字段中
            type: 1,
            item_type: 1,
            collect: that.data.aaa,
            item_seckill_id: null //普通商品传null，秒杀传item_seckill_id
          },
          method: 'POST',
          success: function(data) {
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
          error: function(data) {
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
          success: function(data) {
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
          error: function(data) {
            console.log(data)
          }
        })
      }
    }
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
      success: function(data) {
        console.log(data)
        if (data.data.data == '') {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 3000
          })
        }else{
          that.setData({
            comment_list: that.data.comment_list.concat(data.data.data), //评论列表
          })
        }
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this
    var user_id = getApp().globalData.user.id //当前用户id
    var user_name = getApp().globalData.user.nickname //当前用户昵称
    var id = that.data.iid //商品id
    that.data.aaa = that.data.iid //重新定义商品id
    var share_title = '来自' + user_name + '的分享' //我自定义的标题
    if (res.from === 'button') { //我自定义的分享
      return {
        title: share_title,
        path: '/pages/goods_show/goods_show?share_btn=1' + '&user_id' + user_id + '&id=' + that.data.aaa,
      }
    } else if (res.from === 'menu') { //右上角自带分享
      return {
        title: share_title,
        path: '/pages/goods_show/goods_show?share_btn=1' + '&user_id' + user_id + '&id=' + that.data.aaa,
      }
    }
  }
})