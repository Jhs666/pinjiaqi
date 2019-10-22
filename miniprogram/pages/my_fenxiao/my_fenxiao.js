// pages/my_fenxiao/my_fenxiao.js
var app = getApp();
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //没有相关人员时显示为空
    hidename1: false,
    hidename2: false,
    hidename3: false,
    hidename4: false,
    inform: [{}],//推广产品列表
    // 关闭模态框
    showModal: false,
    selectedFlag: [false],//推广产品隐藏--显示
    selectedFlags: [false],//团队人数
    user: [{}],//用户
    spell: false,//判断我的推广id是否填写
    show:'',//页面加载数据
    user_list_name:'',//游客
    manager_list_name:'',//经理
    majordomo_list_name:'',//总监
    partner_list_name:'',//合伙人
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      user: getApp().globalData.user
    })
    common.loading()
    //请求推广产品列表
    wx.request({
      url: app.data.requestUrl + '/Placeitem/get_list',
      data: {
        token: getApp().globalData.user.token
      },
      method: 'POST',
      success: function (data) {
        // console.log(data)
        if (data.data.data == '') {
          that.setData({
            inform: data.data.data,
          })
          wx.showToast({
            title: '暂无此类商品，看看别的吧~',
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            inform: data.data.data,
          })
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
    // 请求推广中心详情
    wx.request({
      url: app.data.requestUrl + '/wallet/center',
      data: {
        token: getApp().globalData.user.token
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          show: data.data.data,//所有数据
          user_list_name: data.data.data.wallet.user_list_name,//游客
          manager_list_name: data.data.data.wallet.manager_list_name,//经理
          majordomo_list_name: data.data.data.wallet.majordomo_list_name,//总监
          partner_list_name: data.data.data.wallet.partner_list_name,//合伙人
        })
        //判断我的推广id是否填写
        if (data.data.data.wallet.place_code == ''){
          that.setData({
            spell: false
          })
        }else{
          that.setData({
            spell: true
          })
        }
        wx.hideLoading()
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.user_list_name != '' && that.data.manager_list_name != '' && that.data.majordomo_list_name != '' && that.data.partner_list_name) {
      that.setData({
        hidename1: false,
        hidename2: false,
        hidename3: false,
        hidename4: false,
      })
    } else if (that.data.user_list_name == '' && that.data.manager_list_name == '' && that.data.majordomo_list_name == '' && that.data.partner_list_name == '') {
      that.setData({
        hidename1: true,
        hidename2: true,
        hidename3: true,
        hidename4: true,
      })
    }
  },
  // 展开折叠选择推广产品  
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  // 展开折叠查看团队人数
  my_team: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlags[index]) {
      this.data.selectedFlags[index] = false;
    } else {
      this.data.selectedFlags[index] = true;
    }
    this.setData({
      selectedFlags: this.data.selectedFlags
    })
  },
  // 关闭/打开规则模态框
  rule: function() {
    this.setData({
      showModal: true
    })
  },
  close_spell: function() {
    this.setData({
      showModal: false
    })
  },
  // 设置推广人ID
  tuiguangInput: function(e) {
    var that = this
    that.setData({
      parent_id: e.detail.value
    })
    console.log(that.data.parent_id)
  },
  set_parent_id: function(parent_id) {
    var that = this
    var parent_id = that.data.parent_id
    wx.request({
      url: app.data.requestUrl + '/user/set_parent',
      data: {
        token: getApp().globalData.user.token,
        parent_id: parent_id
      },
      method: 'POST',
      success: function(data) {
        console.log(data)
        if (data.data.code == 1){
          var msg = data.data.msg
          wx.showModal({
            title: '注意',
            content: msg,
          })
        } else if (data.data.code == -1){
          wx.showModal({
            title: '注意',
            content:'设置推广ID不能为空',
          })
        }else{
          var msg = data.data.msg
          wx.showModal({
            title: '恭喜',
            content: msg,
          })
        }
      },
      error: function(data) {
        console.log(data)
      }
    })
  },
  // 修改本人推广ID
  place_codeInput: function (e) {
    var that = this
    that.setData({
      place_code: e.detail.value
    })
    // console.log(e.detail.value)
  },
  place_code_click: function (place_code) {
    var that = this
    var place_code = that.data.place_code
    wx.request({
      url: app.data.requestUrl + '/wallet/set_place_code_user',
      data: {
        token: getApp().globalData.user.token,
        place_code_user: place_code
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        if (data.data.code == 1) {
          var msg = data.data.msg
          wx.showModal({
            title: '注意',
            content: msg,
          })
        } else if (data.data.code == -1){
          wx.showModal({
            title: '注意',
            content: 'ID不能为空',
          })
        }else{
          var msg = data.data.msg
          wx.showModal({
            title: '恭喜',
            content: msg,
          })
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
  },
  // 点击进入详情页
  product_show: function (options) {
    var dataset = options.currentTarget.dataset;
    wx.navigateTo({
      url: '../Coupon_show/Coupon_show?id=' +
        dataset.id.id + '&title=' + dataset.id.title,
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
    var that = this
    wx.showNavigationBarLoading();
    // 请求推广中心详情
    wx.request({
      url: app.data.requestUrl + '/wallet/center',
      data: {
        token: getApp().globalData.user.token
      },
      method: 'POST',
      success: function (data) {
        console.log(data)
        that.setData({
          show: data.data.data,//所有数据
          user_list_name: data.data.data.wallet.user_list_name,//游客
          manager_list_name: data.data.data.wallet.manager_list_name,//经理
          majordomo_list_name: data.data.data.wallet.majordomo_list_name,//总监
          partner_list_name: data.data.data.wallet.partner_list_name,//合伙人
        })
        //判断我的推广id是否填写
        if (data.data.data.wallet.place_code == '') {
          that.setData({
            spell: false
          })
        } else {
          that.setData({
            spell: true
          })
        }
        wx.showToast({
          title: '刷新成功',
          icon:'none',
          duration:2000
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      error: function (data) {
        console.log(data)
      }
    })
    if (that.data.user_list_name != '' && that.data.manager_list_name != '' && that.data.majordomo_list_name != '' && that.data.partner_list_name) {
      that.setData({
        hidename1: false,
        hidename2: false,
        hidename3: false,
        hidename4: false,
      })
    } else if (that.data.user_list_name == '' && that.data.manager_list_name == '' && that.data.majordomo_list_name == '' && that.data.partner_list_name == '') {
      that.setData({
        hidename1: true,
        hidename2: true,
        hidename3: true,
        hidename4: true,
      })
    }
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

  }
})