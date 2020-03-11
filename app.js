//app.js
App({
  onLaunch: function() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(){})
    updateManager.onUpdateReady(function() {
      // wx.showModal({
      //   title: '更新提示',
      //   content: '新版本已经准备好，立即享用新版吧~',
      //   showCancel: false,
      //   success: function(res) {
      //     if (res.confirm) {
      //       updateManager.applyUpdate()
      //     }
      //   }
      // })
    })
  },
  globalData: {
    userCalendar: []
  }
})
