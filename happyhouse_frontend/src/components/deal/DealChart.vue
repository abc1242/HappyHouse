<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from "@/api/LineChart.js";
import { mapState } from "vuex";

const dealStore = "dealStore";

export default {
  data() {
    return {
      datacollection: null,
      dealDates: [],
      dealAmounts: [],
    };
  },
  components: {
    LineChart,
  },
  computed: {
    ...mapState(dealStore, ["deals"]),
  },
  watch: {
    deals() {
      this.dealDates = [];
      this.dealAmounts = [];
      for (let deal of this.deals) {
        let dealDate =
          deal.dealYear + "." + deal.dealMonth + "." + deal.dealDay;
        this.dealDates.push(dealDate);

        this.dealAmounts.push(parseInt(deal.dealAmount.replace(/,/g, "")));
      }
      this.fillData();
    },
  },
  mounted() {},
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.dealDates,
        datasets: [
          {
            label: "거래금액(만원)",
            backgroundColor: "#59b5f3",
            data: this.dealAmounts,
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style>
.small {
  max-height: 300px;
  max-width: 300px;
  margin: 5px auto;
}
</style>
