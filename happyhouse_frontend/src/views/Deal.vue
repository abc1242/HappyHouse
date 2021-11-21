<template>
    <b-container class="bv-example-row mt-3 text-center">
        <h3 class="underline-blue">
            <b-icon icon="house-fill"></b-icon> 아파트 거래정보
        </h3>
        <!-- <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row> -->
        <b-row>
            <b-col cols="6" align="left">
                <deal-list />
            </b-col>
            <b-col cols="6">
                <deal-detail />
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { mapActions } from "vuex";

const dealStore = "dealStore";

import DealList from "@/components/deal/DealList.vue";
import DealDetail from "@/components/deal/DealDetail.vue";

export default {
    name: "deal",
    components: {
        DealList,
        DealDetail,
    },

    data() {
        return {
            house: {}, // 선택하우스
        };
    },

    methods: {
        ...mapActions(dealStore, ["setHouse"]),
    },

    created() {
        this.house = this.$route.params.house;
        console.log(this.house.dongCode);
        console.log(this.house.aptName);

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
