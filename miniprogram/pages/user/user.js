// pages/user/user.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    user: [{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user: getApp().globalData.user
    })
  },
  // 请求购物车列表
  shop_car_list: function(options) {
    var that = this;
    var add_cart_data = {
      token: getApp().globalData.user.token, //登陆时返回的user表字段中
      item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
    }
    var content = JSON.stringify(add_cart_data);
    console.log(content);
    wx.request({
      url: app.data.requestUrl + '/cart/cart_list',
      data: {
        page_id: 1,
        item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
        'content': content
      },
      method: 'POST',
      success: function(data) {
        var cart_array = [];
        for (var index = 0; index < data.data.data.length; ++index) {
          var content_item = JSON.parse(data.data.data[index].content);
          cart_array.push(content_item);
        }
        that.setData({
          carts: cart_array
        });
        console.log(that.data.carts);
        console.log(data.data.data);
        app.globalData.shopbigcar = data.data.data;
        wx.navigateTo({
          url: '../shop_car/shop_car?carts=',
        })
      },
      error: function(data) {
        console.log(data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 提示
  integral: function() {
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
  },
  showlist: function() {
    wx.navigateTo({
      url: '../order/order?mkll=' + 2,
    })
  },
  showlist2: function () {
    wx.navigateTo({
      url: '../order/order?mkll=' + 3,
    })
  },
  showlist3: function () {
    // wx.navigateTo({
    //   url: '../order/order?mkll=' + 4,
    // })
    wx.showToast({
      title: '努力开发中，敬请期待~',
      icon: 'none',
      duration: 2000
    })
  },
  showlist4: function () {
    wx.navigateTo({
      url: '../order/order?mkll=' + 5,
    })
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

  },
  bindgetuserinfo: function(e) {
    var that = this
    // console.log(this.data.user);
    // return false;
    var wx_mini_user_info_json = e.detail.userInfo
    wx_mini_user_info_json['openid'] = getApp().globalData.user.openid;
    var wx_mini_user_info = JSON.stringify(wx_mini_user_info_json);
    // console.log(wx_mini_user_info);
    wx.request({
      url: app.data.requestUrl + '/user/wx_fill_user_detail',
      data: {
        token: getApp().globalData.user.token,
        wx_mini_user_info: wx_mini_user_info,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(data) {
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
                  getApp().globalData.user = data.data.data;
                  // console.log(app.globalData.user);
                  that.setData({
                    user: data.data.data
                  })
                  //   console.log(that.data.user)
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
      error: function(data) {
        console.log(data)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if (res.target.id == 1) {
        return {
          path: '/pages/index/index'
        }
      }
      if (res.target.id == 2) {
        return {
          path: '/pages/index/index'
        }
      }
    } else {
      return {
        path: '/pages/index/index'
      }
    }
  }
})