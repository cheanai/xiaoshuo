// pages/bookDetail/index.js
Page({
  data: {
    isInShelf: false,
    isLoading: true,
    bookId: '',
    bookName: '',
    bookAuthor: '',
    bookDescription: '',
  },
  addToShelf: function() {
    // 添加到书架的操作
    this.setData({ isInShelf: true });
  },
  removeFromShelf: function() {
    // 从书架中移除的操作
    this.setData({ isInShelf: false });
  },
  startReading: function() {
    var that = this;
    wx.setStorageSync(that.data.bookName, 1); // 使用书籍名称作为key，章节id作为值进行存储
    wx.navigateTo({
      url: '/pages/read/index?id=' + that.data.bookId + '&bookName='+that.data.bookName// 使用你的实际路径替换 '/pages/read/index'
    });
    console.log(this.data.bookId);
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...', // 加载提示的文字
    });    
    var bookId = options.id; // 获取传递过来的书籍 ID
    var that = this;

    wx.request({
      url: 'https://59633717.r10.cpolar.top/bookDetail', // 你的后端接口地址
      data: {
        web: bookId, // 将搜索框的内容作为参数传递
      },
      method: 'GET', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          bookName: res.data.name,
          bookId: res.data.id,
          bookAuthor: res.data.author,
          bookDescription: res.data.description,
          isLoading: false,
        });
        wx.hideLoading();
      }
      
    })
  }
})
