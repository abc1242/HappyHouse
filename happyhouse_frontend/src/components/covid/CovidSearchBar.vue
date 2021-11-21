<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
            <b-form-input
                v-model.trim="dongCode"
                placeholder="동코드 입력...(예 : 11110)"
                @keypress.enter="sendKeyword"
            ></b-form-input>
        </b-col>
        <b-col class="sm-3" align="left">
            <b-button variant="outline-primary" @click="sendKeyword"
                >검색</b-button
            >
        </b-col> -->
    <b-col class="sm-3">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="gugunCode"
        :options="guguns"
        @change="searchCovid"
      ></b-form-select>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }
*/
const covidStore = "covidStore";

export default {
  name: "CovidSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      sidoName: null,
    };
  },
  computed: {
    ...mapState(covidStore, ["sidos", "guguns"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
    this.getCovidList();

    //화면 열면서 코로나data 받아오기
  },
  methods: {
    ...mapActions(covidStore, ["getSido", "getGugun", "getCovidList"]),
    ...mapMutations(covidStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),

    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;

      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchCovid() {},
  },
};
</script>

<style></style>
