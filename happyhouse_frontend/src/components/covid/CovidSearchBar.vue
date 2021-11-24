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
      siName: "",
      guName: "",
    };
  },
  computed: {
    ...mapState(covidStore, ["sidos", "guguns", "sigu", "covids"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_COVID_LIST();
    this.getSido();
    // this.getCovidList(this.siName, this.guName);

    //화면 열면서 코로나data 받아오기
  },
  methods: {
    ...mapActions(covidStore, ["getSido", "getGugun", "getCovidList"]),
    ...mapMutations(covidStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_COVID_LIST",
      "SET_COVID_LIST",
    ]),

    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;

      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchCovid() {
      // console.log(this.sidoCode);
      // console.log(this.sidos[0].text);

      this.sidos.forEach((element) => {
        if (this.sidoCode == element.value) {
          this.siName = element.text;
        }
      });
      this.guguns.forEach((element) => {
        if (this.gugunCode == element.value) {
          this.guName = element.text;
        }
      });
      this.sigu[0] = this.siName;
      this.sigu[1] = this.guName;

      // sigu = [this.siName, this.guName];
      // console.log(this.sigu[0]);
      // console.log(this.sigu[1]);
      this.SET_COVID_LIST(this.covids, this.getCovidList(this.sigu));
    },
  },
};
</script>

<style></style>
