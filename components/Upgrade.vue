<template>
  <div>
    <button @click="addToPerSecond" class="upgrade v-btn" :disabled="!canBuy" :class="{ disabled: !canBuy }">
      <h3>{{label}}</h3>
      <h3>Adds {{realAddAmount}} per second</h3>
      <h3>Costs {{Math.round(realCost)}}</h3>
    </button>
    <div v-show="upgradeAmount != 0" class="upgradeAmount">
      <div v-for="index in upgradeAmount" :key="index" class="upgradeIndicator" :class="{ green: upgradedEfficiency }"></div>
    </div>
    <button
      v-show="!upgradedEfficiency"
      @click="upgradeEfficiency"
      :disabled="!canBuyEfficiency"
      :class="{ disabled: !canBuyEfficiency }"
      class="upgrade v-btn green">
      <h3>Upgrade Efficiency, Costs {{efficiencyCost}}</h3>
    </button>
  </div>
</template>

<script>
export default {
  props: ["addAmount", "cost", "label", "efficiencyCost"],
  name: "Upgrade",
  data() {
    return {
      realCost: +this.cost,
      realAddAmount: this.addAmount,
      upgradeAmount: 0,
      upgradedEfficiency: false
    }
  },
  methods: {
    addToPerSecond() {
      this.$store.dispatch('addToCookies', -this.realCost);
      this.upgradeAmount++;
      this.realCost += +Math.sqrt(this.realCost);
      this.$store.dispatch('addToPerSecond', this.realAddAmount);
    },
    upgradeEfficiency() {
      this.$store.dispatch('addToCookies', -this.efficiencyCost);
      this.upgradedEfficiency = true;
      const addPerUpgrade = this.realAddAmount * 2;
      // Math.round is needed for correct summation
      this.realAddAmount = Math.round((+this.realAddAmount + addPerUpgrade) * 10) / 10;
      this.$store.dispatch('addToPerSecond', addPerUpgrade * this.upgradeAmount);
    }
  },
  computed: {
    canBuy() {
      return this.$store.state.cookieAmount >= this.realCost;
    },
    canBuyEfficiency() {
      return this.$store.state.cookieAmount >= this.efficiencyCost;
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
.upgradeAmount {
  width: 80%;
  display:inline-block;
}
.upgradeIndicator {
  margin: 1px 2px;
  background-color: white;
  height: 14px;
  width: 5px;
  float: left;
}
.upgrade:hover {
  width: 81%;
}
.disabled {
  color: black;
}
h3 {
  width: 32%;
}
</style>
