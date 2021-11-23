import { apiInstance } from "./index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/house/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/house/gugun`, { params: params }).then(success).catch(fail);
}

function dongList(params, success, fail) {
  api.get(`/house/dong`, { params: params }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  api.get(`/house/apt`, { params: params }).then(success).catch(fail);
}

function favArea(id, dong, success, fail) {
  api.post(`/house/fav/${id}/${dong}`).then(success).catch(fail);
}

function favList(id, success, fail) {
  api.get(`/house/fav/${id}`).then(success).catch(fail);
}

function deleteFav(id, dong, success, fail) {
  api.delete(`/house/fav/${id}/${dong}`).then(success).catch(fail);
}

function favTopList(success, fail) {
  api.get(`/house/topfav`).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, houseList, favArea, favList, deleteFav, favTopList };
