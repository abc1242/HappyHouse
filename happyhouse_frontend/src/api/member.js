import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function signUp(user, success, fail) {
  await api
    .post(`/user/register`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function signOut(user, success, fail) {
  await api.post(`/user/leave`, JSON.stringify(user)).then(success).catch(fail);
}
// function logout(success, fail)
async function updateMember(user, success, fail) {
  await api.put(`/user/update`, JSON.stringify(user)).then(success).catch(fail);
}

export { login, findById, signUp, signOut, updateMember };
