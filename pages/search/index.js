// pages/search/index.js
Page({
  data: {
    searchInput: '', // 存储搜索框的输入
    books: [
      
    ]
  },
  
  // 当搜索框的内容发生改变时，更新 searchInput 的值
  onInputChange: function (e) {
    this.setData({
      searchInput: e.detail.value,
    });
  },

  // 发送网络请求的函数
  searchNovel: function () {
    var that = this;
    wx.request({
      url: 'https://59633717.r10.cpolar.top/search', // 你的后端接口地址
      data: {
        keyword: that.data.searchInput, // 将搜索框的内容作为参数传递
      },
      method: 'GET', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        // 根据返回的数据更新页面
        that.setData({
          books: res.data
        });
      }
    })
  }
})
