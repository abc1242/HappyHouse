import {
  sidoList,
  gugunList,
  dongList,
  houseList,
  favArea,
  favList,
  deleteFav,
  favTopList,
} from "@/api/house.js";

import router from "../../router";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    favs: [],
    topfavs: [],
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_HOUSES_LIST: (state) => {
      state.houses = [];
      state.house = null;
    },
    SET_HOUSE_LIST: (state, houses) => {
      //   console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_FAV: (state, res) => {
      console.log(state.favs);
      console.log(res);
    },
    SET_FAV_LIST: (state, favs) => {
      state.favs = favs;
    },
    SET_TOP_FAV_LIST: (state, topfavs) => {
      console.log(topfavs);
      state.topfavs = topfavs;
    }
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 하우스 리스트정보 반환
    getHouseList: ({ commit }, dongCode) => {
      const params = {
        dong: dongCode,
      };
      houseList(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
    setFavArea: (commit, favData) => {
      console.log(commit);
      favArea(
        favData.id,
        favData.dong,
        () => {
          alert("관심지역 등록 되었습니다");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 즐겨찾기 리스트정보 반환
    getFavList: ({ commit }, userId) => {
      favList(
        userId,
        ({ data }) => {
          commit("SET_FAV_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    delFav: (commit, favData) => {
      console.log(commit);
      deleteFav(
        favData.id,
        favData.dong,
        () => {
          alert("선택한 관심지역 삭제 되었습니다");
          router.go(); // 새로고침
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // TOP 5 즐겨찾기 리스트정보 반환
    getTopFavList: ({ commit }) => {
      favTopList(
        ({ data }) => {
          commit("SET_TOP_FAV_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
