<template>
  <b-row
    class="m-2"
    @click="selectFav"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="7" class="text-center align-self-center">
      {{ fav.sidoName }} {{ fav.gugunName }} {{ fav.dongName }}
    </b-col>
    <b-col cols="2" class="text-center align-self-center">
      <b-icon icon="star-fill"></b-icon>
    </b-col>
    <b-col cols="2">
      <b-button variant="outline-primary">삭제</b-button>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
    name: "FavListRow",
    data() {
        return {
            isColor: false,
        };
    },
    props: {
        fav: Object,
    },
    methods: {
        ...mapActions(houseStore, ["detailFav"]),
        selectFav() {
            console.log("listRow : ", this.fav);
            // this.$store.dispatch("getHouse", this.house);
            //this.detailHouse(this.house);

            //this.$router.push({ name: "Deal", params: { house: this.house } });
        },
        colorChange(flag) {
            this.isColor = flag;
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
