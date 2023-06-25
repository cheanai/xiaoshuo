// pages/read/index.js
Page({
  data: {
    scrollTop: 0,
    isLoading: true,
    content: '',
    bookId: '',
    bookName: '',
    Previous_chapter: '',
    Next_chapter: '',
    chapter_name: '',
    fontSize: 16, // 字体大小
    isDarkTheme: false, // 是否为暗黑主题
    showSettings: false // 是否显示设置
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      bookId: options.id,
      bookName: options.bookName
    });
    this.getContent();
  },

  // 从后端获取内容的函数
  getContent: function () {
    wx.showLoading({
      title: '加载中...', // 加载提示的文字
    });
    var that = this;
    wx.request({
      url: 'https://59633717.r10.cpolar.top/read', // 你的后端接口地址
      data: {
        web: this.data.bookId,
        id: wx.getStorageSync(that.data.bookName), // 第二个参数
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          // 假设你的后端返回的数据中，书籍内容在 data.content 字段
          that.setData({
            key: that.data.key + 1,
            content: res.data.content,
            chapter_name: res.data.name,
            Next_chapter: res.data.next,
            Previous_chapter: res.data.pre,
            isLoading: false,
            scrollTop: 0,
          });
          wx.setStorageSync(that.data.bookName, res.data.id);
        } else {
          console.log('请求失败：', res.statusCode);
        }
        wx.hideLoading();
      },
      fail: function (err) {
        console.log('error', err);
      }
    });
  },
  // 切换设置的显示和隐藏
  toggleSettings: function () {
    this.setData({
      showSettings: !this.data.showSettings
    });
  },

  // 改变字体大小
  changeFontSize: function (e) {
    this.setData({
      fontSize: e.detail.value
    });
  },

  // 目录
  BookDirectory: function () {
    wx.navigateTo({
      url: '/pages/BookDirectory/index?id=' + this.data.bookId + '&bookName=' + this.data.bookName + '&directory=' + wx.getStorageSync(this.data.bookName)
    })
  },

  nextChapter: function () {
    var page = wx.getStorageSync(this.data.bookName)
    console.log(page)
    wx.setStorageSync(this.data.bookName, page + 1);
    this.getContent()
  },

  prevChapter: function () {
    var page = wx.getStorageSync(this.data.bookName)
    wx.setStorageSync(this.data.bookName, page - 1);
    this.getContent()
  },
});