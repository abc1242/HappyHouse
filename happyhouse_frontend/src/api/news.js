import { newsApiInstance } from "./index.js";

const newsApi = newsApiInstance();

function newsList(params, success, fail) {
    newsApi.get('/', { params: params }).then(success).catch(fail);
}

export { newsList };
