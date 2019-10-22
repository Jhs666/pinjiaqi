// pages/test/test.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    startX: 0, //开始坐标
    startY: 0,
    hidename: false,
    selected: true,
    selected1: false,
    index: 0,
    pageNum: 1,
    article: [
      {
      preview_img: 'http://pjqly.com/public/wx_mini/images/ceshi.jpg',
      create_time: '2019-05-31',
      title: '测试测试测试测试测试测试测试测试测试测试测试测试',
      price: '200'
      },
      {
        preview_img: 'http://pjqly.com/public/wx_mini/images/ceshi.jpg',
        create_time: '2019-05-31',
        title: '测试测试测试测试测试测试测试测试测试测试测试测试',
        price: '200'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    common.loading()
    wx.request({
      url: app.data.requestUrl + '/collect/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        page_id: 1,
        type:1
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          inform: data.data.data,
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
    if (that.data.inform != '' && that.data.article != '') {
      that.setData({
        hidename: false
      })
    } else if (that.data.inform == '' && that.data.article == '') {
      that.setData({
        hidename: true
      })
    }
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.inform.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      inform: this.data.inform
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.inform.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      inform: that.data.inform
    })
  },
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除
  del: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '温馨提示',
      content: '是否确定删除？删除后不可恢复',
      success: function(res) {
        if (res.cancel) {
          //点击取消
        } else if (res.confirm) {
          wx.request({
            url: app.data.requestUrl + '/collect/ban',
            data: {
              token: getApp().globalData.user.token, //登陆时返回的user表字段中
              id: id
            },
            method: 'POST',
            success: function(data) {
              console.log(data)
              var msg = data.data.msg
              wx.showToast({
                title: msg,
                icon: 'none',
                duration: 3000
              })
              that.onPullDownRefresh()
            },
            error: function(data) {
              console.log(data)
            }
          })
        }
      }
    })
  },
  // 商品收藏列表
  selected: function(e) {
    var that = this
    common.loading()
    that.setData({
      selected1: false,
      selected: true,
      index: 0
    })
    wx.request({
      url: app.data.requestUrl + '/collect/get_list',
      data: {
        token: getApp().globalData.user.token,
        page_id: 1,
        type:1
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          inform: data.data.data,
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //商品收藏点击进入对应详情页
  product_show(e) {
    var product_item_type = e.currentTarget.dataset.item_type //类型
    var product_id = e.currentTarget.dataset.id //商品id
    var product_seckill_id = e.currentTarget.dataset.item_seckill_id //秒杀id
    var is_valid = e.currentTarget.dataset.is_valid //上架状态
    var one_status = e.currentTarget.dataset.one_status //一元上架状态
    var zero_status = e.currentTarget.dataset.zero_status //零元上架状态
    if (product_item_type == 1) {
      wx.showActionSheet({
        itemList: ['此商品存在于以下分类,请选择购买方式', '低价拼团', '零元砍', '一元拼'],
        success: function (res) {
          if (res.tapIndex == 0) {
            wx.showToast({
              title: '请选择购买方式',
              icon: 'none',
              duration: 3000
            })
          } else if (res.tapIndex == 1) {
            if (is_valid == 1) {
              wx.navigateTo({
                url: '../goods_show/goods_show?id=' + product_id,
              })
            } else if (is_valid == 2) {
              wx.showModal({
                title: '温馨提示',
                content: '当前商品已下架，看看别的吧~',
              })
            }
          } else if (res.tapIndex == 2) {
            if (is_valid == 1 && zero_status == 1) {
              wx.navigateTo({
                url: '../zero_goods_show/zero_goods_show?id=' + product_id,
              })
            } else if (is_valid == 1 && zero_status == 2) {
              wx.showModal({
                title: '温馨提示',
                content: '当前零元商品已下架，看看别的吧',
              })
            }
          } else if (res.tapIndex == 3) {
            if (is_valid == 1 && one_status == 1) {
              wx.navigateTo({
                url: '../one_goods_show/one_goods_show?id=' + product_id,
              })
            } else if (is_valid == 1 && one_status == 2) {
              wx.showModal({
                title: '温馨提示',
                content: '当前一元购商品已下架，看看别的吧~',
              })
            }
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else if (product_item_type == 2) {
      wx.navigateTo({
        url: '../Coupon_show/Coupon_show?id=' + product_id,
      })
    } else if (product_item_type == 3) {
      wx.navigateTo({
        url: '../Flash_sale_goods_show/Flash_sale_goods_show?id=' + product_id +
          '&item_seckill_id=' + product_seckill_id,
      })
    }
  },
  //游记收藏列表
  selected1: function(e) {
    var that = this
    common.loading()
    that.setData({
      selected: false,
      selected1: true,
      index: 1
    })
    wx.request({
      url: app.data.requestUrl + '/collect/get_list',
      data: {
        token: getApp().globalData.user.token,
        page_id: 1,
        type:2
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          article: data.data.data,
        })
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  //游记收藏点击进入对应详情页
  more(e){
    var product_id = e.currentTarget.dataset.id //游记id
    wx.navigateTo({
      url: '../travels_show/travels_show?id=' + product_id,
    })
  },
  //游记删除
  delete(e){
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '温馨提示',
      content: '是否确定删除？删除后不可恢复',
      success: function (res) {
        if (res.cancel) {
          //点击取消
        } else if (res.confirm) {
          wx.request({
            url: app.data.requestUrl + '/collect/ban',
            data: {
              token: getApp().globalData.user.token,
              id: id
            },
            method: 'POST',
            success: function (data) {
              console.log(data)
              var msg = data.data.msg
              wx.showToast({
                title: msg,
                icon: 'none',
                duration: 3000
              })
              that.onPullDownRefresh()
            },
            error: function (data) {
              console.log(data)
            }
          })
        }
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
    var that = this
    var index = that.data.index
    wx.showNavigationBarLoading();
    common.loading()
    if (index == 0) {
      wx.request({
        url: app.data.requestUrl + '/collect/get_list',
        data: {
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
          page_id: 1,
          type: 1
        },
        method: 'POST',
        success: function (data) {
          console.log(data)
          var msg = data.data.msg
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 3000
          })
          that.setData({
            article: data.data.data,
          })
          wx.hideLoading()
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        },
        error: function (data) {
          console.log(data)
        }
      })
    }else if(index == 1){
      wx.request({
        url: app.data.requestUrl + '/collect/get_list',
        data: {
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
          page_id: 1,
          type: 2
        },
        method: 'POST',
        success: function (data) {
          console.log(data)
          var msg = data.data.msg
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 3000
          })
          that.setData({
            article: data.data.data,
          })
          wx.hideLoading()
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        },
        error: function (data) {
          console.log(data)
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    var index = that.data.index
    common.loading()
    if (index == 0) {
      wx.request({
        url: app.data.requestUrl + '/collect/get_list',
        data: {
          token: getApp().globalData.user.token,
          page_id: ++that.data.pageNum,
          type:1
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
          } else {
            that.setData({
              inform: that.data.inform.concat(data.data.data),
            })
          }
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
    } else if (index == 1) {
      //请求文章收藏
      wx.request({
        url: app.data.requestUrl + '/collect/get_list',
        data: {
          token: getApp().globalData.user.token,
          page_id: ++that.data.pageNum,
          type: 2
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
              article: that.data.article.concat(data.data.data),
            })
          }
          wx.hideLoading()
        },
        error: function (data) {
          console.log(data)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})