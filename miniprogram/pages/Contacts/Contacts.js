// pages/Contacts/Contacts.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: [
            {
                id: 0,
                time: 0.5,

            },
            {
                id: 1,
                time: 1,

            },
            {
                id: 2,
                time: 1.5,

            },
            {
                id: 3,
                time: '2',

            },
            {
                id: 4,
                time: 2.5,

            },
            {
                id: 5,
                time: 3,

            }],
        background: '#fff',
        border: '1rpx solid rgb(221, 221, 221)',
        color: '#555',
        fee: '',
        id: 0, //进入页面时，默认选择第1个，如果不需要默认选中，去掉此语句即可；id从0开始,
        code: '',
        chargId: '',
        token: '',
        userId: '',
        openid: '',
        contact:[
            {
                img:'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
                name:'倪妮',
                tel:'15165605566'
            },
            {
                img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
                name: '倪妮',
                tel: '15165605566'
            },
            {
                img: 'http://pin.lanhaihui.net/public/wx_mini/images//ceshi.jpg',
                name: '倪妮',
                tel: '15165605566'
            }
        ]
    },
    // 点击选中添加样式
    click: function (time) {
        var that = this
        var times = time.currentTarget.dataset.time
        console.log(times)
        var id = time.currentTarget.dataset.id
        console.log("接收id", id)
        var price = wx.getStorageSync('price')
        console.log("接收单价", price)

        that.setData({
            price: price,
            fee: times / 0.5 * price,
            background: 'rgb(210, 234, 247)',
            border: '1rpx solid #1c9fe3',
            color: '#1c9fe3',
            id: id,
            time: times
        })
        console.log(that.data.fee)
        console.log(that.data.time)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})