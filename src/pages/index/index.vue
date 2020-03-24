<template>
  <div class="index-container">
    <image src="./images/circle-bg.png" class="bg" mode="aspectFill"/>
    <div @click="toRoute" v-if="!isLowVersion">toRoute</div>
    <div class="low-tip" v-else>
      <p class="text" v-if="isLowIosVersion">您的系统版本过低，可能无法正常使用此小程序的服务，请更新系统版本</p>
      <p class="text" v-else>您的微信版本过低，可能无法正常使用此小程序的服务，请更新微信到最新版本</p>
    </div>
  </div>
</template>

<script>
import { isLowVersionMixin } from 'utils/mixins'

export default {
  data () {
    return {
    }
  },
  mixins: [isLowVersionMixin], // isLowVersionMixin 需放置在最前面
  onLoad () {
    if (this.isLowVersion) return
    console.log('1')
  },
  methods: {
    toRoute () {
      this.$router.push('/pages/cs/main')
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/mixin';
  .index-container{
    .low-tip{
      z-index: 9999;
      height: 100vh;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff!important;
      .text{
        width: rpx(600);
        line-height: rpx(42);
      }
    }
  }
</style>
