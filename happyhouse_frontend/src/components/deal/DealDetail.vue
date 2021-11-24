<template>
  <b-container v-if="deal" class="bv-example-row">
    <b-row class="mb-2 mt-1">
      <b-col
        ><b-img :src="require('@/assets/aptnew.jpg')" fluid-grow></b-img
      ></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info"
          >거래일 : {{ deal.dealYear }}.{{ deal.dealMonth }}.{{ deal.dealDay }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary">층수 : {{ deal.floor }}층</b-alert>
        <!-- 평수 : {{ deal.area }} 평 -->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning">평수 : {{ deal.area }} 평</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="danger"
          >거래금액 :
          {{
            (parseInt(deal.dealAmount.replace(",", "")) * 10000) | price
          }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";

const dealStore = "dealStore";

export default {
    name: "DealDetail",
    computed: {
        ...mapState(dealStore, ["deal"]),
    },
    filters: {
        price(value) {
            if (!value) return value;
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
};
</script>

<style></style>
