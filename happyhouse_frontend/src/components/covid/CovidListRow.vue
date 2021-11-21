<template>
  <b-row
    class="m-2"
    @click="selectCovid"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="2" class="text-center align-self-center">
      <!-- <b-img
        thumbnail
        src="https://picsum.photos/250/250/?image=58"
        alt="Image 1"
      ></b-img> -->
    </b-col>
    <b-col cols="10" class="align-self-center">{{ covid.centerName }} </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

const covidStore = "covidStore";

export default {
  name: "CovidListRow",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    covid: Object,
  },
  // computed: {
  //   ...mapState(covidStore, ["covid"]),
  // },
  methods: {
    ...mapActions(covidStore, ["detailCovid"]),

    colorChange(flag) {
      this.isColor = flag;
    },
    selectCovid() {
      this.detailCovid(this.covid);
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
