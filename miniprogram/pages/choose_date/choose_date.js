var app = getApp();
Page({
  data: {
    currentDate: "2017年05月03日",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    //日期初始化选中样式
    selectCSS: 'bk-color-day',
    carts: [{
      id: 1,
      title: "成人",
      num: 0,
      price: 1,
    },
    {
      id: 2,
      title: "儿童",
      num: 0,
      price: 1,
    },
    {
      id: 3,
      title: "保险",
      num: 0,
      price: 1,
    },
    ],
    text: "nihao",
    totalPrice: 0
  },
  sub(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    })
    this.getTotalPrice()
  },
  add(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    })
    this.getTotalPrice()
  },
  getTotalPrice(e) {
    let carts = this.data.carts;
    let sum = 0;
    for (let i = 0; i < carts.length; i++) {
      sum += carts[i].num * carts[i].price;
    }
    this.setData({
      totalPrice: sum.toFixed(2),
      carts: carts
    })
  },
  onLoad: function(options) {
    var that = this;
    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '-' + (currentObj.getMonth() + 1) + '-' + currentObj.getDate(),
      currentDay: currentObj.getDate(),
      currentObj: currentObj,
      /*  获取当前的年、月  */
      currentYear: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
    })
    this.setSchedule(currentObj);
  },
  doDay: function(e) {
    var that = this;
    console.log(e);
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
    this.setData({
      currentDate: currentObj.getFullYear() + '-' + (currentObj.getMonth() + 1) + '-' + currentObj.getDate(),
      currentObj: currentObj,
      /*  获取当前的年、月  */
      currentYear: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
    })
    console.log("选择当前年：" + that.data.currentYear);
    console.log("选择当前月：" + that.data.currentMonth);
    this.setSchedule(currentObj);
  },
  getCurrentDayString: function() {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '-' + (c_obj.getMonth() + 1) + '-' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function(currentObj) {
    console.log(currentObj);
    var that = this
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = [];
    var f = 0
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = ''
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = f + 1;
          f = currentDayList[i]
        } else if (f >= currentDayNum) {
          currentDayList[i] = ''
        }
      }
    }
    that.setData({
      currentDayList: currentDayList
    })
  },
  //选择具体日期方法
  selectDay: function(e) {
    var that = this;
    that.setData({
      currentDay: e.target.dataset.day, //选择的数据，非真实当前日期
      currentDa: e.target.dataset.day, //选择某月具体的一天
      currentDate: that.data.currentYear + '-' + that.data.currentMonth + '-' + e.target.dataset.day, //真实选择数据
    })
    console.log("当前选择日期：" + that.data.currentDate);
  }
})