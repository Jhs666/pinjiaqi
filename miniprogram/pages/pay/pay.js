// pages/pay/pay.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        price:'',
        item_title:''
    },
    pay: function(options) {
        var that = this;
        wx.login({
            success(res) {
                // console.log(res.code);return true;
                wx.request({
                    url: app.data.requestUrl +'/login/miniprogramlogin ',
                    data: {
                        js_code: res.code,
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(data) { //登陆成功
                        getApp().globalData.user = data.data.data;
                        wx.request({
                            url: app.data.requestUrl +'/orderform/place_on ', //这个链接是后端写的
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: {
                                // orderform_id: '20190109136167713395', //创建订单接口返回的订单号
                                orderform_id: that.data.oid, //创建订单接口返回的订单号
                                order_pay_type: 'wx', //下单支付时方式选择的支付方式,此处填写wx,代表微信支付的意思
                                token: getApp().globalData.user.token,
                            },
                            method: 'POST',
                            success: function(res) {
                                var this_res = res.data.data;
                                console.log(this_res);
                                // 发起支付
                                wx.requestPayment({
                                    'appId': this_res.appId,
                                    'timeStamp': this_res.timeStamp,
                                    'nonceStr': this_res.nonceStr,
                                    'package': this_res.package,
                                    'signType': this_res.signType,
                                    'paySign': this_res.paySign,
                                    'success': function(res) {
                                        wx.showToast({
                                            title: '支付成功'
                                        });
                                        console.log(res);
                                    },
                                    'fail': function(res) {
                                        console.log(res)
                                    }
                                });
                            },
                            fail: function(res) {
                                console.log(res)
                            }
                        })
                    },
                    error: function(data) {
                        console.log(data)
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        var oid = options.id;
        console.log(oid)
        var prices = options.price;
        console.log(prices)
        that.setData({
            price: prices
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