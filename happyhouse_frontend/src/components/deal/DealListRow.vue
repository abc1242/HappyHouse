<template>
    <b-row
        class="deallist m-2"
        @click="selectDeal"
        @mouseover="colorChange(true)"
        @mouseout="colorChange(false)"
        :class="{ 'mouse-over-bgcolor': isColor }"
    >
        <b-col cols="2" class="text-center align-self-center">
            <b-img thumbnail :src="house.imgsUrl" alt="Image 1"></b-img>
        </b-col>
        <b-col cols="6" class="align-self-center">
            거래금액 : {{ getDealAmountKor(deal.dealAmount) }}원
        </b-col>
        <b-col cols="4" class="align-self-center">
            거래일자 : {{ deal.dealYear }}.{{ deal.dealMonth }}.{{
                deal.dealDay
            }}
        </b-col>
    </b-row>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import { numToKr } from "vue-number-to-kor";

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
    computed: {
        ...mapState(dealStore, ["house"]),
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
        getDealAmountKor(dealAmount) {
            // 전체 콤마 제거
            let number = dealAmount.replace(/,/g, "");
            let dealAmountKor = numToKr(parseInt(number) * 10000, false);
            return dealAmountKor;
        },
    },
};
</script>

<style scoped>
.apt {
    width: 50px;
}
.deallist {
    background-color: rgb(201, 220, 226);
}
.mouse-over-bgcolor {
    background-color: lightblue;
}
</style>
