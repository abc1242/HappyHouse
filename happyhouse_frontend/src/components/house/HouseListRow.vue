<template>
  <b-row
    class="m-2"
    @click="callDisplayInfowindow"
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
.mouse-over-bgcolor {
    background-color: lightblue;
}
</style>
