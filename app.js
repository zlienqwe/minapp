//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)

        },
        fail: function(res){
          console.log('失败')
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    genderMapping: [
      {
        key: 1,
        title: '男'
      },
      {
        key: 2,
        title: '女'
      }
    ]
  }
})
