// page/record/record.js
let utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userCalendar:[]
  },
  onShow: function (options) {
    this.getCalendar()
  },
  getCalendar(){
    let userCalendar = wx.getStorageSync('userCalendar')
    if (userCalendar == undefined || userCalendar=='') {
      userCalendar = []
    } else {
      userCalendar = JSON.parse(userCalendar)
    }
    userCalendar.map((item)=>{
      if (utils.gusLow(item.date)){
        item.low = true
      }else{
        item.low = false
      }
    })
    this.setData({
      userCalendar: userCalendar
    })
    console.log(this.data.userCalendar)
  },
  del(){
    let self = this
    wx.showModal({
      title: '提示',
      content: '确定要删除签到记录吗',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync('userCalendar')
          wx.showToast({
            title: '已清除',
            icon: 'none',
            duration: 2000
          })
          self.getCalendar()
        }
      }
    })
  }
})