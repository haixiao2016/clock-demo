// page/index/index.js
let utils = require('../../utils/util.js')
let app = getApp()
let userCalendar
const date_arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowDate: '获取中',
    prev_times: '获取中'
  },
  onLoad: function() {
    let Interval = setInterval(this.changeTime, 1000)
  },
  onShow() {
    this.getPrev()
  },
  getPrev() {
    userCalendar = wx.getStorageSync('userCalendar')
    if (userCalendar == undefined || userCalendar == '') {
      userCalendar = []
    } else {
      userCalendar = JSON.parse(userCalendar)
    }
    if (userCalendar.length > 0) {
      let prev = userCalendar[userCalendar.length - 1]
      this.data.prev_times =
        prev.calendarAf == undefined ? prev.calendarM0 : prev.calendarAf
      if (this.data.prev_times == undefined) {
        this.data.prev_times = '暂无'
      }
      this.setData({
        prev_times: this.data.prev_times
      })
    } else {
      this.setData({
        prev_times: '暂无'
      })
    }
  },
  changeTime() {
    this.setData({
      nowDate: utils.formatTime(new Date())
    })
  },
  calendar() {
    //签到
    let _date = new Date()
    let nowTimes = utils.formatDate(_date)

    if (_date.getHours() < 12) {
      // 小于十二小时为上午签到
      // 判断今天是否已经签到==>已签到，退出
      if (
        userCalendar.length > 0 &&
        userCalendar[userCalendar.length - 1].date == nowTimes
      ) {
        // 已签到
        wx.showToast({
          title: '请勿重复签到',
          icon: 'none',
          duration: 2000
        })
        return
      }
      userCalendar.push({
        date: nowTimes,
        week: date_arr[_date.getDay()],
        calendarM0: utils.formatTime(_date)
      })
      wx.showToast({
        title: '签到成功',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (
        userCalendar.length > 0 &&
        userCalendar[userCalendar.length - 1].date == nowTimes
      ) {
        userCalendar[userCalendar.length - 1].calendarAf = utils.formatTime(
          _date
        )
      } else {
        userCalendar.push({
          date: nowTimes,
          week: date_arr[_date.getDay()],
          calendarAf: utils.formatTime(_date)
        })
      }
      wx.showToast({
        title: '签到成功',
        icon: 'none',
        duration: 2000
      })
    }
    wx.setStorageSync('userCalendar', JSON.stringify(userCalendar))
    this.getPrev()
  }
})
