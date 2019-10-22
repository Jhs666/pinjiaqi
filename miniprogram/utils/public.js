const app = getApp()

function creat_qrcode(imgPath, xcxcode, title, intro) {
  var that = this;
  //canvas绘制文字和图片
  const ctx = wx.createCanvasContext('myCanvas');
  // var basicprofile = '../../images/homes.png'; //logo
  //填充背景
  ctx.setFillStyle('#cccccc');
  ctx.fillRect(0, 0, 240, 360);
  ctx.setFillStyle('#ffffff');
  ctx.fillRect(1, 1, 238, 358);
  //绘制产品图
  ctx.drawImage(imgPath, 2, 2, 236, 160);
  //绘制标题
  ctx.setFontSize(16);
  ctx.setFillStyle('#000000');
  ctx.fillText(title, 10, 190);
  //绘制介绍产品
  ctx.setFontSize(12);
  ctx.setFillStyle('#6F6F6F');
  ctx.fillText(intro, 10, 215);
  //绘制一条虚线
  ctx.strokeStyle = '#999';
  ctx.beginPath();
  ctx.setLineWidth(1);
  ctx.setLineDash([2, 4]);
  ctx.moveTo(10, 245);
  ctx.lineTo(230, 245);
  ctx.stroke();
  //绘制图标
  // ctx.drawImage(basicprofile, 6, 280, 36, 36);
  //绘制介绍
  ctx.setFontSize(11);
  ctx.setFillStyle('#aaaaaa');
  ctx.fillText('长按识别图中二维码', 14, 280);
  ctx.fillText('分享自拼假期小程序', 14, 300);
  ctx.fillText('严选优质旅行线路', 20, 320);
  ctx.drawImage(xcxcode, 136, 256, 90, 90);
  ctx.draw();
}

function onPageScroll(e, that) {
  if (e.scrollTop > 100) {
    that.setData({
      floorstatus: true
    });
  } else {
    that.setData({
      floorstatus: false
    });
  }
}

function goTop(e) {
  if (wx.pageScrollTo) {
    wx.pageScrollTo({
      scrollTop: 0
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

function check_res_code(res, par_msg = false) {
  if (res.code == 0) {
    if (par_msg) {
      wx.showModal({
        title: '温馨提示',
        content: res.msg,
      })
    }
    return true;
  } else if (res.code == 1) {
    wx.showModal({
      title: '温馨提示',
      content: res.msg,
    })
    return true;
  } else if (res.code == -2) {
    wx.showModal({
      title: '温馨提示',
      content: res.msg,
    })
    //直接重新登陆,或让用户选择是否重新登陆
    return true;
  } else if (res.code == -1) {
    wx.showModal({
      title: '温馨提示',
      content: res.msg,
    })
    return false;
  }
}
function loading(){
  wx.showLoading({
    title: '加载中...',
  })
}
module.exports = {
  creat_qrcode: creat_qrcode,
  onPageScroll: onPageScroll,
  goTop: goTop,
  check_res_code: check_res_code,
  loading: loading
}