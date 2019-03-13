<template>
  <div class="wrapper">
    <h1>Discount Cookie Clicker</h1>
    <br>
    <button @click="incrementCookie" class="cookie" :class=""><img src="../static/cookie.png"></button>
    <br>
    <h2>{{beautifiedCookieAmount}}</h2>
    <h3>Per second: {{+perSecond.toFixed(2)}}</h3>
    <br>
    <Upgrade cost="15" add-amount="0.2" label="Upgrade 1" efficiency-cost="3000"></Upgrade>
    <Upgrade cost="100" add-amount="2" label="Upgrade 2" efficiency-cost="10000"></Upgrade>
    <Upgrade cost="1000" add-amount="20" label="Upgrade 3" efficiency-cost="40000"></Upgrade>
    <Upgrade cost="10000" add-amount="100" label="Upgrade 4" efficiency-cost="100000"></Upgrade>
    <Upgrade cost="100000" add-amount="600" label="Upgrade 5" efficiency-cost="500000"></Upgrade>
    <Upgrade cost="1000000" add-amount="5000" label="Upgrade 6" efficiency-cost="10000000"></Upgrade>
  </div>
</template>
<script>
import Upgrade from "../components/Upgrade";
import numeral from 'numeral';
export default {
  components: { Upgrade },
  created() {
    this.setTitle();
    const store = this.$store;
    setInterval(() => {
      store.dispatch('addToCookies');
    }, 10);
    setInterval(() => {
      this.setTitle();
    }, 1000)
  },
  methods: {
    incrementCookie() {
      this.$store.dispatch('incrementCookie');
    },
    setTitle() {
      document.title = this.beautifiedCookieAmount + " cookies";
    }
  },
  computed: {
    perSecond() {
      return this.$store.state.perSecond;
    },
    cookieAmount() {
      return this.$store.state.cookieAmount;
    },
    beautifiedCookieAmount() {
      const roundedAmount = Math.round(this.$store.state.cookieAmount);
      if (roundedAmount < 1000) return roundedAmount;
      return numeral(roundedAmount).format('0.00a');
    }
  }
}
</script>

<style>
  h1 {
    font-family: "Comic Sans MS";
  }
  .wrapper {
    padding: 20px;
    text-align: center;
  }
  .cookie {
    width: 300px;
    height: 300px;
    outline: 0;
  }
  img {
    width: 95%;
    height: 95%;
    transition: 0.1s;
  }
  img:hover {
    width: 90%;
    height: 90%;
  }
  img:active {
    width: 80%;
    height: 80%;
  }
</style>
