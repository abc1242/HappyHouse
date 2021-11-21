<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><h3></h3></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CovidDetail",
  computed: {
    ...mapState(["covid"]),
  },
};
</script>

<style></style>
