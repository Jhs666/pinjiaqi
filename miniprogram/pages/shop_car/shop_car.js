var app = getApp();
Page({
  data: {
    adminShow: false, //管理      
    shopcarData: [], //购物车数据      
    total: 0, //总金额      
    allsel: false, //全选      
    selarr: [], //选择的货物      
    hintText: '', //提示的内容      
    hintShow: false, //是否显示提示
    shopcarData: [{ //购物车   
      id: '',
      name: '',
      price: '',
      num: '',
      types: '',
      tag: '',
      start: ''
    }]
  },

  //点击全选  
  allcheckTap: function() {
    let shopcar = this.data.shopcarData,
      allsel = !this.data.allsel, //点击全选后allsel变化
      total = 0;
    for (let i = 0, len = shopcar.length; i < len; i++) {
      shopcar[i].check = allsel; //所有商品的选中状态和allsel值一样
      if (allsel) { //如果为选中状态则计算商品的价格
        total += shopcar[i].price * shopcar[i].num;
      }
    }
    this.data.selarr = allsel ? shopcar : []; //如果选中状态为true那么所有商品为选中状态，将物品加入选中变量，否则为空    
    this.setData({
      allsel: allsel,
      shopcarData: shopcar,
      total: total,
      selarr: this.data.selarr
    });
  },
  //点击移除商品  
  deleteshopTap: function() {
    var that = this
    var allsel = this.data.allsel, //判断条件
      shopcar = this.data.shopcarData, //购物车商品
      selarr = this.data.selarr; //选中商品
    if (allsel) {
      shopcar = [];
      this.setData({
        allsel: false
      });
    } else {
      console.log(selarr);
      //   for (var i = 0, len = selarr.length; i < len; i++) { //将选中的商品从购物车移除        
      //     console.log(selarr[i].id);
      //     for (var lens = shopcar.length - 1, j = lens; j >= 0; j--) {
      //       console.log(shopcar[j].id);
      //       if (selarr[i].id == shopcar[j].id) {
      //         shopcar.splice(j, 1);
      //       }
      //     }
      //   }
      wx.request({
        url: app.data.requestUrl + '/cart/cart_ban',
        data: {
          item_id: that.data.iid, //商品id,应该在点击商品的时间中获取商品id/commodity_id
          token: getApp().globalData.user.token, //登陆时返回的user表字段中
        },
        method: 'POST',
        success: function(data) {
          console.log(data)
          that.setData({
            shopcarData: shopcar,
            total: 0
          });
        },
        error: function(data) {
          console.log(data)
        }
      })
    }
  },
  //点击加入收藏夹 
  addcollectTap: function() {

  },
  //点击管理按钮，是否显示管理的选项  
  adminTap: function() {
    this.setData({
      adminShow: !this.data.adminShow
    });
  },
  //点击单个选择按钮  
  checkTap: function(e) {
    let Index = e.currentTarget.dataset.index,
      shopcar = this.data.shopcarData,
      total = this.data.total,
      selarr = this.data.selarr;
    shopcar[Index].check = !shopcar[Index].check || false;
    if (shopcar[Index].check) {
      total += shopcar[Index].num * shopcar[Index].price;
      selarr.push(shopcar[Index]);
    } else {
      total -= shopcar[Index].num * shopcar[Index].price;
      for (let i = 0, len = selarr.length; i < len; i++) {
        if (shopcar[Index].id == selarr[i].id) {
          selarr.splice(i, 1);
          break;
        }
      }
    }
    this.setData({
      shopcarData: shopcar,
      total: total,
      selarr: selarr
    });
    this.judgmentAll(); //每次按钮点击后都判断是否满足全选的条件  
  },
  //点击加减按钮  
  numchangeTap: function(e) {
    let Index = e.currentTarget.dataset.index, //点击的商品下标值        
      shopcar = this.data.shopcarData,
      types = e.currentTarget.dataset.types, //是加号还是减号        
      total = this.data.total; //总计    
    switch (types) {
      case 'add':
        shopcar[Index].num++; //对应商品的数量+1      
        shopcar[Index].check && (total += parseInt(shopcar[Index].price)); //如果商品为选中的，则合计价格+商品单价      
        break;
      case 'minus':
        shopcar[Index].num--; //对应商品的数量-1      
        shopcar[Index].check && (total -= parseInt(shopcar[Index].price)); //如果商品为选中的，则合计价格-商品单价      
        break;
    }
    this.setData({
      shopcarData: shopcar,
      total: total
    });
  },
  //判断是否为全选  
  judgmentAll: function() {
    let shopcar = this.data.shopcarData,
      shoplen = shopcar.length,
      lenIndex = 0; //选中的物品的个数    
    for (let i = 0; i < shoplen; i++) { //计算购物车选中的商品的个数    
      shopcar[i].check && lenIndex++;
    }
    this.setData({
      allsel: lenIndex == shoplen //如果购物车选中的个数和购物车里货物的总数相同，则为全选，反之为未全选    
    });
  },
  onLoad: function(options) {
    var cart_array = [];
    for (var index = 0; index < app.globalData.shopbigcar.length; ++index) {
      var content_item = JSON.parse(app.globalData.shopbigcar[index].content);
      cart_array.push(content_item);
    }
    this.setData({
      shopcarData: cart_array
    });
    console.log(this.data.shopcarData)
  },
  onReady: function() {

  },
  /**   * 生命周期函数--监听页面显示   */
  onShow: function() {
    // console.log(this.data.shopcarData)
    var shopcarData = this.data.shopcarData, //这里我是把购物车的数据放到app.js里的，这里取出来，开发的时候视情况加载自己的数据
      total = 0,
      selarr = this.data.selarr;
    for (let i = 0, len = shopcarData.length; i < len; i++) { //这里是对选中的商品的价格进行总结    
      if (shopcarData[i].check) {
        total += shopcarData[i].num * shopcarData[i].price;
        selarr.push(shopcarData[i]);
      }
    }
    this.setData({
      shopcarData: shopcarData,
      total: total,
      selarr: selarr
    });
    this.judgmentAll(); //判断是否全选  
  }
})