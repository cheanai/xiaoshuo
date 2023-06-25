Page({
  data: {
    id: '',
    bookId: '',
    bookName: '',
    directoryList: []
  },

  onLoad: function (options) {
    this.setData({
      bookId: options.id,
      bookName: options.bookName,
      id: options.directory
    });
    this.getDirectory();
  },

  getDirectory: function () {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    wx.request({
      url: 'https://59633717.r10.cpolar.top/directory', // 更新为你的后端接口地址
      data: {
        url: this.data.bookId,
        id: this.data.id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            directoryList: res.data
          });
          console.log(res.data);
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

  navigateToChapter: function (e) {
    const chapterId = e.currentTarget.dataset.chapterId;
    wx.setStorageSync(this.data.bookName, chapterId);
    console.log(this.data.bookId);
    // 使用 redirectTo 替换当前页面，而不是压入页面栈
    wx.redirectTo({
      url: '/pages/read/index?id=' + this.data.bookId + '&bookName=' + this.data.bookName
    });
  }
});