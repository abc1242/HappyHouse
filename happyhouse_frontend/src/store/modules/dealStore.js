import { dealList } from "@/api/deal.js";

const dealStore = {
  namespaced: true,
  state: {
    house: null,
    deals: [],
    deal: null,
  },
  getters: {},
  mutations: {
    SET_DEAL_LIST: (state, deals) => {
      console.log(deals);
      state.deals = deals;
    },
    SET_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_DETAIL_DEAL: (state, deal) => {
      state.deal = deal;
    },
    SET_INIT_DEAL: (state) => {
      state.deal = null;
    },
  },
  actions: {
    setHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_HOUSE", house);
    },
    getDealList: ({ commit }, house) => {
      const params = {
        dong: house.dongCode,
        apt: house.aptName,
      };
      console.log(params);
      dealList(
        params,
        ({ data }) => {
          commit("SET_DEAL_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailDeal: ({ commit }, deal) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_DEAL", deal);
    },
    initDeal: ({ commit }) => {
      commit("SET_INIT_DEAL");
    },
  },
};

export default dealStore;
