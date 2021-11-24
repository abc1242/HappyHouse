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
import DealListRow from "@/components/deal/DealListRow.vue";
import { mapActions, mapState } from "vuex";

const dealStore = "dealStore";

export default {
    name: "DealList",
    components: {
        DealListRow,
    },
    data() {
        return {};
    },
    created() {
        this.initDeal();
    },
    computed: {
        ...mapState(dealStore, ["deals"]),
    },
    watch: {
        deals() {
            if (this.deals.length > 0) {
                this.detailDeal(this.deals[this.deals.length - 1]);
            }
        },
    },
    methods: {
        ...mapActions(dealStore, ["initDeal", "detailDeal"]),
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
