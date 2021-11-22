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
    components: {
        LineChart,
    },
    computed: {
        ...mapState(dealStore, ["deals"]),
    },
    watch: {
        deals() {
            //this.fillData();
        },
    },
    data() {
        return {
            datacollection: null,
        };
    },
    mounted() {
        this.fillData();
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: [
                    "2019.6.9",
                    "2019.10.19",
                    "2019.11.19",
                    "2019.12.19",
                    "2020.01.19",
                    "2020.02.19",
                ],
                datasets: [
                    {
                        label: "거래금액(만원)",
                        backgroundColor: "#59b5f3",
                        data: [117000, 112500, 112000, 122000, 123000, 124000],
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