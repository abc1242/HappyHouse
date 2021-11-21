<template>
    <b-container v-if="deals && deals.length != 0" class="bv-example-row mt-3">
        <deal-list-row
            v-for="(deal, index) in deals"
            :key="index"
            :deal="deal"
        />
    </b-container>
    <b-container v-else class="bv-example-row mt-3">
        <b-row>
            <b-col><b-alert show>거래 목록이 없습니다.</b-alert></b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState } from "vuex";

const dealStore = "dealStore";

export default {
    name: "DealList",
    // components: {
    //     HouseListRow,
    // },
    data() {
        return {};
    },
    created() {},
    computed: {
        ...mapState(dealStore, ["deals"]),
        // houses() {
        //   return this.$store.state.houses;
        // },
    },
};
</script>

<style>
</style>