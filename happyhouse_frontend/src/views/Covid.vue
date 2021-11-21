<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink">
      <b-icon icon="journals"></b-icon> Covid Service
    </h3>
    <b-row>
      <b-col>
        <covid-search-bar></covid-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" align="left">
        <covid-list />
      </b-col>
      <b-col cols="6">
        <covid-map />
      </b-col>
    </b-row>
    <b-row>
      <covid-detail />
    </b-row>
  </b-container>
</template>
<script>
import CovidSearchBar from "@/components/covid/CovidSearchBar.vue";
import CovidList from "@/components/covid/CovidList.vue";
import CovidDetail from "@/components/covid/CovidDetail.vue";
import CovidMap from "@/components/covid/CovidMap.vue";

export default {
  name: "Covid",
  components: {
    CovidSearchBar,
    CovidList,
    CovidDetail,
    CovidMap,
  },
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
}
</style>
