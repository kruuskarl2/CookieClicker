<template>
    <button @click="addToPerSecond" class="upgrade v-btn" :disabled="!canBuy" :class="{ disabled: !canBuy }">
      <h3>{{label}}</h3>
      <h3>Adds {{addAmount}} per second</h3>
      <h3>Costs {{cost}}</h3>
    </button>
</template>

<script>
export default {
  props: ["addAmount", "cost", "label"],
  name: "Upgrade",
  methods: {
    addToPerSecond() {
      this.$store.dispatch('addToCookies', -this.cost);
      this.$store.dispatch('addToPerSecond', this.addAmount);
    }
  },
  computed: {
    canBuy() {
      return this.$store.state.cookieAmount >= this.cost;
    }
  }
}
</script>

<style scoped>
.upgrade {
  width: 50%;
  color: white;
  background-color: #ba2323;
}
.disabled {
  color: black;
}
h3 {
  width: 32%;
}
</style>
