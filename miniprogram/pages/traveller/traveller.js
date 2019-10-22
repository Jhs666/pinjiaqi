// pages/traveller/traveller.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kaqima: '',
    value: '',
    trip_list: [{
      realname: '',
      sex_name: ''
    }],
    go_num: '', //出行总人数
    travel_human_type: '', //成人出行数量
    travel_child_human_type: '', //儿童出行数量
    travel_total: '', //出行类型合并
    type: '',
    show1:'',
    show2:'',
  },
  checkboxChange(e) {
    var that = this
    var type = ''
    for (var i = 0; i < e.detail.value.length; i++) {
      var aaa = e.detail.value[i].split(',');
      type = type.concat(aaa[2])
    }
    app.globalData.user_type = type
    that.setData({
      value: e.detail.value,
      type: app.globalData.user_type
    })
    // console.log(that.data.value)
    const arrnum = that.data.value;
    let da = 0,
      xiao = 0;
    for (let i = 0; i < arrnum.length; i++) {
      const gender = arrnum[i].split(',')[2];
      if (gender == 1) {
        da++;
      } else {
        xiao++;
      }
    };
    this.setData({
      show1:'',
      show2:'',
    })
    let show1 = '';
    let show2 = '';
    if (da == 0 && xiao != 0) {
      show2 = xiao + '儿童';
    } else if (xiao == 0 && da != 0){
      show1 = da + '成人';
    } else if (xiao != 0 && da != 0){
      show1 = da + '成人';
      show2 = xiao + '儿童';
    }
    this.setData({
      show1,
      show2,
    })
    // console.log(show1);
    // console.log(show2);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.data.donghua = options.donghua;
    that.setData({
      go_num: app.globalData.shuliang, //出行总人数
      travel_human_type: app.globalData.travel_human_type, //成人出行数量
      travel_child_human_type: app.globalData.travel_child_human_type, //儿童出行数量
      travel_total: app.globalData.travel_total, //出行类型合并
    })
    wx.request({
      url: app.data.requestUrl + '/trip/get_list',
      data: {
        token: getApp().globalData.user.token, //登陆时返回的user表字段中
      },
      method: 'POST',
      success: function(data) {
        // console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        that.setData({
          trip_list: data.data.data,
        })
      },
      error: function(data) {
        console.log(data)
      }
    })
    if (app.globalData.travlist == 1) {
      this.setData({
        kaqima: 'block'
      })
    } else {
      this.setData({
        kaqima: 'none'
      })
    }
  },
  // 点击选择进入成人或者儿童的添加页面
  travel_type: function() {
    wx.showActionSheet({
      itemList: ['成人', '儿童'],
      success: function(res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../add_passenger/add_passenger',
          })
        } else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../add_child_travel/add_child_travel',
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 选择成功后返回赋值
  success_btn: function(options) {
    var that = this
    app.globalData.value = that.data.value //选中的人
    var choose_length = that.data.value.length //选中的成人和儿童的总人数长度
    app.globalData.go_num = that.data.go_num //上页面传过来的出行总人数
    app.globalData.travel_human_type = that.data.travel_human_type //成人出行人数
    app.globalData.travel_child_human_type = that.data.travel_child_human_type //儿童出行人数
    app.globalData.travel_total = that.data.travel_total //出行类型合并
    app.globalData.choose_human = that.data.show1//选中的成人人数
    app.globalData.choose_child_human = that.data.show2//选中的儿童人数
    // return
    if (app.globalData.value == '') {
      wx.showToast({
        title: '您还未选择出行人',
        icon: 'none',
        duration: 3000
      })
    } else if (app.globalData.choose_human != app.globalData.travel_human_type && app.globalData.travel_child_human_type == app.globalData.choose_child_human) {
      wx.showToast({
        title: '当前选择的成人数量与出行人数不匹配',
        icon: 'none',
        duration: 3000
      })
    } else if (app.globalData.choose_child_human != app.globalData.travel_child_human_type && app.globalData.choose_human == app.globalData.travel_human_type) {
      wx.showToast({
        title: '当前选择的儿童数量与出行人数不匹配',
        icon: 'none',
        duration: 3000
      })
    } else if (app.globalData.choose_child_human != app.globalData.travel_human_type && app.globalData.choose_human != app.globalData.travel_human_type) {
      wx.showToast({
        title: '当前选择的儿童和成人数量与出行人数不匹配',
        icon: 'none',
        duration: 3000
      })
    } else if (choose_length > app.globalData.go_num) {
      wx.showToast({
        title: '当前选择人数大于出行人数',
        icon: 'none',
        duration: 3000
      })
    } else if (choose_length < app.globalData.go_num) {
      wx.showToast({
        title: '当前选择人数小于出行人数',
        icon: 'none',
        duration: 3000
      })
    } else {
      if (that.data.donghua == 1) {
        wx.navigateTo({
          url: '../zero_commit_order/zero_commit_order',
        })
      } else if (that.data.donghua == 2) {
        wx.navigateTo({
          url: '../one_commit_order/one_commit_order',
        })
      } else if (that.data.donghua == 3) {
        wx.navigateTo({
          url: '../Flash_commit_order/Flash_commit_order',
        })
      } else {
        wx.navigateTo({
          url: '../commit_order/commit_order', //numID=1
        })
      }
    }
  },
  // 编辑
  edit_travel: function(e) {
    app.globalData.userid = e.currentTarget.dataset.userid //用户id
    app.globalData.user_type = e.currentTarget.dataset.usertype //类型
    if (app.globalData.user_type == 1) {
      wx.navigateTo({
        url: '../edit_travel/edit_travel',
      })
    } else if (app.globalData.user_type == 2) {
      wx.navigateTo({
        url: '../edit_child_travel/edit_child_travel',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})