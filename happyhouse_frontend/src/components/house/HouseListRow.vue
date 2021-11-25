<template>
    <b-row
        class="houselist m-2"
        @click="callDisplayInfowindow"
        @mouseover="colorChange(true)"
        @mouseout="colorChange(false)"
        :class="{ 'mouse-over-bgcolor': isColor }"
    >
        <b-col cols="2" class="text-center align-self-center">
            <b-img thumbnail :src="house.imgsUrl" alt="Image 1"></b-img>
        </b-col>
        <b-col cols="10" class="align-self-center">
            [{{ house.sidoName }} {{ house.gugunName }} {{ house.dongName }}]
            {{ house.aptName }}
        </b-col>
    </b-row>
</template>

<script>
/* eslint-disable */
import EventBus from "@/api/event-bus.js";
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
    name: "HouseListRow",
    data() {
        return {
            isColor: false,
        };
    },
    created() {},
    props: {
        house: Object,
    },
    methods: {
        ...mapActions(houseStore, ["detailHouse"]),
        selectHouse() {
            // console.log("listRow : ", this.house);
            // this.$store.dispatch("getHouse", this.house);
            this.detailHouse(this.house);

            this.$router.push({ name: "Deal", params: { house: this.house } });
        },
        colorChange(flag) {
            this.isColor = flag;
        },

        callDisplayInfowindow() {
            //As an ES6 module.
            EventBus.$emit("callDisplayInfowindow", this.house);
        },
    },
};
</script>

<style scoped>
.apt {
    width: 50px;
}
.houselist {
    background-color: rgb(201, 220, 226);
}
.mouse-over-bgcolor {
    background-color: lightblue;
}
</style>
