const user = {
  state: {
    model: '',
    isAnimate: true
  },
  mutations: {

    SET_MODEL (state, value) {
      state.model = value
    },
    SET_IS_ANIMATE (state, value) {
      state.isAnimate = value
    }

  }
}

export default user
