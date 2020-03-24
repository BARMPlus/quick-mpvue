class Loading {
  show (title = '加载中...', mask = true) {
    wx.showLoading({
      title,
      mask
    })
  }
  hide () {
    wx.hideLoading()
  }
}
export let loading = new Loading()
