//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {
      user: [{
        "id": 0,
        "account": "",
        "openid": "",
        "phone": "",
        "email": "",
        "password": "",
        "nickname": "",
        "realname": "",
        "spell_family_name": "",
        "spell_name": "",
        "sex": 1,
        "country": "",
        "birthday": "",
        "profile_photo": "",
        "region_id": 0,
        "card_type": "",
        "idcard": "",
        "front_img": "",
        "reverse_img": "",
        "card_ident_status": "",
        "longitude": "",
        "latitude": "",
        "cover": "",
        "create_time": "",
        "update_time": "",
        "token": "",
        "wx_mini_reg_status": 2,
        "is_delete": 1,
        "session_key": ''
      }],
      preview_img: '',
      qrcode_src: '',
      title: '',
      intro: '',
      browsingHistory: {}//浏览历史
    }
  },
  convertHtmlToText: function(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, ' * ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
    returnText = returnText.replace(/ +(?= )/g, '');
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');
    return returnText;
  },
  globalData: {
    userInfo: null,
    requestUrl: '', 
  },
  data: {
    url: 'http://pin.lanhaihui.net/public',
    requestUrl: 'https://pin.lanhaihui.net/public/index.php/index',
  },
  onLoad: function(options) {
    var that = this
    const app = getApp()
    this.globalData.browsingHistory = JSON.parse(wx.getStorageSync('browsingHistory'))
    wx.login({
      success(res) {
        app.globalData.code = res.code;
        // console.log(res.code)
        // return false;
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
              app.globalData.user = data.data.data;
              // console.log(app.globalData.user.token)
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
  },
})