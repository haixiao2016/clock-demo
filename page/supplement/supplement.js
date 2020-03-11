let rewardedVideoAd = null;
Page({
  data: {
    isPickerRender: false,
    isPickerShow: false,
    pickerConfig: {
      endDate: true,
      column: "second",
      dateLimit: true,
      initStartTime: "2020-01-01 00:00:00",
      initEndTime: "2020-01-01 00:00:00",
      yearStart: "2019",
      yearEnd: new Date().getFullYear()
    },
    text:
      "为防止补签功能滥用和更好的维护此功能，我们会要求您看一段广告，请知悉~",
    marqueePace: 1, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20 // 时间间隔
  },
  onLoad: function() {
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: "adunit-8f3f974daf99ad6a"
      });
      rewardedVideoAd.onLoad(() => {
        console.log("onLoad event emit");
      });
      rewardedVideoAd.onError(err => {
        console.log("onError event emit", err);
      });
    }
  },
  onShow() {
    var that = this;
    var length = that.data.text.length * that.data.size; //文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt(); // 第一个字消失后立即从右边出现
  },
  scrolltxt: function() {
    var that = this;
    var length = that.data.length; //滚动文字的宽度
    var windowWidth = that.data.windowWidth; //屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function() {
        var maxscrollwidth = length + that.data.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {
          //判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          });
        } else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    } else {
      that.setData({ marquee_margin: "1000" }); //只显示一条不滚动右边间距加大，防止重复显示
    }
  },
  pickerShow: function() {
    this.setData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function() {
    this.setData({
      isPickerShow: false,
      chartHide: false
    });
  },
  setPickerTime: function(val) {
    wx.showModal({
      title: "温馨提示",
      content: "您需要看一段广告才能补签完成，是否继续",
      confirmText: "继续",
      cancelText: "算了",
      success: function(res) {
        res.confirm && rewardedVideoAd.show();
      }
    });
    rewardedVideoAd.onClose(res => {
      if (res && res.isEnded) {
        this.setDate(val.detail);
      } else {
        wx.showToast({
          icon: "none",
          title: "设置无效：广告倒计时没有结束"
        });
      }
    });
  },
  setDate(days) {
    let userCalendar = wx.getStorageSync("userCalendar");
    if (userCalendar == undefined || userCalendar == "") {
      userCalendar = [];
    } else {
      userCalendar = JSON.parse(userCalendar);
    }
    const times = new Date(days.date).getTime();
    if (userCalendar.length === 0) {
      userCalendar.push(days);
    } else {
      let isSet = false;
      for (let item = 0; item < userCalendar.length; item++) {
        const times2 = new Date(userCalendar[item].date).getTime();
        if (times === times2) {
          // 存在相同的数据，覆盖
          userCalendar[item] = days;
          isSet = true;
          break;
        } else if (times < times2) {
          // 插入到前面的位置
          userCalendar.splice(item, 0, days);
          isSet = true;
          break;
        }
      }
      !isSet && userCalendar.push(days);
    }
    wx.setStorageSync("userCalendar", JSON.stringify(userCalendar));
    wx.showToast({
      icon: "none",
      title: "补签完成"
    });
  }
});
