<template>
  <b-container>
    <b-row class="mt-3">
      <b-col v-if="this.houses.length > 0"
        ><b-alert show>
          {{ this.houses[0].sidoName }}
          {{ this.houses[0].gugunName }}
          {{ this.houses[0].dongName }} 주택 목록</b-alert
        ></b-col
      >
      <b-col v-else><b-alert show>주택 목록</b-alert></b-col>
    </b-row>
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
      <b-col cols="4" class="sm-1">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col cols="3" class="sm-1">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="dongList"
        ></b-form-select>
      </b-col>
      <b-col cols="3" class="sm-1">
        <b-form-select
          v-model="dongCode"
          :options="dongs"
          @change="searchHouse"
        ></b-form-select>
      </b-col>
      <b-col cols="1" class="sm-1">
        <p class="h3 mb-2">
          <b-icon icon="star" @click="setFavorite"></b-icon>
        </p>
      </b-col>
    </b-row>
  </b-container>
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
const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
    name: "HouseSearchBar",
    data() {
        return {
            sidoCode: null,
            gugunCode: null,
            dongCode: null,
        };
    },
    computed: {
        ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
        ...mapState(memberStore, ["userInfo"]),
    },
    created() {
        this.CLEAR_HOUSES_LIST();
        this.CLEAR_SIDO_LIST();
        this.getSido();
    },
    methods: {
        ...mapActions(houseStore, [
            "getSido",
            "getGugun",
            "getDong",
            "getHouseList",
            "setFavArea",
        ]),
        ...mapMutations(houseStore, [
            "CLEAR_SIDO_LIST",
            "CLEAR_GUGUN_LIST",
            "CLEAR_DONG_LIST",
            "CLEAR_HOUSES_LIST",
        ]),

        setFavorite() {
            if (this.userInfo == null) {
                alert("로그인 이후에 가능합니다.");
            } else {
                if (this.dongCode == null) {
                    alert("동 선택한 이후에 가능합니다.");
                } else {
                    let favData = {
                        id: this.userInfo.userid,
                        dong: this.dongCode,
                    };
                    this.setFavArea(favData);
                }
            }
        },

        gugunList() {
            this.CLEAR_GUGUN_LIST();
            this.gugunCode = null;
            this.CLEAR_DONG_LIST();
            this.dongCode = null;
            if (this.sidoCode) this.getGugun(this.sidoCode);
        },
        dongList() {
            //console.log(this.gugunCode);

            this.CLEAR_DONG_LIST();
            this.dongCode = null;
            if (this.gugunCode) this.getDong(this.gugunCode);
        },
        searchHouse() {
            if (this.dongCode) this.getHouseList(this.dongCode);
        },
    },
};
</script>

<style></style>
