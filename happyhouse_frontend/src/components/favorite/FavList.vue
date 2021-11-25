<template>
  <b-container v-if="favs && favs.length != 0" class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>관심지역 목록</b-alert></b-col>
    </b-row>
    <fav-list-row v-for="(fav, index) in favlist" :key="index" :fav="fav" />
    <div>
      <a href="#" v-for="n in this.totalpage" :key="n" @click="changePg(n)"
        >{{ n }}
      </a>
    </div>
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
    return {
      favlist: [],
      totalpage: 0,
      totalcount: 0,
    };
  },
  created() {
    if (this.userInfo == null) {
      alert("로그인 이후에 가능합니다.");
    } else {
      this.getFavList(this.userInfo.userid);
      this.page();
      this.changePg(1);
    }
  },
  methods: {
    ...mapActions(houseStore, ["getFavList"]),
    changePg(n) {
      this.favlist = this.favs.slice(n - 1, n + 4);
    },
    page() {
      console.log(this.favs);
      this.totalcount = this.favs.length;
      console.log(this.totalcount);
      let temp = this.totalcount % 5;

      if (temp == 0) {
        this.totalpage = parseInt(this.totalcount / 5);
      } else {
        this.totalpage = parseInt(this.totalcount / 5) + 1;
      }
      console.log(this.totalpage + "totalpage");
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(houseStore, ["favs"]),
  },
};
</script>

<style></style>
