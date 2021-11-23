import { apiInstance } from "./index.js";

const api = apiInstance();

function writeComment(comment, success, fail) {
  api.post(`/board/comment`, JSON.stringify(comment)).then(success).catch(fail);
}
function deleteComment(commentno, success, fail) {
  api.delete(`/board/comment/${commentno}`).then(success).catch(fail);
}
export { writeComment, deleteComment };
