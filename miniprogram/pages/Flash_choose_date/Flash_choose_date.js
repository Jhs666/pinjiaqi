var app = getApp();
Page({
  data: {
    flag: '', //1-正常价格 2-建团价格（和拼团价格） 3-儿童价格  4-儿童拼团价  5-保险
    go_price: '', //上个页面传过来的出行价格
    newDateTime: [], //截取的上个页面传过来的出行价格（自定义格式）
    currentDayList1: [], //日历循环数组
    alone: { //成人单独价
      money: '0', //总价格
      money1: '0', //单个价格
      num: '0', //提交数量
    },
    alone_child: { //儿童单独价
      money: '0', //总价格
      money1: '0', //单个价格
      num: '0', //提交数量
    },
    alone_piece: { //成人团购
      money: '0', //总价格
      money1: '0', //单个价格
      num: '0', //提交数量
    },
    alone_child_piece: { //儿童团购
      money: '0', //总价格
      money1: '0', //单个价格
      num: '0', //提交数量
    },
    money: '0', //提交总价格
    id: '', //选中日期id
    num: '0', //提交数量
    currentDate: "",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    //日期初始化选中样式
    selectCSS: 'bk-color-day',
    moreFlag: false,
  },
  onLoad: function (options) {
    var that = this;
    that.zhuanhuangeshi();
    var currentObj = new Date()
    function initTime(e) {
      if (parseFloat(e) < 10) {
        return '0' + e;
      } else {
        return e;
      }
    }
    var aa = currentObj.getFullYear() + '-' + initTime(currentObj.getMonth() + 1) + '-' + initTime(currentObj.getDate())
    this.setData({
      flag: app.globalData.flag,
      currentDate: aa,
      currentDay: currentObj.getDate(),
      currentDay1: currentObj.getDate(),
      currentObj: currentObj,
      /*  获取当前的年、月  */
      currentYear: currentObj.getFullYear(),
      currentYear1: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
      currentMonth1: (currentObj.getMonth() + 1),
    })

    // console.log("选择当前日：" + that.data.currentDay1);
    this.setSchedule(currentObj);
  },
  // 新建数组，划分日期对应价格
  zhuanhuangeshi: function () {
    var dateTime = wx.getStorageSync('orderDetail').item_seckill;
    var newDateTime = {};
    var j = '';
    for (var i = 1; i < 13; i++) {
      j = i;
      if (i < 10) {
        j = '0' + i;
      };
      newDateTime[j] = [];
    }
    // for (var i in dateTime) {
      var arr = dateTime.trip_start_time.split("-");
      var month = arr[1];
      var obj = {};
      obj.day = arr[2];
      obj.price = dateTime.price;
      obj.piece_price = dateTime.piece_price;
      obj.child_price = dateTime.child_price;
      obj.child_piece_price = dateTime.child_piece_price;
      obj.id = dateTime.id;
      newDateTime[month].push(obj); //转换格式
    // }
    this.setData({
      newDateTime: newDateTime
    })
  },
  // 点击增加减少事件
  add: function (e) {
    var that = this,
      tap = e.currentTarget.dataset.tap,
      num = 0,
      what = e.currentTarget.dataset.what;
    if (what == 'alone') {
      num = that.data.alone.num
      console.log(num)
    } else if (what == 'alone_piece') {
      num = that.data.alone_piece.num
      console.log(num)
    } else if (what == 'alone_child_piece') {
      num = that.data.alone_child_piece.num
      console.log(num)
    } else if (what == 'alone_child') {
      num = that.data.alone_child.num
      console.log(num)
    }
    if (tap == "+") {
      num++;
    } else {
      num--;
      if (num < 0) {
        num = 0;
      }
    }
    // console.log(num)
    if (what == 'alone') {
      if (that.data.alone.money1 == 0) {
        wx.showToast({
          title: '很抱歉，当天没有安排班期哦~',
          icon: 'none',
          duration: 3000
        })
        that.setData({
          alone_child: {
            money: 0,
            money1: 0,
            num: 0,
          }
        })
      } else {
        that.setData({
          alone: { //成人单独价
            money: that.data.alone.money1 * num,
            money1: that.data.alone.money1,
            num: num, //提交数量
          }
        })
      }
    } else if (what == 'alone_piece') {
      if (that.data.alone_piece.money1 == 0) {
        wx.showToast({
          title: '很抱歉，当天没有安排班期哦~',
          icon: 'none',
          duration: 3000
        })
        that.setData({
          alone_child: {
            money: 0,
            money1: 0,
            num: 0,
          }
        })
      } else {
        that.setData({
          alone_piece: { //成人单独价
            money: that.data.alone_piece.money1 * num,
            money1: that.data.alone_piece.money1,
            num: num, //提交数量
          }
        })
      }
    } else if (what == 'alone_child_piece') {
      if (that.data.alone_child_piece.money1 == 0) {
        wx.showToast({
          title: '很抱歉，当天没有安排儿童班期哦~',
          icon: 'none',
          duration: 3000
        })
        that.setData({
          alone_child: {
            money: 0,
            money1: 0,
            num: 0,
          }
        })
      } else {
        that.setData({
          alone_child_piece: { //儿童拼团价
            money: that.data.alone_child_piece.money1 * num,
            money1: that.data.alone_child_piece.money1,
            num: num, //提交数量
          }
        })
      }
    } else if (what == 'alone_child') {
      if (that.data.alone_child.money1 == 0) {
        wx.showToast({
          title: '很抱歉，当天没有安排儿童班期哦~',
          icon: 'none',
          duration: 3000
        })
        that.setData({
          alone_child: {
            money: 0,
            money1: 0,
            num: 0,
          }
        })
      } else {
        that.setData({
          alone_child: { //儿童单独价
            money: that.data.alone_child.money1 * num,
            money1: that.data.alone_child.money1,
            num: num, //提交数量
          }
        })
      }
    }
  },
  doDay: function (e) {
    var that = this;
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    currentObj = new Date(str)
    function initTime(e) {
      if (parseFloat(e) < 10) {
        return '0' + e;
      } else {
        return e;
      }
    }
    this.setData({
      currentDate: currentObj.getFullYear() + '-' + initTime(currentObj.getMonth() + 1) + '-' + initTime(currentObj.getDate()),
      currentObj: currentObj,
      /*  获取当前的年、月  */
      currentYear: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
    })
    this.setSchedule(currentObj);
  },
  setSchedule: function (currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1;
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    // 获取日历日期对应的，后台返回的日期价格start
    var j = '';
    if (m < 10) {
      j = '0' + m;
    } else {
      j = m;
    }
    var dataList = that.data.newDateTime[j];
    // 获取日历日期对应的，后台返回的日期价格end
    var currentDayList1 = [];
    var f1 = 0;
    for (var i = 0; i < 42; i++) {
      let data = [];
      currentDayList1[i] = {};
      if (i < firstKey - 1) {
        currentDayList1[i].date = '';
        currentDayList1[i].price = '';
        currentDayList1[i].piece_price = '';
        currentDayList1[i].child_price = '';
        currentDayList1[i].child_piece_price = '';
      } else {
        if (f1 < currentDayNum) {
          currentDayList1[i].date = f1 + 1;
          for (var x in dataList) {
            if (dataList[x].day == currentDayList1[i].date) {
              currentDayList1[i].price = '￥' + parseFloat(dataList[x].price);
              currentDayList1[i].piece_price = '￥' + parseFloat(dataList[x].piece_price);
              currentDayList1[i].child_price = '￥' + parseFloat(dataList[x].child_price);
              currentDayList1[i].child_piece_price = '￥' + parseFloat(dataList[x].child_piece_price);
              currentDayList1[i].id = dataList[x].id;
            }
          }
          f1 = currentDayList1[i].date
        } else if (f1 >= currentDayNum) {
          currentDayList1[i].date = '';
          currentDayList1[i].price = ''; //正常价格
          currentDayList1[i].piece_price = ''; //拼团价格
          currentDayList1[i].child_price = ''; //儿童价
          currentDayList1[i].child_piece_price = ''; //儿童拼团价
        }
      }
    }
    that.setData({
      currentDayList1: currentDayList1
    })
  },
  //选择具体日期方法
  selectDay: function (e) {
    var that = this;
    var choosed_Date = e.target.dataset.day;
    if ((choosed_Date < that.data.currentDay1 && that.data.currentMonth == that.data.currentMonth1 && that.data.currentYear == that.data.currentYear1) || that.data.currentYear < that.data.currentYear1 || (that.data.currentMonth < that.data.currentMonth1 && that.data.currentYear == that.data.currentYear1)) {
      wx.showToast({
        title: '当前选择日期不存在~',
        icon: 'none',
        duration: 3000
      })
      return
    }
    function initTime(e) {
      if (parseFloat(e) < 10) {
        return '0' + e;
      } else {
        return e;
      }
    }
    //正常购买
    var money1 = e.target.dataset.price;
    if (money1 == '￥NaN' || !money1) {
      var a_money1 = 0;
      var a_money = 0
    } else {
      var a_money1 = e.target.dataset.price.split('￥')[1];
      var a_money = e.target.dataset.price.split('￥')[1];
    }
    //拼团购买
    var money2 = e.target.dataset.piece_price;
    if (money2 == '￥NaN' || !money2) {
      var b_money2 = 0;
      var b_money = 0;
    } else {
      var b_money2 = e.target.dataset.piece_price.split('￥')[1];
      var b_money = e.target.dataset.piece_price.split('￥')[1];
    }
    //儿童正常价
    var money3 = e.target.dataset.child_price;
    if (money3 == '￥NaN' || !money3) {
      var c_money3 = 0;
      var c_money = 0;
    } else {
      var c_money3 = e.target.dataset.child_price.split('￥')[1];
      var c_money = e.target.dataset.child_price.split('￥')[1];
    }
    //儿童拼团价
    var money4 = e.target.dataset.child_piece_price;
    if (money4 == '￥NaN' || !money3) {
      var d_money4 = 0;
      var d_money = 0;
    } else {
      var d_money4 = e.target.dataset.child_piece_price.split('￥')[1];
      var d_money = e.target.dataset.child_piece_price.split('￥')[1];
    }
    that.setData({
      currentDay: e.target.dataset.day, //选择的数据，非真实当前日期
      currentDa: e.target.dataset.day, //选择某月具体的一天
      currentDate: that.data.currentYear + '-' + initTime(that.data.currentMonth) + '-' + initTime(e.target.dataset.day), //真实选择数据
      alone: { //成人单独价
        money: 0, //总价格
        money1: a_money1, //单个价格
        num: 0, //提交数量
      },
      alone_child: { //儿童单独价
        money: 0, //总价格
        money1: c_money3, //单个价格
        num: 0, //提交数量
      },
      alone_piece: { //成人团购
        money: 0, //总价格
        money1: b_money2, //总价格
        num: 0, //提交数量
      },
      alone_child_piece: { //儿童团购
        money: 0, //总价格
        money1: d_money4, //总价格
        num: 0, //提交数量
      },
      id: e.target.dataset.id //id
    })
  },
  // 点击下一步进行跳转
  next_page: function () {
    var that = this,
      arr = [],
      moneyAll = 0;
    arr[0] = {};
    arr[1] = {};
    if (that.data.flag == 1) {
      arr[0].title = '成人';
      arr[0].num = that.data.alone.num;
      arr[0].money = parseFloat(that.data.alone.money);
      arr[1].title = '儿童';
      arr[1].num = that.data.alone_child.num;
      arr[1].money = parseFloat(that.data.alone_child.money);
    } else if (that.data.flag == 2) {
      arr[0].title = '成人';
      arr[0].num = that.data.alone_piece.num;
      arr[0].money = parseFloat(that.data.alone_piece.money);
      arr[1].title = '儿童';
      arr[1].num = that.data.alone_child_piece.num;
      arr[1].money = parseFloat(that.data.alone_child_piece.money);
    }
    moneyAll = arr[0].money + arr[1].money
    app.globalData.go_date = that.data.currentDate
    app.globalData.jiage = moneyAll
    app.globalData.shuliang = arr[0].num + arr[1].num;//出行总人数
    app.globalData.travel_human_type = arr[0].num + arr[0].title;//成人出行数量
    if (arr[1].num == '0') {
      app.globalData.travel_child_human_type = '';//儿童出行数量不存在时不显示
    } else {
      app.globalData.travel_child_human_type = arr[1].num + arr[1].title;//儿童出行数量
    }
    app.globalData.travel_total = app.globalData.travel_human_type + app.globalData.travel_child_human_type//类型合并
    app.globalData.timeID = that.data.id
    if ((arr[0].num + arr[1].num) < 1 || moneyAll == 0) {
      wx.showToast({
        title: '请选择正确的出行日期和出行人^_^',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../Flash_commit_order/Flash_commit_order'
      })
    }
  }
})