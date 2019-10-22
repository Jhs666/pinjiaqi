// pages/creat_travels/creat_travels.js
const app = getApp()
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],//选中的所有图片
    returnImgUrls: [],//后台返回的所有图片
    city: '添加位置',//城市
    title:'',//标题
    content:'',//内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //  选择图片
  uploadImg() {
    var that = this;
    wx.chooseImage({
      count: 1,
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
                });
                that.apiImg();
              }
            }
          })
        }
      }
    })
  },
  apiImg() {
    wx.showLoading({
      title: '图片上传中...',
    })
    var that = this;
    let i = 0;
    let returnImgUrls = '';//返回的所有图片
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
        success(res) {
          console.log(res.data)
          // return
          var json_res = JSON.parse(res.data)
          console.log(json_res)
          var img_name = json_res.data.name
          console.log(img_name)
          that.setData({
            returnImgUrls: img_name
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
  //定位
  position:function(){
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        var speed = res.speed //速度
        var accuracy = res.accuracy //位置的精确度
        wx.showLoading({
          title: '定位中...',
        })
        wx.request({
          url: app.data.requestUrl + '/tool/location',
          data: {
            latitude: longitude,
            longitude: latitude
          },
          method: "post",
          success: function (data) {
            that.setData({
              city: data.data.msg
            })
            wx.hideLoading()
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    })
  },
  // 点击完成进行提交
  title_Input: function (e) {
    var that = this
    that.setData({
      title: e.detail.value
    })
    console.log(that.data.title);
  },
  con_Input: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
    console.log(that.data.content);
  },
  submit(){
    var that = this
    var returnImgUrls = that.data.returnImgUrls//图片
    var title = that.data.title//标题
    var content = that.data.content//内容
    var city = that.data.city//地理位置
    var msg = ''
    if (content == '') {
      msg = '请输入内容'
    }
    if (title == '') {
      msg = '请输入标题'
    }
    if (returnImgUrls == '') {
      msg = '请上传图片'
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
    var submit_data = {
      token: getApp().globalData.user.token,
      preview_img: that.data.returnImgUrls,
      title: that.data.title,
      content: that.data.content,
      location:that.data.city,
    }
    wx.request({
      url: app.data.requestUrl + '/Travelright/add',
      data: submit_data,
      method: "post",
      success: function (data) {
        console.log(data)
        if (false === common.check_res_code(data.data, false)) {
          return false;
        }
        var code = data.data.code
        if(code == 0){
          wx.showToast({
            title: '发表成功',
            icon:'successs',
            duration:2000
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