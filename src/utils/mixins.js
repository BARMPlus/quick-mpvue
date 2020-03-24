import {mapGetters} from 'vuex'

import { compareVersion } from 'utils'

export const isLowVersionMixin = { // 优先级最高，需要提早执行该mixin(只会在首页时被用到)
  data () {
    return {
      isLowVersion: false,
      isLowIosVersion: false
    }
  },
  onLoad () {
    let systemInfo = wx.getSystemInfoSync()
    const version = systemInfo.SDKVersion || '1.0'
    let system = systemInfo.system
    const isIos = system.indexOf('iOS') !== -1

    if (compareVersion(version, '1.9') < 0) { // 当前版本小于1.9时，提示用户更新版本，无法进行后续流程
      this.isLowVersion = true
    } else if (isIos) { // 如果为ios系统
      system = system.replace('iOS', '')
      system = system.trim()
      if (compareVersion(system, '9.5') < 0) { // 低版本IOS系统
        this.isLowVersion = true
        this.isLowIosVersion = true
      }
    }
    if (this.isLowVersion) { // 低版本时，隐藏loading，延时是因为要在onShow之后隐藏
      setTimeout(() => {
        this.$loading.hide() // 隐藏loading
      }, 1000)
    }
  },
  onHide () {
    if (this.isLowVersion) this.$loading.hide() // 隐藏loading
  }
}

export const modelMixin = {
  computed: {
    isIphoneX () {
      return this.model === 'iphoneX' ? 'iphoneX' : ''
    },
    ...mapGetters([
      'model'
    ])
  }
}

export const restoreDataMiXin = {

  data () {
    return {
      restoreMixin: true,
      routeHistoryArr: []
    }
  },
  methods: {
    unloadRestoreBefore () {

    },
    unLoadCallback () {

    },
    loadCallback () {

    }
  },
  onLoad () { // load保存的是初始进来的data值
    if (!this.restoreMixin) return
    let copyData = JSON.parse(JSON.stringify(this.$data))
    this.routeHistoryArr.push(copyData)
    this.loadCallback()
  },
  onUnload () {
    if (!this.restoreMixin) return
    this.unloadRestoreBefore()
    let current = this.routeHistoryArr.pop()
    Object.keys(this.$data).forEach((key) => {
      this.$data[key] = current[key]
    })
    this.unLoadCallback(current)
  }
}

export const audioMixin = {
  data () {
    return {
      audioIsDestroy: true, // 离开页面时，是否默认销毁音频 默认为true
      audioCtx: null,
      audioSrc: '', // 音频地址
      audioStartPlay: true, // 是否打开页面就播放 默认true
      audioLoop: false// 是否循环播放 默认false
    }
  },
  onLoad () {
    if (this.isLowVersion) return
    const audioContextFn = wx.createInnerAudioContext
    if (!audioContextFn || typeof audioContextFn !== 'function') {
      wx.showToast({
        title: '微信版本过低',
        icon: 'none',
        duration: 999999,
        mask: true
      })
      return
    }
    this.audioCtx = wx.createInnerAudioContext()
    if (this.audioSrc) this.audioCtx.src = this.audioSrc
    this.audioCtx.loop = this.audioLoop
    if (this.audioSrc && this.audioStartPlay) this.audioCtx.play()
  },
  methods: {
    unloadRestoreBefore () { // restore重置之前
      if (this.audioIsDestroy) {
        this.audioPause()
        this.audioDestroy()
      }
    },
    audioPlay () {
      if (this.audioCtx && this.audioCtx.play) this.audioCtx.play()
    },
    audioPause () {
      if (this.audioCtx && this.audioCtx.pause) this.audioCtx.pause()
    },
    audioDestroy () {
      if (this.audioCtx && this.audioCtx.destroy) this.audioCtx.destroy()
    },
    setPlay (src) {
      if (!src || !this.audioCtx || !this.audioCtx.play) return
      this.audioCtx.src = src
      this.audioCtx.play()
    }
  }
}
