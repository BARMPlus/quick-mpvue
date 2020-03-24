
class Storage {
  getItem (key) {
    return wx.getStorageSync(key)
  }
  setItem (key, value) {
    wx.setStorageSync(key, value)
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
