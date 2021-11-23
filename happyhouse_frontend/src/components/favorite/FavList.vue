<template>
  <b-container v-if="favs && favs.length != 0" class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>관심지역 목록</b-alert></b-col>
    </b-row>
    <fav-list-row v-for="(fav, index) in favs" :key="index" :fav="fav" />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>관심지역 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import FavListRow from "@/components/favorite/FavListRow.vue";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const houseStore = "houseStore";

export default {
    name: "FavList",
    components: {
        FavListRow,
    },
    data() {
        return {};
    },
    created() {
        if (this.userInfo == null) {
            alert("로그인 이후에 가능합니다.");
        } else {
            this.getFavList(this.userInfo.userid);
        }
    },
    methods: {
        ...mapActions(houseStore, ["getFavList"]),
    },
    computed: {
        ...mapState(memberStore, ["userInfo"]),
        ...mapState(houseStore, ["favs"]),
    },
};
</script>

<style></style>
