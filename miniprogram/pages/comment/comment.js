// pages/comment/comment.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],//选中的所有图片
    returnImgUrls: '',//后台返回的所有图片
    full: 0,//好评率
    empty: 5,//好评率
    full_1: 0,//路线
    empty_1: 5,//路线
    full_2: 0,//导游
    empty_2: 5,//导游
    full_3: 0,//领队
    empty_3: 5,//领队
    full_4: 0,//行程
    empty_4: 5,//行程
    full_5: 0,//描述
    empty_5: 5,//描述
    content:'',//内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.globalData.orderform_id = options.orderform_id
    app.globalData.item_id = options.item_id
    that.setData({
      preview_img: options.preview_img
    })
  },
  //好评率
  in_xin: function(e) {
    var in_xin = e.currentTarget.dataset.in;
    var full;
    if (in_xin === 'use_sc2') {
      full = Number(e.currentTarget.id);
    } else {
      full = Number(e.currentTarget.id) + this.data.full;
    }
    this.setData({
      full: full,
      empty: 5 - full
    })
  },
  //路线评分
  in_xin1: function (e) {
    var in_xin1 = e.currentTarget.dataset.in;
    var full_1;
    if (in_xin1 === 'use_sc2') {
      full_1 = Number(e.currentTarget.id);
    } else {
      full_1 = Number(e.currentTarget.id) + this.data.full_1;
    }
    this.setData({
      full_1: full_1,
      empty_1: 5 - full_1
    })
  },
  //导游讲解
  in_xin2: function (e) {
    var in_xin2 = e.currentTarget.dataset.in;
    var full_2;
    if (in_xin2 === 'use_sc2') {
      full_2 = Number(e.currentTarget.id);
    } else {
      full_2 = Number(e.currentTarget.id) + this.data.full_2;
    }
    this.setData({
      full_2: full_2,
      empty_2: 5 - full_2
    })
  },
  //领队服务
  in_xin3: function (e) {
    var in_xin3 = e.currentTarget.dataset.in;
    var full_3;
    if (in_xin3 === 'use_sc2') {
      full_3 = Number(e.currentTarget.id);
    } else {
      full_3 = Number(e.currentTarget.id) + this.data.full_3;
    }
    this.setData({
      full_3: full_3,
      empty_3: 5 - full_3
    })
  },
  //行程安排
  in_xin4: function (e) {
    var in_xin4 = e.currentTarget.dataset.in;
    var full_4;
    if (in_xin4 === 'use_sc2') {
      full_4 = Number(e.currentTarget.id);
    } else {
      full_4 = Number(e.currentTarget.id) + this.data.full_4;
    }
    this.setData({
      full_4: full_4,
      empty_4: 5 - full_4
    })
  },
  //描述相符
  in_xin5: function (e) {
    var in_xin5 = e.currentTarget.dataset.in;
    var full_5;
    if (in_xin5 === 'use_sc2') {
      full_5 = Number(e.currentTarget.id);
    } else {
      full_5 = Number(e.currentTarget.id) + this.data.full_5;
    }
    this.setData({
      full_5: full_5,
      empty_5: 5 - full_5
    })
  },
  
  //  选择图片
  uploadImg() {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        let flag = true;//所有图片格式均正确
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.getImageInfo({
            src: tempFilePaths[i],
            success: function (res) {
              if (res.height > res.width) {
                flag = false;
                wx.showModal({
                  content: '图片格式不正确,请选择正确的图片（图片高度不得大于宽度）',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      that.uploadImg();
                      return false;
                    }
                  }
                });
              }
              // 当所有图片格式均正确
              if (++i == tempFilePaths.length && flag) {
                that.setData({
                  imgUrls: tempFilePaths,
                  imgShow: true
                });
                that.apiImg();
              }
            }
          })
        }
      }
    })
  },
  // API(上传图片)
  apiImg() {
    //启动上传等待中...  
    wx.showLoading({
      title: '图片上传中...',
    })
    const that = this;
    let i = 0;
    let returnImgUrls = [];//返回的所有图片链接
    uploadImg(that.data.imgUrls[i])
    function uploadImg(path) {
      wx.uploadFile({
        url: app.data.requestUrl + '/user/upload',
        filePath: path,
        header: {
          'Content-Type': 'multipart/form-data'
        },
        name: 'file',
        formData: {
          'token': getApp().globalData.user.token
        },
        success(data) {
          returnImgUrls.push(JSON.parse(data.data).data.id.toString())
          let v_returnImgUrls = returnImgUrls.join(',')
          that.setData({
            returnImgUrls: v_returnImgUrls
          })
        },
        complete: function () {
          i++;
          if (i < that.data.imgUrls.length) {
            uploadImg(that.data.imgUrls[i])
          } else {
            wx.hideLoading()
          }
        }
      })
    }
  },
  // 获取输入的内容
  con_Input: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  //提交
  submit(){
    var that = this
    common.loading()
    var content = that.data.content//内容
    var returnImgUrls = that.data.returnImgUrls//图片
    var good = that.data.full//好评率
    var line = that.data.full_1//线路评分
    var tour = that.data.full_2//导游讲解评分
    var lead = that.data.full_3//领队服务评分
    var journey = that.data.full_4//行程安排评分
    var describe = that.data.full_5//描述相符评分
    var msg = ''
    if (describe == '') {
      msg = '请对描述进行星级评价'
    }
    if (journey == '') {
      msg = '请对行程安排进行星级评价'
    }
    if (lead == '') {
      msg = '请对领队服务进行星级评价'
    }
    if (tour == '') {
      msg = '请对导游讲解进行星级评价'
    }
    if (line == '') {
      msg = '请对路线进行星级评价'
    }
    if (returnImgUrls == '') {
      msg = '请上传图片'
    }
    if (content == '') {
      msg = '请输入评价内容'
    }
    if (good == '') {
      msg = '请对商品进行星级评价'
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
    var submit_data = {
      token: getApp().globalData.user.token,//token
      orderform_id: app.globalData.orderform_id,//订单id
      good: that.data.full  ,//商品评分
      line: that.data.full_1,//线路评分
      tour: that.data.full_2,//导游讲解评分
      lead: that.data.full_3,//领队服务评分
      journey: that.data.full_4,//行程安排评分
      describe: that.data.full_5,//描述相符评分
      img: that.data.returnImgUrls,//图片
      content: that.data.content,//内容
    }
    console.log(submit_data)
    // return
    wx.request({
      url: app.data.requestUrl + '/Itemcomment/add',
      data: submit_data,
      method: "post",
      success: function (data) {
        console.log(data)
        var code = data.data.code
        if(code == 0){
          wx.showModal({
            title: '温馨提示',
            content: '发表成功',
            success: function (res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else if (res.confirm) {
                wx.navigateTo({
                  url: '../goods_show/goods_show?id=' + app.globalData.item_id,
                })
              }
            }
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