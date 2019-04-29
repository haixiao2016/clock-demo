// page/record/record.js
let utils = require('../../utils/util.js')
let t_index = -1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userCalendar:undefined,
    monArr: [],
    lawArr: []
  },
  onShow() {
    this.getLawDay()
  },
  getLawDay(){
    const _this = this
    if(this.data.lawArr.length === 0){
      wx.showLoading({
        title: '获取中',
      })
      wx.request({
        url: 'https://easy-mock.com/mock/5cc56f2fe949c841bdb0dd40/clock/reqGetLawDay',
        success(res) {
          const data = res.data || {}
          _this.setData({
            monArr: data.monArr,
            lawArr: data.lawArr
          })
        },
        complete(){
          _this.getCalendar()
        }
      })
    } else {
      _this.getCalendar()
    }
  },
  getCalendar(){
    const { monArr,lawArr } = this.data
    let userCalendar = wx.getStorageSync('userCalendar')
    if (userCalendar == undefined || userCalendar=='') {
      userCalendar = []
    } else {
      userCalendar = JSON.parse(userCalendar)
    }
    userCalendar.map((item)=>{
      item.low = utils.gusLow(item.date,lawArr)
      item.mon = utils.monLow(item.date,monArr)
    })
    this.setData({
      userCalendar
    })
    wx.hideLoading()
    this.refresh()
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
  },
  refresh(i) {
    if (this.data.userCalendar && this.data.userCalendar.length > 0) {
      this.data.userCalendar.map((item, index) => {
        if (i !== index) {
          this.selectComponent(`#slip${index}`) && this.selectComponent(`#slip${index}`).refresh()
          // 调用组件内部分`refresh`方法
          // 只改变组件显示状态，不支持动态改变组件相关信息，如按钮组的宽度等信息
          // 如果需要改变的话，需要重新渲染，请调用`init`方法.
        }
      })
    }
  },
  opend(e) {
    const opend = e.currentTarget.dataset ? e.currentTarget.dataset.opend : t_index
    if (opend === t_index){
      t_index = -1
      return this.refresh(-1)
    }
    t_index = opend
    // 只允许同时打开一个左划删除组件，当打开一个组件时，其他组件将关闭。不使用可以删除
    return this.refresh(opend)
  },
  delBtnClick(e){
    let userCalendar = wx.getStorageSync('userCalendar')
    if (userCalendar == undefined || userCalendar == '') {
      userCalendar = []
    } else {
      userCalendar = JSON.parse(userCalendar)
    }
    const id = Number(e.currentTarget.id)
    const date = userCalendar[id]
    let self = this
    wx.showModal({
      title: '提示',
      content: `确定要删除${date.date}的签到记录吗`,
      success: function (res) {
        if (res.confirm) {
          setTimeout(()=>{
            userCalendar.splice(id, 1)
            wx.setStorageSync('userCalendar', JSON.stringify(userCalendar))
            wx.showToast({
              title: '已清除',
              icon: 'none',
              duration: 2000
            })
            self.getCalendar()
          },300)
        }
      },
      complete:function(){
        self.refresh()
      }
    })
  }
})