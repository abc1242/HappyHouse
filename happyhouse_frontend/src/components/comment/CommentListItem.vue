<template>
  <div>
    <div class="comment-list-item">
      <div class="comment-list-item-name">
        <div>{{ comment.userid }}</div>
        <div>{{ comment.regtime }}</div>
      </div>
      <div class="comment-list-item-context">{{ comment.content }}</div>
      <div class="comment-list-item-button">
        <!-- <b-button variant="outline-info">수정</b-button> -->
        <b-button variant="outline-danger" @click="deleteco">삭제</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteComment } from "@/api/comment";
export default {
  props: {
    comment: Object,
    reloadComment: Function,
  },
  methods: {
    deleteco() {
      console.log(this.comment.commentno);
      deleteComment(this.comment.commentno);
      this.$router.go();
    },
  },
};
</script>

<style>
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.25em;
}
.comment-list-item-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
  border-radius: 5px 0px 0px 5px;
}
.comment-list-item-context {
  display: flex;

  align-items: center;
  width: 55em;
  border: 0.5px solid black;
}
.comment-list-item-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
  border-radius: 0px 5px 5px 0px;
}
.btn {
  margin-bottom: 1em;
}
</style>
