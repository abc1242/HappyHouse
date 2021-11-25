import axios from "axios";
import { API_BASE_URL } from "@/config";
import { API_NEWS_URL } from "@/config";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

// axios 객체 생성
function newsApiInstance() {
  const instance = axios.create({
    baseURL: API_NEWS_URL,
    headers: {
      "Content-type": "application/json",
      "X-Naver-Client-Id": "bTIbr75QJMNlAjMzOP2v",
      "X-Naver-Client-Secret": "Eg3c1a6nbo",
    },
  });
  return instance;
}

export { apiInstance, newsApiInstance };
