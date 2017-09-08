// pages/moviedetail/moviedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '按时打算打算的',
    movieDetail: {},
    imageHeight: '128'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  
    var that = this

    console.log(getCurrentPages())
    console.log(getApp())
    console.log('=====================')

    const imageWidth = 72;
    
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId='+options.id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data.basic)
        that.setData({
          movieDetail: res.data.data.basic
        })
        var imageSizeArray = res.data.data.basic.img.split('_')[1].split('X');
        console.log(imageSizeArray[0] * imageWidth / imageSizeArray[1])
        that.setData({
          imageHeight: imageSizeArray[0] * imageWidth / imageSizeArray[1]
        })
        wx.hideLoading()
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})