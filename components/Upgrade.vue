<template>
    <button @click="addToPerSecond" class="upgrade v-btn" :disabled="!canBuy" :class="{ disabled: !canBuy }">
      <h3>{{label}}</h3>
      <h3>Adds {{addAmount}} per second</h3>
      <h3>Costs {{Math.round(realCost)}}</h3>
    </button>
</template>

<script>
export default {
  props: ["addAmount", "cost", "label"],
  name: "Upgrade",
  data() {
    return {
      realCost: +this.cost
    }
  },
  methods: {
    addToPerSecond() {
      this.$store.dispatch('addToCookies', -this.realCost);
      console.log(Math.sqrt(this.realCost));
      this.realCost += +Math.sqrt(this.realCost);
      this.$store.dispatch('addToPerSecond', this.addAmount);
    }
  },
  computed: {
    canBuy() {
      return this.$store.state.cookieAmount >= this.realCost;
    }
  }
}
</script>

<style scoped>
.upgrade {
  width: 80%;
  color: white;
  background-color: #ba2323;
}
.upgrade:hover {
  width: 85%;
}
.disabled {
  color: black;
}
h3 {
  width: 32%;
}
</style>
