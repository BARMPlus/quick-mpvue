
class Storage {
  getItem (key) {
    return wx.getStorageSync(key)
  }
  setItem (key, value) {
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      wx.setStorage({
        key,
        data: value
      })
    }
  }
  removeItem (key) {
    wx.removeStorageSync(key)
  }
  removeAll () {
    wx.clearStorageSync()
  }
  clearItem () {
    wx.clearStorageSync()
  }
  getInfo () {
    return wx.getStorageInfoSync()
  }
}

export default new Storage()
