<template>
  <div>
    <div @click="toRoute">toRoute</div>
  </div>
</template>

<script>

import {getLineList} from 'api/login'

export default {
  data () {
    return {
    }
  },
  methods: {
    toRoute(){
      this.$router.push('/pages/cs/main')
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
