import { apiInstance } from "./index.js";

const api = apiInstance();

function dealList(params, success, fail) {
  api.get(`/house/deal`, { params: params }).then(success).catch(fail);
}

export { dealList };
