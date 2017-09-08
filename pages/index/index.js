//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    movieList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh: function () {
    this.getMovieList(this)
    console.log('==============fuck')

    if (wx.getExtConfig) {
      wx.getExtConfig({
        success: function (res) {
          console.log('......................')
          console.log(res.extConfig)
        }
      })
    }
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000)
    
    // wx.stopPullDownRefresh()
  },
  info: function (event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../moviedetail/moviedetail?id=' + event.currentTarget.dataset.id
    })

    // wx.switchTab({
    //   url: '../book/book'
    // })
  },

  getCurrentCity: function (latitude, longitude) {
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=y4Vy4Oqc9LwSwurdZBVrG4zNZVz0c7FW&location=' + latitude + ',' + longitude + '&output=json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('lkkkkkkkkkkkkkkkkkkkkkkl');
        console.log(res);
      },
      fail: function (res) {

      }
    })
  },

  locationCurrent: function (that){
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        
        that.getCurrentCity(latitude, longitude)

        console.log(res)
        console.log('00000000000000000')
      }
    })
  },
  
  getMovieList: function (that){
    wx.request({
      url: 'https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          movieList: res.data.ms
        })
        wx.hideLoading();
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
          animation: {
            duration: 400,
            timingFunc: 'easeOut'
          }
        })
        wx.hideNavigationBarLoading()
        // setTimeout(function(){
        //   wx.pageScrollTo({
        //     scrollTop: 100
        //   })
        // }, 2000)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          that.locationCurrent(that);
          that.getMovieList(that)
          wx.setTopBarText({
            text: 'hello 小朱'
          })
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#111111',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
            }
          })
          wx.showLoading({
            title: '加载中',
            mask: true,
          })
          wx.showNavigationBarLoading()
          wx.getWeRunData({
            success(res) {
              console.log(res);

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
