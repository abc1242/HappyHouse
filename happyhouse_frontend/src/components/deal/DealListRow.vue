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
                src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTlfMzIg/MDAxNTgyMTA4MjM5Mjk5.9AyII842EoUtrKfwfuUhN3F1inI-fWmNwZU-Fv_IW0wg.ZsvbUrDQubVKDbeCWnOGGPlMRhA51zDj4Q4GqS3Edn4g.JPEG.coldwell25/SE-3d8640e5-3def-4e83-bbe3-b7938a29c9e5.jpg?type=w800"
                alt="Image 1"
            ></b-img>
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
import { mapActions } from "vuex";
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
.mouse-over-bgcolor {
    background-color: lightblue;
}
</style>
