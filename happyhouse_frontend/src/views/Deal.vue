<template>
    <b-container class="bv-example-row mt-3 text-center">
        <h3 class="underline-blue mt-3 mb-5">
            <b-icon icon="house-fill"></b-icon> {{ house.sidoName }}
            {{ house.gugunName }} {{ house.dongName }}
            {{ house.aptName }} 아파트 거래정보
        </h3>
        <!-- <b-row>
            <b-col>
                <deal-chart></deal-chart>
            </b-col>
        </b-row> -->
        <b-row>
            <b-col cols="7" align="left">
                <b-row>
                    <deal-chart></deal-chart>
                    <deal-list />
                </b-row>
            </b-col>
            <b-col cols="5">
                <deal-detail />
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { mapActions } from "vuex";

const dealStore = "dealStore";

import DealChart from "@/components/deal/DealChart.vue";
import DealList from "@/components/deal/DealList.vue";
import DealDetail from "@/components/deal/DealDetail.vue";

export default {
    name: "deal",
    components: {
        DealChart,
        DealList,
        DealDetail,
    },

    data() {
        return {
            house: {}, // 선택하우스
        };
    },

    methods: {
        ...mapActions(dealStore, ["getDealList", "setHouse"]),
    },

    created() {
        this.house = this.$route.params.house;
        console.log(this.house.dongCode);
        console.log(this.house.aptName);

        this.getDealList(this.house);

        this.setHouse(this.house);

        //this.$store.state.
    },
};
</script>
<style scoped>
.underline-blue {
    display: inline-block;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 70%,
        rgba(37, 93, 197, 0.3) 30%
    );
}
</style>
