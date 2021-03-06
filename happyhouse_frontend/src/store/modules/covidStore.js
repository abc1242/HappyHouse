import { sidoList, gugunList } from "@/api/house.js";
import http from "@/util/http-common.js";
const covidStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    covids: [],
    covid: null,
    sigu: [],
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

    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_COVID_LIST: (state) => {
      state.covids = [];
      state.covid = null;
    },
    SET_COVID_LIST(state, covids) {
      state.covids = covids;
    },
    SET_DETAIL_COVID(state, covid) {
      state.covid = covid;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
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
          // console.log(commit, params);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getCovidList({ commit }, sigu) {
      // const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      const SERVICE_KEY =
        "Jfb0zFJEijAwqjhxpvJmOVNjDUEFJDD%2B2pzJfC3eTAKDEBMeNFjINHH%2FInHlvk3YRvX2mmft6pjDMhKnf3gxHg%3D%3D";
      const SERVICE_URL = "https://api.odcloud.kr/api/15077586/v1/centers";
      // const SERVICE_URL =
      //   "https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=10&serviceKey=Jfb0zFJEijAwqjhxpvJmOVNjDUEFJDD%2B2pzJfC3eTAKDEBMeNFjINHH%2FInHlvk3YRvX2mmft6pjDMhKnf3gxHg%3D%3D";
      const params = {
        serviceKey: decodeURIComponent(SERVICE_KEY),
        perPage: 1000,
      };

      var seleceted = [];
      http
        .get(SERVICE_URL, { params })
        .then((response) => {
          // console.log(commit);
          // console.log(sigu);
          // console.log(response.data.data);

          if (sigu == "") {
            commit("SET_COVID_LIST", response.data.data);
          } else {
            response.data.data.forEach((element) => {
              // console.log(element.sido);
              // console.log(element.sigungu);
              if (element.sido == sigu[0] && element.sigungu == sigu[1]) {
                // console.log(element);
                seleceted.push(element);

                commit("SET_COVID_LIST", seleceted);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detailCovid: ({ commit }, covid) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_COVID", covid);
    },
  },
};

export default covidStore;
