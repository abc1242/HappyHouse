<template>
  <b-container v-if="covids && covids.length != 0" class="bv-example-row mt-3">
    <covid-list-row
      v-for="(covid, index) in covids"
      :key="index"
      :covid="covid"
    />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import CovidListRow from "@/components/covid/CovidListRow.vue";
import { mapState } from "vuex";

const covidStore = "covidStore";

export default {
  name: "CovidList",
  components: {
    CovidListRow,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(covidStore, ["covids"]),
  },
};
</script>

<style></style>
