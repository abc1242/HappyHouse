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

const imgsUrlArr = ["https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTlfMzIg/MDAxNTgyMTA4MjM5Mjk5.9AyII842EoUtrKfwfuUhN3F1inI-fWmNwZU-Fv_IW0wg.ZsvbUrDQubVKDbeCWnOGGPlMRhA51zDj4Q4GqS3Edn4g.JPEG.coldwell25/SE-3d8640e5-3def-4e83-bbe3-b7938a29c9e5.jpg?type=w800",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUoRd4Sbp1m5kNLHY-MlCuN4wujcXA3FyJFg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5xatD3S4oqcVaQ11p3GGl3Ub7HX3ESgwvCA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQcBqxzFKUK06fspceQe1sYHYVYDBY2OK-Ig&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatpL_JztjvStCFhOjLP2_JOxUAWFGe6a5hgWe705RgVzE5_bUdZYhX3WkbgOnR7IrfzI&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLUGrIg7H88WcKNiuGU-duSkVhxC2ZVyjCw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9-KeTL3IQFlKgDLW16rKa2wok-q4C8v7JMA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzqyeMGOu3k46kBuJRfsJOPC9hcVkpgpZGiw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjgPtHfqvTdag30LQmxFRYSEMVTTFIT9W4EA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18xDePDVlwhMmb4aC_mUU5985VSNjPdrEZw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0uhJQG_uosDHsB2hJVo9nz8mpPG5WYYsXS5QiWivsxA9Pdis1Z0r4dKB_hLi9DbJXG0&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSub2kTlXedd2uLAJj-xRgmpQhmdIRqdLwu0g&usqp=CAU",
]

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
      state.houses = houses;
      // 하우스 객체에 이미지 url 속성을 랜덤으로 넣어줌
      for (let house of state.houses) {
        let randNum = Math.floor(Math.random() * imgsUrlArr.length);
        house.imgsUrl = imgsUrlArr[randNum];
      }
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
    },
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
