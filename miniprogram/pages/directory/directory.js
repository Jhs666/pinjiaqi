// pages/directory/directory.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_id: 1,
    pageNum: 2,
    selected: true,
    tablist1: [], //一级切换
    tablistselected1: '', //一级切换选中id
    tablistName1: '游记', //一级切换选中名字为游记
    tablist2: [], //二级切换
    tablistselected2: '', //二级选中id
    tablist3: [], //列表
    index1: 0, //一级索引值
    index2: 0, //二级索引值
    trip: [{}], //游记列表
    isPopping: false, //是否已经弹出
    animationPlus: {}, //旋转动画
    animationcollect: {}, //item位移,透明度
    show_mask: 'none', //透明阴影
    position: '3%', //悬浮按钮
    user: [{}],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    common.loading()
    var city = wx.getStorageSync('city_show')
    //一级按钮
    wx.request({
      url: app.data.requestUrl + '/guide/type_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        that.setData({
          tablistselected1: data.data.data[0].id,
          tablist1: data.data.data,
          city: city,
          user: getApp().globalData.user,
        })
        that.tagAjax();
        that.listAjax();
        wx.hideLoading();
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //一级点击
  selected1: function(e) {
    var that = this
    app.globalData.title_index = e.currentTarget.dataset.index
    that.setData({
      tablistselected1: e.currentTarget.dataset.id, //这是一级选中的id
      tablistselected2: e.currentTarget.dataset.id, //这是二级选中的id
      index1: e.currentTarget.dataset.index, //这是一级选中的索引值
      index2: 0, //这是二级选中的索引值
      // tablistItem1: e.currentTarget.dataset.item
    })
    if (e.currentTarget.dataset.name == that.data.tablistName1) {
      that.setData({
        selected: false
      })
    } else {
      that.setData({
        selected: true
      })
    }
    that.tagAjax();
    that.listAjax();
    that.travels();
  },
  //二级点击
  selected2: function(e) {
    var that = this
    that.setData({
      tablistselected2: e.currentTarget.dataset.id, //这是二级选中的id
      index2: e.currentTarget.dataset.index, //这是二级选中的索引值
    });
    that.listAjax();
  },
  // 标签
  tagAjax: function() {
    var that = this;
    common.loading()
    var tag_data = {
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      type: that.data.tablistselected1 //这是点击一级导航获得的id值
    }
    // console.log(tag_data)
    wx.request({
      url: app.data.requestUrl + '/guide/lable_list',
      data: tag_data,
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          tablist2: data.data.data,
          tablistselected2: data.data.data[0].id, //这是二级选中的id
        });
        that.listAjax();
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 列表
  listAjax: function() {
    var that = this;
    common.loading()
    // console.log(this.data.tablistselected2)
    wx.request({
      url: app.data.requestUrl + '/guide/guide_list',
      data: {
        page_id: 1,
        type: this.data.tablistselected1,
        lable: this.data.tablistselected2,
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        that.setData({
          tablist3: data.data.data
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //游记列表
  travels() {
    var that = this
    common.loading()
    if (getApp().globalData.user.id) {
      var user_id = getApp().globalData.user.id
    } else {
      var user_id = null
    }
    wx.request({
      url: app.data.requestUrl + '/Travelleft/get_list',
      data: {
        page_id: 1,
        user_id: user_id
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        that.setData({
          trip: data.data.data,
        })
        wx.hideLoading()
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  //跳转至详情
  goods_info(options) {
    var data = options.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../play_show/play_show?id=' +
        data.id + '&title=' + data.title,
    })
  },
  //跳转至创作游记
  create_travel() {
    wx.navigateTo({
      url: '../creat_travels/creat_travels',
    })
  },
  //跳转至游记详情
  details(e) {
    var travel_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../travels_show/travels_show?id=' + travel_id,
    })
  },
  //点赞喜欢
  love(e) {
    var that = this
    var travel_id = e.currentTarget.dataset.id//游记id
    var status = e.currentTarget.dataset.status//游记收藏状态
    var index = e.currentTarget.dataset.index//索引值
    app.globalData.love_id = e.currentTarget.dataset.praise_id//点过赞的id
    var wx_mini_reg_status = getApp().globalData.user.wx_mini_reg_status//登录状态
    if (wx_mini_reg_status != 3) {
      wx.showModal({
        title: '温馨提示',
        content: "您还未登录，请前往'我的'进行授权登录",
      })
    } else {
      if (status == 0) {
        //点赞  
        wx.request({
          url: app.data.requestUrl + '/praise/add',
          data: {
            guide: travel_id,
            token: getApp().globalData.user.token,
          },
          method: 'POST',
          success: function(data) {
            console.log(data)
            var msg = data.data.msg
            wx.showToast({
              title: msg,
            });
            let newtrip = that.data.trip;
            newtrip[index].praise_status = 1;
            newtrip[index].praise_count += 1;
            that.setData({
              trip: newtrip
            })
            app.globalData.love_id = data.data.data.id
          },
          error: function(data) {
            console.log(data)
          }
        })
      } else if (status == 1){
        // 取消点赞
        wx.request({
          url: app.data.requestUrl + '/praise/ban',
          data: {
            id: app.globalData.love_id,
            token: getApp().globalData.user.token,
          },
          method: 'POST',
          success: function(data) {
            console.log(data)
            var msg = data.data.msg
            wx.showToast({
              title: msg,
            });
            let newtrip = that.data.trip;
            newtrip[index].praise_status = 0;
            newtrip[index].praise_count -= 1;
            that.setData({
              trip: newtrip
            })
          },
          error: function(data) {
            console.log(data)
          }
        })
      }
    }
  },
  // 获取滚动条位置
  onPageScroll: function(e) {
    var that = this;
    common.onPageScroll(e, that)
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
  //游记页面的添加按钮点击弹出
  plus: function() {
    if (this.data.isPopping) {
      //缩回动画
      popp.call(this);
      this.setData({
        isPopping: false,
      })
    } else {
      //弹出动画
      takeback.call(this);
      this.setData({
        isPopping: true,
      })
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
    var index = app.globalData.title_index
    common.loading()
    if (index == 4) {
      // 游记列表请求
      wx.request({
        url: app.data.requestUrl + '/Travelleft/get_list',
        data: {
          page_id: that.data.pageNum++,
        },
        method: 'POST',
        success: function(data) {
          // console.log(data)
          if (data.data.data == '') {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 5000
            })
          } else {
            that.setData({
              trip: that.data.trip.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function(data) {
          console.log(data)
        }
      })
    } else {
      common.loading()
      var data = {
        page_id: that.data.pageNum++,
        type: that.data.tablistselected1,
        lable: that.data.tablistselected2,
        token: getApp().globalData.user.token,
      }
      wx.request({
        url: app.data.requestUrl + '/guide/guide_list',
        data: data,
        method: 'POST',
        success: function(data) {
          // console.log(data)
          if (data.data.data == '') {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 5000
            })
          } else {
            that.setData({
              tablist3: that.data.tablist3.concat(data.data.data)
            })
          }
          wx.hideLoading()
        },
        error: function(data) {
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
  animationPlus.rotateZ(225).step();
  animationcollect.translate(0, -70).rotateZ(360).opacity(1).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    show_mask: 'block'
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
  animationPlus.rotateZ(0).step();
  animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    show_mask: 'none'
  })
}