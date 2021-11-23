<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-green">
      <b-icon icon="bookmark-star-fill"></b-icon> Favorite Service
    </h3>
    <b-row>
      <fav-list />
    </b-row>
  </b-container>
</template>
<script>
import FavList from "@/components/favorite/FavList.vue";

export default {
  name: "Favorite",
  components: {
    FavList,
  },
};
</script>
<style scoped>
.underline-green {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(70, 199, 77, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}
</style>
