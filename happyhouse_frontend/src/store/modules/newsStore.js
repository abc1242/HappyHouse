import { newsList } from "@/api/news.js";

const newsStore = {
    namespaced: true,
    state: {
        newses: [],
    },
    mutations: {
        SET_NEWS_LIST: (state, newses) => {
            state.newses = newses;
            console.log(state.newses);
        },
    },
    actions: {
        getNewsList: ({ commit }) => {
            const params = {
                query: "부동산",
            };
            newsList(
                params,
                ({ data }) => {
                    commit("SET_NEWS_LIST", data);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    }
};

export default newsStore;