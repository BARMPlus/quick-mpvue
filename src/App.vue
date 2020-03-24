<script>
import {mapMutations} from 'vuex'
export default {
  created () {
    this._getSystemInfo()
  },
  methods: {
    _getSystemInfo () {
      const res = wx.getSystemInfoSync()
      console.log('benchmarkLevel', res)
      if (res.model.indexOf('iPhone X') !== -1) {
        this.setModel('iphoneX')
      }
      if (res.system.indexOf('Android') !== -1) {
        if (res.benchmarkLevel && res.benchmarkLevel < 15) {
          this.setIsAnimate(false)
        }
      }
    },
    ...mapMutations({
      setModel: 'SET_MODEL',
      setIsAnimate: 'SET_IS_ANIMATE'
    })
  }
}
</script>

<style lang="scss">

</style>
