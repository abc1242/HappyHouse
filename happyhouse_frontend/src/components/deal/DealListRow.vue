<template>
  <b-row
    class="m-2"
    @click="selectDeal"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="2" class="text-center align-self-center">
      <b-img
        thumbnail
        src="https://picsum.photos/250/250/?image=58"
        alt="Image 1"
      ></b-img>
    </b-col>
    <b-col cols="6" class="align-self-center">
      거래금액 : {{ deal.dealAmount }}만원
    </b-col>
    <b-col cols="4" class="align-self-center">
      거래일자 : {{ deal.dealYear }}.{{ deal.dealMonth }}.{{ deal.dealDay }}
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";

const dealStore = "dealStore";

export default {
    name: "HouseListRow",
    data() {
        return {
            isColor: false,
        };
    },
    props: {
        deal: Object,
    },
    methods: {
        ...mapActions(dealStore, ["detailDeal"]),
        selectDeal() {
            // console.log("listRow : ", this.house);
            // this.$store.dispatch("getHouse", this.house);
            this.detailDeal(this.deal);
        },
        colorChange(flag) {
            this.isColor = flag;
        },
    },
};
</script>

<style scoped>
.apt {
    width: 50px;
}
.mouse-over-bgcolor {
    background-color: lightblue;
}
</style>
