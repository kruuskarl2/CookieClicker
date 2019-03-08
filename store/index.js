export const state = () => ({
  perSecond: 0,
  cookieAmount: 0
})

export const mutations = {
  addToPerSecond(state, amount) {
    state.perSecond += +amount;
  },
  addToCookieAmount(state, amount) {
    state.cookieAmount += +amount
  }
}

export const actions = {
  addToPerSecond(context, amount) {
    context.commit('addToPerSecond', amount);
  },
  incrementCookie(context) {
    context.commit('addToCookieAmount', 1);
  },
  addToCookies(context, amount = null) {
    if (!amount) amount = context.state.perSecond;
    context.commit('addToCookieAmount', amount);
  }
}
