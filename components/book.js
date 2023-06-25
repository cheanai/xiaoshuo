// components/book.js
Component({
  properties: {
      bookId: {
          type: String,
          value: ''
      },
      bookName: {
          type: String,
          value: ''
      },
      bookAuthor: {
          type: String,
          value: ''
      },
      latestChapter: {
          type: String,
          value: ''
      }
  },
  methods: {
    onBookTap: function() {
      // 使用 this.data.bookId 获取到当前书籍的 ID
      wx.navigateTo({
        url: '/pages/bookDetail/bookDetail?id=' + this.data.bookId, // 假设你的书籍详情页面位于 'pages/bookDetail/index'，并接受一个名为 'id' 的参数
      });
    },
    attached: function() {
      console.log(this.data.bookId);
      console.log(this.data.bookAuthor);
    }
  }
})
